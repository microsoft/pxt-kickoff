/**
 * A customizable football game for MakeCode Arcade
 * Choose your favorite teams and play!
 */
//% weight=100 color="#003399" icon="\uf091"
namespace football {
    let _hardMode: boolean;
    let _alternateColors: boolean[];
    export class Game {
        public clock: GameClock;

        protected teamWithPossession: Team;
        protected playerWithPossession: Sprite;
        protected playerEnergy: number;
        public lineOfScrimmage: number;
        public downs: number;
        protected indicator: scene.Renderable;
        protected scoreboard: scene.Renderable;
        protected lineOfScrimmageIndicator: scene.Renderable;
        protected aiOn: boolean;

        constructor(
            protected teamA: Team,
            protected teamB: Team,
            quarterLength: number = 20
        ) {
            this.lineOfScrimmage = field.START_OFFSET;
            this.teamWithPossession = this.teamA;
            this.clock = new GameClock(quarterLength);
            _hardMode = _hardMode || false;

            this.indicator = ui.player.createIndicator(this);
            this.scoreboard = ui.scoreboard.create(this, teamA, teamB);
            this.lineOfScrimmageIndicator = ui.field.createLineOfScrimmage(this);

            this.aiOn = false;
            this.initializeEvents();
            field.initialize();
            player.initializeEvents();
            ball.initializeEvents();
            util.initCamera();
            this.resetPlayerPositions();
            this.downs = 0;

            this.refreshColors();
        }

        refreshColors() {
            if (_alternateColors) {
                this.teamA.setTeamColors(_alternateColors[TeamId.Player]);
                this.teamB.setTeamColors(_alternateColors[TeamId.Computer]);
            }
        }

        get playerWhoHasBall() {
            return this.playerWithPossession;
        }

        set playerWhoHasBall(s: Sprite) {
            if (s === undefined) {
                this.playerEnergy = undefined;
                this.playerWithPossession = undefined;
                return;
            }
            this.playerEnergy = 6;
            if (!hardMode() && !this.offense.isPlayerControlled()) {
                this.playerEnergy = 3;
            }
            
            if (this.offense.isPlayerControlled() && this.offense.activePlayer() !== s) {
                // shuffle control to player with ball
                while (this.offense.activePlayer() !== s) {
                    this.offense.controlNextPlayer();
                }
                s.vx = 60 * this.offenseDirection();
                s.vy = 0;
            }
            this.playerWithPossession = s;
        }

        resetPlayerPositions() {
            this.offense.resetPlayerPositions(
                this.lineOfScrimmage,
                this.offenseDirection()
            );
            this.defense.resetPlayerPositions(
                this.lineOfScrimmage,
                this.defenseDirection()
            );
        }

        get offense() {
            return this.teamWithPossession;
        }

        get defense() {
            return this.teamA === this.teamWithPossession ? this.teamB : this.teamA;
        }

        playIsActive() {
            return this.aiOn
        }

        stopClock() {
            this.clock.stop();
            this.setAI(false);
            this.offense.stop();
            this.defense.stop();
        }

        startClock() {
            this.clock.start();
            this.setAI(true);
        }

        startPlay() {
            if (this.downs >= 4) {
                text.util.showInstruction("TURN OVER!", 1500);
                this.turnOver();
                pause(1500);
            }

            this.playerWhoHasBall = undefined;
            if (this.clock.quarterOver()) {
                const finished = this.clock.nextQuarter();
                if (finished) {
                    return;
                }
                this.turnOver();
            }

            ++this.downs;
            this.resetPlayerPositions();

            let downText = "";
            switch (this.downs) {
                case 1: downText = "1ST"; break;
                case 2: downText = "2ND"; break;
                case 3: downText = "3RD"; break;
                case 4: downText = "4TH"; break;
            }

            this.resetPlayerPositions();

            text.util.showInstruction(`${downText} DOWN`, 500);
            pause(700);
            ball.toss();
        }

        ballStopped(reason: string) {
            if (this.playerWhoHasBall) {
                text.util.showInstruction(reason, 750);
                this.lineOfScrimmage = Math.clamp(
                    field.START_OFFSET - 20,
                    field.WIDTH - field.START_OFFSET + 20,
                    this.playerWhoHasBall.x
                );
                this.stopClock();
                control.runInParallel(() => {
                    pause(1000);
                    this.startPlay()
                });
            }
        }

        // if the offense is moving to the left, returns -1
        // if the offense is moving to the right, returns 1
        offenseDirection(): MovementDirection {
            // player always starts as offense, moving right
            const playerMovingRight = !!(this.clock.quarter % 2) ? 1 : -1;
            const playerTeamActive = this.offense.isPlayerControlled() ? 1 : -1;
            return playerMovingRight * playerTeamActive;
        }

        // if the offense is moving to the left, returns 1
        // if the offense is moving to the right, returns -1
        defenseDirection(): MovementDirection {
            return -this.offenseDirection();
        }

        turnOver() {
            this.teamWithPossession = this.defense;
            this.downs = 0;
            if (this.offenseDirection() === MovementDirection.Right) {
                this.lineOfScrimmage = field.START_OFFSET;
            } else {
                this.lineOfScrimmage = field.WIDTH - field.START_OFFSET;
            }
        }

        touchdown() {
            this.playerWhoHasBall = undefined;
            text.util.showInstruction("TOUCHDOWN!", 1500);
            this.stopClock();
            this.offense.score += 7;
            this.offense.celebrate()

            control.runInParallel(() => {
                effects.confetti.startScreenEffect(1000);
                pause(2500);
                this.turnOver();
                this.startPlay();
            });
        }

        initializeEvents() {
            game.onUpdate(() => {
                if (this.aiOn && this.playerWhoHasBall) {
                    this.defense.players
                        .filter(p => p.overlapsWith(this.playerWhoHasBall))
                        .forEach(() => {
                            --this.playerEnergy;
                        });
                    if (this.playerEnergy < 0) {
                        this.ballStopped("TACKLED!");
                    }
                }
            });

            game.onUpdate(() => {
                this.offense.players.forEach((p, index) => {
                    // Offense AI
                    // make offense 'avoid' defense by trying to move past them,
                    // and run towards the target when possible.
                    if (!this.aiOn || p == this.offense.activePlayer)
                        return;
                    const t = ball.getActiveTarget()
                    if (t && p.x > this.lineOfScrimmage) {
                        if (!p.data[datakey.IS_CHASING_BALL]) {
                            p.data[datakey.IS_CHASING_BALL] = true;
                            p.follow(t, 100);
                        }
                    } else if (p != this.offense.activePlayer) {
                        if (Math.percentChance(4)) {
                            p.vy = -p.vy * Math.randomRange(50, 150) / 100;
                        } 
                    }
                });

                // scoring
                const offenseDirection = this.offenseDirection();
                if (this.playerWhoHasBall) {

                    if (offenseDirection === MovementDirection.Right) {
                        if (this.playerWhoHasBall.x > field.WIDTH - field.TILE_SIZE) {
                            this.touchdown();
                        }
                    } else {
                        if (this.playerWhoHasBall.x < field.TILE_SIZE) {
                            this.touchdown();
                        }
                    }
                }
            });
        }

        setAI(on: boolean) {
            this.aiOn = on;
            controller.moveSprite(this.offense.activePlayer || this.defense.activePlayer);
            if (on) {
                this.offense.players
                    .filter(p => p != this.offense.activePlayer)
                    .forEach(p => {
                        p.vx = 80 * this.offenseDirection();
                        p.vy = Math.randomRange(40, 60) * (Math.percentChance(50) ? -1 : 1);
                    });
                this.defense.players
                    .filter(p => p != this.defense.activePlayer)
                    .forEach((player, ind) => {
                        player.follow(this.offense.players[ind], 100);
                    });
            } else {
                // clear any follows
                this.defense.players
                    .forEach(p => p.follow(undefined));
                this.offense.players
                    .forEach(p => {
                        p.follow(undefined);
                        // eventually this should probably be a delete;
                        p.data[datakey.IS_CHASING_BALL] = undefined;
                    });
            }
        }
    }

    let currentGame: Game;

    /**
     * Play a game of football against the AI!
     * @param playerTeam the team the player will play as, eg league.clevelandBrowns
     * @param aiTeam the team the player will play against, eg league.pittsburghSteelers
     * @param quarterLength the length of a quarter, eg 20
     */
    //% blockId=createGame block="play as %playerTeam against %aiTeam || quarter length %quarterLength seconds"
    //% playerTeam.defl="league.clevelandBrowns"
    //% aiTeam.defl="league.pittsburghSteelers"
    //% quarterLength.defl="20"
    //% weight=100
    export function createGame(playerTeam: TeamData, aiTeam: TeamData, quarterLength = 20) {
        if (currentGame) {
            game.splash("Game already created!")
        } else {
            currentGame = new Game(
                teams.create(playerTeam, true),
                teams.create(aiTeam, false),
                quarterLength
            );
            control.runInParallel(startGame);
        }
    }

    export function activeGame() {
        return currentGame;
    }

    /**
     * Prompt the player and start the game!
     */
    export function startGame() {
        // initialize recolored a button prompt and a frame
        game.setDialogCursor(img`
            . . . 9 9 9 9 9 . . .
            . 9 9 8 8 8 8 8 9 9 .
            . 9 8 8 f f f 8 8 9 .
            9 8 8 f 8 8 8 f 8 8 9
            9 8 8 f 8 8 8 f 8 8 9
            9 8 8 f f f f f 8 8 9
            9 9 8 f 8 8 8 f 8 9 9
            a 9 9 f 8 8 8 f 9 9 a
            a 9 9 8 9 9 9 8 9 9 a
            . a 9 9 9 9 9 9 9 a .
            . . a a a a a a a . .
        `);
        game.setDialogFrame(img`
            . . . . . . . . . . . .
            . . 9 9 9 9 9 9 9 9 . .
            . 9 9 9 9 9 9 9 9 9 9 8
            . 9 9 a 1 1 1 1 a 9 9 8
            . 9 9 1 1 1 1 1 1 9 9 8
            . 9 9 1 1 1 1 1 1 9 9 8
            . 9 9 1 1 1 1 1 1 9 9 8
            . 9 9 1 1 1 1 1 1 9 9 8
            . 9 9 a 1 1 1 1 a 9 9 8
            . 9 9 9 9 9 9 9 9 9 9 8
            . . 9 9 9 9 9 9 9 9 8 8
            . . 8 8 8 8 8 8 8 8 8 .
        `);

        if (currentGame) {
            // disable menu button
            controller.menu.onEvent(ControllerButtonEvent.Pressed, undefined);
            const isHardware = (() => {
                if (control.ramSize() <= 1024 * 200) {
                    return true;
                } else {
                    return false;
                }
            })();

            game.onGameOver(win => {
                const currGame = football.activeGame();
                currGame.resetPlayerPositions();
                currGame.offense.celebrate();
                currGame.defense.celebrate();
                text.util.showInstruction("GAME OVER!")
            });

            text.util.introInstruction(`Move with arrows and   throw with A! ${isHardware ? "Press A" : "Click on the screen"} to start.`);
            currentGame.startPlay();
        } else {
            game.splash("You need to set teams first!");
        }
    }

    /**
     * Set whether the given team should use their normal colors
     * or their alternate (inverted) colors.
     */
    //% blockId=footballInvertColors block="set %id team alternate colors %on=toggleOnOff"
    //% on.defl="true"
    //% weight=60
    export function setTeamAlternateColors(id: TeamId, on: boolean) {
        if (!_alternateColors) {
            _alternateColors = [false, false];
        }
        _alternateColors[id] = on;

        if (currentGame) {
            currentGame.refreshColors();
        }
    }

    /**
     * Set hard mode on or off!
     * In hardmode, some game features change:
     * 
     * * Going over the sidelines ends the play
     * * The opposing team has more endurance while holding the ball
     * * The football flies faster
     */
    //% blockId=footballHardMode block="set hard mode %on=toggleOnOff"
    //% on.defl="true"
    //% weight=40
    export function setHardMode(on: boolean) {
        _hardMode = on;
    }

    export function hardMode() {
        return _hardMode;
    }
}