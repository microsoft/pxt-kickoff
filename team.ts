// a 3 person team lined up on the field
class Team {
    public score: number;
    public players: Sprite[];
    protected controlledPlayer: number;
    public animations: animation.Animation[];

    constructor(
        public readonly teamData: TeamData,
        protected controlled?: boolean
    ) {
        this.score = 0;
        const startX = controlled ? -20 : 20;
        this.initializeFrames();
        if (controlled) {
            this.controlledPlayer = 0;
            controller.B.onEvent(
                ControllerButtonEvent.Pressed,
                () => {
                    if (football.activeGame().playIsActive()) {
                        this.controlNextPlayer();
                    }
                }
            );
        }

        this.players = [];
        for (let i = 0; i < 3; i++) {
            this.players[i] = player.create(this);
        }

        this.setTeamColors(false);
    }

    setTeamColors(alternate: boolean) {
        // set color to team colors on creation
        const teamPalette = new color.Palette(2);
        teamPalette.setColor(alternate ? 1 : 0, this.teamData.colorOne);
        teamPalette.setColor(alternate ? 0 : 1, this.teamData.colorTwo);
        color.setPalette(teamPalette, this.primaryColor, 2);
    }

    quarterBack(): {qb: Sprite, qbAnimation: Image[]} {
        const currentGame = football.activeGame();
        const qb = player.create(this);
        const ind = currentGame.offenseDirection() === MovementDirection.Right ?
            PlayerAnimation.ThrowRight : PlayerAnimation.ThrowLeft;
        const anim = this.animations[ind].frames;
        qb.setFlag(SpriteFlag.Ghost, true);
        qb.setImage(anim[0]);
        return {qb: qb, qbAnimation: anim};
    }

    get name() {
        return this.teamData.name;
    }

    get abbrev() {
        return this.teamData.abbreviation;
    }

    get primaryColor() {
        return 0xB + this.colorOffset(); 
    }

    get secondaryColor() {
        return 0xC + this.colorOffset();
    }

    private colorOffset() {
        return this.controlled ? 0 : 2;
    }

    resetPlayerPositions(lineOfScrimmage: number, direction: MovementDirection) {
        const startX = lineOfScrimmage - direction * 20;
        this.players.forEach((p, i) => {
            p.y = (screen.height >> 1) + (i - 1) * 32;
            p.x = startX;
            animation.setAction(
                p,
                direction === MovementDirection.Right ?
                    PlayerAnimation.Right
                    :
                    PlayerAnimation.Left
            );
        });
    }

    celebrate() {
        this.players.forEach(p => {
            const celebration = Math.pickRandom([
                PlayerAnimation.Celebrate1,
                PlayerAnimation.Celebrate2,
                PlayerAnimation.Celebrate3
            ]);
            animation.setAction(p, celebration);
        });
    }

    isPlayerControlled() {
        return this.controlled;
    }

    get activePlayer() {
        return this.controlled && this.players[this.controlledPlayer];
    }

    controlNextPlayer() {
        controller.moveSprite(this.activePlayer, 0, 0);
        this.controlledPlayer = (this.controlledPlayer + 1) % this.players.length;
        controller.moveSprite(this.activePlayer);

        football.activeGame().setAI(true);
    }

    stop() {
        this.players.forEach(p => {
            p.vx = 0;
            p.vy = 0;
            if (p == this.activePlayer) {
                controller.moveSprite(p, 0, 0);
            }
        });
    }

    toString() {
        return `${` ${this.abbrev}`.slice(-3)}:${`  ${this.score}`.slice(-3)} `;
    }

    protected initializeFrames() {
        const animationFrames: Image[][] = [];

        animationFrames[PlayerAnimation.Left] = [
            img`
                . . . . . . c b b b b b . . . .
                . . . . . c b b 8 b b b b . . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b b b c . .
                . . . a a f f c b b b b b c . .
                . . . a 9 f f f f c b b c c . .
                . . . a 8 f f f 9 b c f c c c .
                . . . a 9 1 1 1 1 b f 8 b b c c
                . . . . . a a a c c f 8 b b c c
                . . . . . . a c c b b c 8 1 1 9
                . . . . . . . c b b b b c f f .
                . . . . 8 8 f f b b 8 8 f f . .
                . . . . 8 8 f f c c 8 8 f f . .
                . . . . . . . . . f f f f . . .
                . . . . . . . . f f f c c c . .
                . . . . . . . f f f c c c c . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . c b b b b b . . . . . .
                . . . c b b 8 b b b b . . . . .
                . . . c b b b b b b b c . . . .
                . . . c b b b b b b b c . . . .
                . a a f f c b b b b b c . . . .
                . a 9 f f f f c b b c c . . . .
                . a 8 f f f 9 b c f c c c . . .
                . a 9 1 1 1 1 b f 8 b b c c . .
                . . . a a a c c f 8 b b c c . .
                . . . . . a c c b c 8 1 1 9 . .
                . . . . . . . f 8 8 f f f f . .
                . . . . . . . . 8 8 f f f f f f
                . . . . . . . . c f f f . f f f
                . . . . . . . c c c . . . . f f
                . . . . . . c c c c . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . c b b b b b . . . . . .
                . . . c b b 8 b b b b . . . . .
                . . . c b b b b b b b c . . . .
                . . . c b b b b b b b c . . . .
                . a a f f c b b b b b c . . . .
                . a 9 f f f f c b b c c . . . .
                . a 8 f f f 9 b b c f c c c . .
                . a 9 1 1 1 1 b c f 8 b b c c .
                . . . a a a c c c f 8 b b c c .
                . . . . . a c c b b c c 1 1 9 .
                . . . 8 8 f f f b b b 8 8 f . .
                . . . 8 8 f f . c c c 8 8 f c c
                . . . . . . . . f f f f f c c c
                . . . . . . . f f f . . . . c c
                . . . . . . f f f f . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . c b b b b b . . . . . . .
                . . c b b 8 b b b b . . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b b b c . . . . .
                a a f f c b b b b b c . . . . .
                a 9 f f f f c b b c c . . . . .
                a 8 f f f 9 b b c f c c c . . .
                a 9 1 1 1 1 b c f 8 b b c c . .
                . . a a a c c c f 8 b b c c . .
                . . . . a c c b b c 8 1 1 9 . .
                . . . 8 8 f b b 8 8 f f f . . .
                . . . 8 8 f c c 8 8 f f . . . .
                . . . . . . f f f f f . . . . .
                . . . . . . . f f c c c . . . .
                . . . . . . f f c c c c . . . .
            `
        ];
        animationFrames[PlayerAnimation.LeftWithBall] = [
            img`
                . . . . . . c b b b b b . . . .
                . . . . . c b b 8 b b b b . . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b b b c . .
                . . . a a f f c b b b b b c . .
                . . . a 9 f f f f c b b c c . .
                . . . a 8 f f f 9 b c f c c c .
                . . . a 9 f f f c b f 8 b b c c
                . . . . a 7 7 9 a c f 8 b b c c
                . . . . a 7 1 1 7 a c c 8 1 1 9
                . . . . a 7 7 7 7 c c c c f f .
                . . . . a 9 7 7 7 c 8 8 f f . .
                . . . . 8 a a a a c 8 8 f f . .
                . . . . . . . . . f f f f . . .
                . . . . . . . . c c c f f f . .
                . . . . . . . c c c f f f f . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . c b b b b b . . . . . .
                . . . c b b 8 b b b b . . . . .
                . . . c b b b b b b b c . . . .
                . . . c b b b b b b b c . . . .
                . a a f f c b b b b b c . . . .
                . a 9 f f f f c b b c c . . . .
                . a 8 f f f f c c f c c c . . .
                . a 9 a 7 7 9 a f 8 b b c c . .
                . . . a 7 1 1 7 a 9 b b c c . .
                . . . a 7 7 7 7 a c 9 1 1 9 . .
                . . . a 9 7 7 7 8 8 f f f f . .
                . . . . a a a a 8 8 f f f f f f
                . . . . . a a a f f f f . f f f
                . . . . . . . c c c . . . . f f
                . . . . . . c c c c . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . c b b b b b . . . . . .
                . . . c b b 8 b b b b . . . . .
                . . . c b b b b b b b c . . . .
                . . . c b b b b b b b c . . . .
                . a a f f c b b b b b c . . . .
                . a 9 f f f f c b b c c . . . .
                . a 8 f f f f f c c f c c c . .
                . a 9 1 a 7 7 9 a f 8 b b c c .
                . . . a a 7 1 1 7 a 9 b b c c .
                . . . . a 7 7 7 7 a c 9 1 1 9 .
                . . . 8 a 9 7 7 7 8 8 f f f . .
                . . . 8 8 a a a a 8 8 f f f c c
                . . . . . . a a a f f f f c c c
                . . . . . . . f f f . . . . c c
                . . . . . . f f f f . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . c b b b b b . . . . . . .
                . . c b b 8 b b b b . . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b b b c . . . . .
                a a f f c b b b b b c . . . . .
                a 9 f f f f c b b c c . . . . .
                a 8 f f f c b b c f c c c . . .
                a a 7 7 9 a b c f 8 b b c c . .
                . a 7 1 1 7 a c f 8 b b c c . .
                . a 7 7 7 7 a c c c 8 1 1 9 . .
                . a 9 7 7 7 8 8 f f f f f . . .
                . . a a a a 8 8 f f f f . . . .
                . . . a a a f f f f f . . . . .
                . . . . . . . f f c c c . . . .
                . . . . . . f f c c c c . . . .
            `
        ];
        animationFrames[PlayerAnimation.Right] = [
            img`
                . . . . b b b b b c . . . . . .
                . . . b b b b 8 b b c . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b c f f a a . . .
                . . c c b b c f f f f 9 a . . .
                . c c c f c b 9 f f f 8 a . . .
                c c b b 8 f b 1 1 1 1 9 a . . .
                c c b b 8 f c c a a a . . . . .
                9 1 1 8 c b b c c a . . . . . .
                . f f c b b b b c . . . . . . .
                . . f f 8 8 b b f f 8 8 . . . .
                . . f f 8 8 c c f f 8 8 . . . .
                . . . f f f f . . . . . . . . .
                . . c c c f f f . . . . . . . .
                . . c c c c f f f . . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . b b b b b c . . . .
                . . . . . b b b b 8 b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b c f f a a .
                . . . . c c b b c f f f f 9 a .
                . . . c c c f c b 9 f f f 8 a .
                . . c c b b 8 f b 1 1 1 1 9 a .
                . . c c b b 8 f c c a a a . . .
                . . 9 1 1 8 c b c c a . . . . .
                . . f f f f 8 8 f . . . . . . .
                f f f f f f 8 8 . . . . . . . .
                f f f . f f f c . . . . . . . .
                f f . . . . c c c . . . . . . .
                . . . . . . c c c c . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . b b b b b c . . . .
                . . . . . b b b b 8 b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b c f f a a .
                . . . . c c b b c f f f f 9 a .
                . . c c c f c b b 9 f f f 8 a .
                . c c b b 8 f c b 1 1 1 1 9 a .
                . c c b b 8 f c c c a a a . . .
                . 9 1 1 c c b b c c a . . . . .
                . . f 8 8 b b b f f f 8 8 . . .
                c c f 8 8 c c c . f f 8 8 . . .
                c c c f f f f f . . . . . . . .
                c c . . . . f f f . . . . . . .
                . . . . . . f f f f . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . b b b b b c . . .
                . . . . . . b b b b 8 b b c . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b c f f a a
                . . . . . c c b b c f f f f 9 a
                . . . c c c f c b b 9 f f f 8 a
                . . c c b b 8 f c b 1 1 1 1 9 a
                . . c c b b 8 f c c c a a a . .
                . . 9 1 1 8 c b b c c a . . . .
                . . . f f f 8 8 b b f 8 8 . . .
                . . . . f f 8 8 c c f 8 8 . . .
                . . . . . f f f f f . . . . . .
                . . . . c c c f f . . . . . . .
                . . . . c c c c f f . . . . . .
            `
        ];
        animationFrames[PlayerAnimation.RightWithBall] = [
            img`
                . . . . b b b b b c . . . . . .
                . . . b b b b 8 b b c . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b c f f a a . . .
                . . c c b b c f f f f 9 a . . .
                . c c c f c b 9 f f f 8 a . . .
                c c b b 8 f b c f f f 9 a . . .
                c c b b 8 f c a 9 7 7 a . . . .
                9 1 1 8 c c a 7 1 1 7 a . . . .
                . f f c c c c 7 7 7 7 a . . . .
                . . f f 8 8 c 7 7 7 9 a . . . .
                . . f f 8 8 c a a a a 8 . . . .
                . . . f f f f . . . . . . . . .
                . . f f f c c c . . . . . . . .
                . . f f f f c c c . . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . b b b b b c . . . .
                . . . . . b b b b 8 b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b c f f a a .
                . . . . c c b b c f f f f 9 a .
                . . . c c c f c c f f f f 8 a .
                . . c c b b 8 f a 9 7 7 a 9 a .
                . . c c b b 9 a 7 1 1 7 a . . .
                . . 9 1 1 9 c a 7 7 7 7 a . . .
                . . f f f f 8 8 7 7 7 9 a . . .
                f f f f f f 8 8 a a a a . . . .
                f f f . f f f f a a a . . . . .
                f f . . . . c c c . . . . . . .
                . . . . . . c c c c . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . b b b b b c . . . .
                . . . . . b b b b 8 b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b c f f a a .
                . . . . c c b b c f f f f 9 a .
                . . c c c f c c f f f f f 8 a .
                . c c b b 8 f a 9 7 7 a 1 9 a .
                . c c b b 9 a 7 1 1 7 a a . . .
                . 9 1 1 9 c a 7 7 7 7 a . . . .
                . . f f f 8 8 7 7 7 9 a 8 . . .
                c c f f f 8 8 a a a a 8 8 . . .
                c c c f f f f a a a . . . . . .
                c c . . . . f f f . . . . . . .
                . . . . . . f f f f . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . b b b b b c . . .
                . . . . . . b b b b 8 b b c . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b c f f a a
                . . . . . c c b b c f f f f 9 a
                . . . c c c f c b b c f f f 8 a
                . . c c b b 8 f c b a 9 7 7 a a
                . . c c b b 8 f c a 7 1 1 7 a .
                . . 9 1 1 8 c c c a 7 7 7 7 a .
                . . . f f f f f 8 8 7 7 7 9 a .
                . . . . f f f f 8 8 a a a a . .
                . . . . . f f f f f a a a . . .
                . . . . c c c f f . . . . . . .
                . . . . c c c c f f . . . . . .
            `
        ];
        animationFrames[PlayerAnimation.Celebrate1] = [
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . c b b b b b . . . . .
                . . . . c b b b b b b b . . . .
                . . . . c b b b b b 8 b . . . .
                . . . . c b b b b b 8 b c . . .
                . . . . c b b b b b b b c . . .
                . . . a 8 b a f f c b 8 c . . .
                . . . a 8 f f f f f c 8 c . . .
                . . . a 9 8 f f f 9 8 9 a c . .
                . . . . a 9 1 1 1 8 9 a b c c .
                . . . . c a a a a a a b b c c .
                . . . . . c b b b b b c f f . .
                . . . 8 8 f b b b b 8 8 f f . .
                . . . 8 8 f c c c c 8 8 f . . .
                . . . . . . f f f c c c c . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . b b b b b b . . . .
                . . . . . b b b b b b 8 b . . .
                . . . . c 8 b c f f c b 8 c . .
                . . . . c 8 c f f f f c 8 c . .
                . . . c c a 9 8 1 1 8 9 a c c .
                . . . c c b a a a a a a b c c .
                . . . . . 8 8 b b b b 8 8 . . .
                . . . . . . c c c f f f . . . .
            `,
            img`
                . . . . . b b b b b b . . . . .
                . . . . b b b b b b 8 b . . 8 8
                . . . c b b b b b b b b c . 8 8
                . . . c b b b b b b b b c . 8 8
                . . . c 8 b c f f c b 8 c f f .
                . . . c 8 c f f f f c 8 f f f .
                . . . c 8 c f f f f c 8 f f . .
                . . . a 9 8 f f f f 8 9 f 9 . .
                . . . c a 9 8 1 1 8 9 b b 9 . .
                . . . c c c a a a a b b 1 . . .
                . . . c b b c b b c c 1 9 . . .
                . . . . f f c b b b c c f . . .
                . . . 8 f f c b b b c c f f . .
                . . . 8 8 f c c c c c c f f . .
                . . . 8 8 c c c . . . f f f . .
                . . . . c c c c . . . . f f . .
            `,
            img`
                . . . . b b b b b b . . . . . .
                . . . b b b b b 8 b b . 8 8 8 .
                . . c b b b b b b b b c 8 8 8 .
                . . c b b b b b b b b c 8 8 8 .
                . . c f a b b b b b b f f . . .
                . a f f f f 8 b b b f f f . . .
                . a f f f f 8 b c c f f . . . .
                . a 8 1 1 8 8 c c b b 9 . . . .
                . a a a a a a a b b 1 9 . . . .
                . . c b c b b c c 1 9 . . . . .
                . . 9 1 c b b b c 9 . . . . . .
                . . . f f b b b b c c f . . . .
                . . 8 8 f c c c c c c f f . . .
                . . 8 8 . . c c . . f f f . . .
                . . . . . c c c . . . f f . . .
                . . . . c c c c . . . . . . . .
            `,
            img`
                . . . b b b b b b . . . . . . .
                8 8 b b b b 8 b b b . . . . . .
                8 8 b b b b b b b b c . . . . .
                8 8 b b b b b b b b c . . . . .
                f c b b b b b b b b c . . . . .
                f f b b b b b b b b c . . . . .
                f f c b b b b b b c c . . . . .
                9 b c c b b b b c c . . . . . .
                9 1 b c c c c c c c c . . . . .
                . 9 1 c c b b b c b b c . . . .
                . . 9 c b b b b c 8 8 9 . . . .
                . f f f b b b b c f f . . . . .
                f f f f c c c c f f 8 8 . . . .
                f f f . . . c c . . 8 8 . . . .
                f f . . . . c c c . . . . . . .
                . . . . . . c c c c . . . . . .
            `,
            img`
                . . . . . b b b b b b . . . . .
                8 8 8 . b b b b b b 8 b . . . .
                8 8 8 c b b b b b b b b c . . .
                8 8 8 c b b b b b b b b c . . .
                . . f f b b b b b b a f c . . .
                . . f f f b b b 8 f f f f a . .
                . . . f f c c b 8 f f f f a . .
                . . . 9 b b c c 8 8 1 1 8 a . .
                . . . 9 1 b b a a a a a a a . .
                . . . . 9 1 c c b b c b c . . .
                . . . . . 9 c b b b c 1 9 . . .
                . . . f c c b b b b f f . . . .
                . . f f c c c c c c f 8 8 . . .
                . . f f f . . c c . . 8 8 . . .
                . . f f . . . c c c . . . . . .
                . . . . . . . c c c c . . . . .
            `,
            img`
                . . . . . b b b b b b . . . . .
                . . . . b b b b b b 8 b . . 8 8
                . . . c b b b b b b b b c . 8 8
                . . . c b b b b b b b b c . 8 8
                . . . c 8 b c f f c b 8 c f f .
                . . . c 8 c f f f f c 8 f f f .
                . . . a 9 8 f f f f 8 9 f f . .
                . . . . a 9 8 1 1 8 9 b b 9 . .
                . . . c c c a a a a b b 1 9 . .
                . . . c b b c b b c c 1 9 . . .
                . . . 9 1 1 8 b b b c 9 . . . .
                . . . . f f c b b b c c f . . .
                . . . 8 8 f c c c c c c f f . .
                . . . 8 8 . c c . . . f f f . .
                . . . . . c c c . . . . f f . .
                . . . . c c c c . . . . . . . .
            `,
            img`
                . . . . b b b b b b . . . . . .
                . . . b b b b b 8 b b . 8 8 8 .
                . . c b b b b b b b b c 8 8 8 .
                . . c b b b b b b b b c 8 8 8 .
                . . c f a b b b b b b f f . . .
                . a f f f f 8 b b b f f f . . .
                . a f f f f 8 b c c f f . . . .
                . a 8 1 1 8 8 c c b b 9 . . . .
                . a a a a a a a b b 1 9 . . . .
                . . c b c b b c c 1 9 . . . . .
                . . 9 1 c b b b c 9 . . . . . .
                . . . f f b b b b c c f . . . .
                . . 8 8 f c c c c c c f f . . .
                . . 8 8 . . c c . . f f f . . .
                . . . . . c c c . . . f f . . .
                . . . . c c c c . . . . . . . .
            `,
            img`
                . . . b b b b b b . . . . . . .
                8 8 b b b b 8 b b b . . . . . .
                8 8 b b b b b b b b c . . . . .
                8 8 b b b b b b b b c . . . . .
                f c b b b b b b b b c . . . . .
                f f b b b b b b b b c . . . . .
                f f c b b b b b b c c . . . . .
                9 b c c b b b b c c . . . . . .
                9 1 b c c c c c c c c . . . . .
                . 9 1 c c b b b c b b c . . . .
                . . 9 c b b b b c 8 8 9 . . . .
                . f f f b b b b c f f . . . . .
                f f f f c c c c f f 8 8 . . . .
                f f f . . . c c . . 8 8 . . . .
                f f . . . . c c c . . . . . . .
                . . . . . . c c c c . . . . . .
            `,
            img`
                . . . . . b b b b b b . . . . .
                8 8 8 . b b b b b b 8 b . . . .
                8 8 8 c b b b b b b b b c . . .
                8 8 8 c b b b b b b b b c . . .
                . . f f b b b b b b a f c . . .
                . . f f f b b b 8 f f f f a . .
                . . . f f c c b 8 f f f f a . .
                . . . 9 b b c c 8 8 1 1 8 a . .
                . . . 9 1 b b a a a a a a a . .
                . . . . 9 1 c c b b c b c . . .
                . . . . . 9 c b b b c 1 9 . . .
                . . . f c c b b b b f f . . . .
                . . f f c c c c c c f 8 8 . . .
                . . f f f . . c c . . 8 8 . . .
                . . f f . . . c c c . . . . . .
                . . . . . . . c c c c . . . . .
            `,
            img`
                . . . . . b b b b b b . . . . .
                . . . . b b b b b b 8 b . . 8 8
                . . . c b b b b b b b b c . 8 8
                . . . c b b b b b b b b c . 8 8
                . . . c 8 b c f f c b 8 c f f .
                . . . c 8 c f f f f c 8 f f f .
                . . . a 9 8 f f f f 8 9 f f . .
                . . . . a 9 8 1 1 8 9 b b 9 . .
                . . . c c c a a a a b b 1 9 . .
                . . . c b b c b b c c 1 9 . . .
                . . . 9 1 1 8 b b b c 9 . . . .
                . . . . f f c b b b c c f . . .
                . . . 8 8 f c c c c c c f f . .
                . . . 8 8 . c c . . . f f f . .
                . . . . . c c c . . . . f f . .
                . . . . c c c c . . . . . . . .
            `,
            img`
                . . . . b b b b b b . . . . . .
                . . . b b b b b 8 b b . 8 8 8 .
                . . c b b b b b b b b c 8 8 8 .
                . . c b b b b b b b b c 8 8 8 .
                . . c f a b b b b b b f f . . .
                . a f f f f 8 b b b f f f . . .
                . a f f f f 8 b c c f f . . . .
                . a 8 1 1 8 8 c c b b 9 . . . .
                . a a a a a a a b b 1 9 . . . .
                . . c b c b b c c 1 9 . . . . .
                . . 9 1 c b b b c 9 . . . . . .
                . . . f f b b b b c c f . . . .
                . . 8 8 f c c c c c c f f . . .
                . . 8 8 . . c c . . f f f . . .
                . . . . . c c c . . . f f . . .
                . . . . c c c c . . . . . . . .
            `,
            img`
                . . . b b b b b b . . . . . . .
                8 8 b b b b 8 b b b . . . . . .
                8 8 b b b b b b b b c . . . . .
                8 8 b b b b b b b b c . . . . .
                f c b b b b b b b b c . . . . .
                f f b b b b b b b b c . . . . .
                f f c b b b b b b c c . . . . .
                9 b c c b b b b c c . . . . . .
                9 1 b c c c c c c c c . . . . .
                . 9 1 c c b b b c b b c . . . .
                . . 9 c b b b b c 8 8 9 . . . .
                . f f f b b b b c f f . . . . .
                f f f f c c c c f f 8 8 . . . .
                f f f . . . c c . . 8 8 . . . .
                f f . . . . c c c . . . . . . .
                . . . . . . c c c c . . . . . .
            `,
            img`
                . . . . . b b b b b b . . . . .
                8 8 8 . b b b b b b 8 b . . . .
                8 8 8 c b b b b b b b b c . . .
                8 8 8 c b b b b b b b b c . . .
                . . f f b b b b b b a f c . . .
                . . f f f b b b 8 f f f f a . .
                . . . f f c c b 8 f f f f a . .
                . . . 9 b b c c 8 8 1 1 8 a . .
                . . . 9 1 b b a a a a a a a . .
                . . . . 9 1 c c b b c b c . . .
                . . . . . 9 c b b b c 1 9 . . .
                . . . f c c b b b b f f . . . .
                . . f f c c c c c c f 8 8 . . .
                . . f f f . . c c . . 8 8 . . .
                . . f f . . . c c c . . . . . .
                . . . . . . . c c c c . . . . .
            `
        ];
        animationFrames[PlayerAnimation.Celebrate2] = [
            img`
                . . . . . . b b b b b c . . . .
                . . . . . b b b b b 8 b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c 8 b c f f a b 8 a . .
                . . . . c 8 c f f f f f 8 a . .
                . . . c a 9 8 9 f f f 8 9 a . .
                . . c c b a 9 8 1 1 1 9 a . . .
                . . c c b b a a a a a a c . . .
                . . 9 1 1 8 c b b b c c c . . .
                . . . f f c b b b b b c . . . .
                . . . f f 8 8 b b b b f 8 8 . .
                . . . . f 8 8 c c c c f 8 8 . .
                . . . . . c c f f . . . . . . .
                . . . . c c c c f f . . . . . .
                . . . . c c c c f f f . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . b b b b b c . . . .
                . . . . . b b b b b 8 b c . . .
                . . . . . b b b b b 8 b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c b b b b b b b c . . .
                . . . . c 8 b c f f a b 8 a . .
                . . . . c 8 c f f f f f 8 a . .
                . . . c a 9 8 9 f f f 8 9 a . .
                . . c c b a 9 8 1 1 1 9 a . . .
                . . c c b b a a a a a a c . . .
                . . . f f c b b b b b c . . . .
                . . . f f 8 8 b b b b f 8 8 . .
                . . . . f 8 8 c c c c f 8 8 . .
                . . . . c c c c f f f . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . b b b b b b . . . . .
                . . . . b b b b b b 8 b . . . .
                . . . c b b b b b b b b c . . .
                . . . c 8 b c f f c b 8 c . . .
                . . . c 8 c f f f f c 8 c . . .
                . . c c a 9 8 1 1 8 9 a c c . .
                . . c c b a a a a a a b c c . .
                . . . f 8 8 b b b b 8 8 f . . .
                . . . . 8 8 b b b b 8 8 . . . .
                . . . . . c c c f f f . . . . .
            `,
            img`
                . . . . b b b b b b . . . . . .
                . . . b b b b b b 8 b . . 8 8 8
                . . c b b b b b b b b c . 8 8 8
                . . c b b b b b b b b c . 8 8 8
                . . c 8 b c f f c b 8 c f f . .
                . . c 8 c f f f f c 8 f f f . .
                . . a 9 8 f f f f 8 9 f f . . .
                . . . a 9 8 1 1 8 9 b b 9 . . .
                . . c c c a a a a b b 1 9 . . .
                . . c b b c b b c c 1 9 . . . .
                . . 9 1 1 8 b b b c 9 . . . . .
                . . . f f c b b b c c f . . . .
                . . 8 8 f c c c c c c f f . . .
                . . 8 8 . c c . . . f f f . . .
                . . . . c c c . . . . f f . . .
                . . . c c c c . . . . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . b b b b b b . . . . . .
                . . . b b b b b b 8 b . . 8 8 8
                . . c b b b b b b 8 b c . 8 8 8
                . . c b b b b b b b b c . 8 8 8
                . . c 8 b c f f c b 8 c f f . .
                . . c 8 f f f f f f 8 c f f . .
                . . c 8 f f f f f c 8 f f . . .
                . . a 9 8 f f f f 8 9 f 9 . . .
                . . . a 9 8 1 1 8 9 b b 9 . . .
                . . c c c a a a a b b 1 . . . .
                . . 9 1 1 8 b b b c 9 . . . . .
                . . . f f c b b b c c f . . . .
                . . 8 8 f c c c c c c f f . . .
                . . 8 8 c c c . . . f f f . . .
                . . . c c c c . . . . f f . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . b b b b b b . . . . .
                . . . . b b b b b b 8 b . . . .
                . . . c b b b b b b b b c . . .
                . . . c 8 b c f f c b 8 c . . .
                . . . c 8 c f f f f c 8 c . . .
                . . c c a 9 8 1 1 8 9 a c c . .
                . . c c b a a a a a a b c c . .
                . . . f 8 8 b b b b 8 8 f . . .
                . . . . 8 8 b b b b 8 8 . . . .
                . . . . . c c c f f f . . . . .
            `,
            img`
                . . . . . . b b b b b b . . . .
                8 8 8 . . b b b b b b 8 b . . .
                8 8 8 . c b b b b b b b b c . .
                8 8 8 . c b b b b b b b b c . .
                . . f f c 8 b c f f c b 8 c . .
                . . f f f 8 c f f f f c 8 c . .
                . . . f f 9 8 f f f f 8 9 a . .
                . . . 9 b b 9 8 1 1 8 9 a . . .
                . . . 9 1 b b a a a a c c c . .
                . . . . 9 1 c c b b c b b c . .
                . . . . . 9 c b b b 8 1 1 9 . .
                . . . . f c c b b b c f f . . .
                . . . f f c c c c c c f 8 8 . .
                . . . f f f . . . c c . 8 8 . .
                . . . f f . . . . c c c . . . .
                . . . . . . . . . c c c c . . .
            `
        ];
        animationFrames[PlayerAnimation.Celebrate3] = [
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . c b b b b b . . . . . .
                . . . c b b b b b b b . . . . .
                . . . c b b b b b 8 b . . . . .
                . . . c b b b b b 8 b c . . . .
                . . . c b b b b b b b c . . . .
                . . a 8 b a f f c b 8 c . . . .
                . . a 8 f f f f f c 8 c . . . .
                . . a 9 8 f f f 9 8 9 a c . . .
                . . . a 9 1 1 1 8 9 a b c c . .
                . . . c a a a a a a b b c c . .
                . . . . c b b b b b c f f . . .
                . . 8 8 f b b b b 8 8 f f . . .
                . . 8 8 f c c c c 8 8 f . . . .
                . . . . . f f f c c c c . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . b b b b b b . . . . .
                . . . . b b b b b b 8 b . . . .
                . . . c b b b b b b b b c . . .
                . . . c 8 b c f f c b 8 c . . .
                . . . c 8 c f f f f c 8 c . . .
                . . c c a 9 8 1 1 8 9 a c c . .
                . . c c b a a a a a a b c c . .
                . . . f 8 8 b b b b 8 8 f . . .
                . . . . 8 8 b b b b 8 8 . . . .
                . . . . . c c c f f f . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . b b b b b b . . . . .
                . . . . b b b b 8 b b b . . . .
                . . . c b b b b b b b b c . . .
                . . . c f a b b b b b b c . . .
                . . a a f f f 8 b b b b c . . .
                . . a 8 1 1 8 8 b c c c c c . .
                . . a a a a a a c c c c c c . .
                . . . c b b b 8 8 f f f f . . .
                . . . c b b b 8 8 f f f . . . .
                . . . . c c f f f f f . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . b b b b b b . . . . .
                . . . . b b b b 8 b b b . . . .
                . . . c b b b b b b b b c . . .
                . . . c b b b b b b b b c . . .
                . . a a 1 b b b b b b c c . . .
                . . a 8 1 b b b b c c c c c . .
                . . a a a c c c c c c c c c . .
                . . . c 8 8 b b b f f f f . . .
                . . . c 8 8 b b b f f f . . . .
                . . . . c c f f f f f . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . b b b b b b . . . . .
                . . . . b b b b 8 b b b . . . .
                . . . c b b b b b b b b c . . .
                . . . c b b b b b b b b c . . .
                . . c c b b b b b b b b c . . .
                . . c c c b b b b b b c c c . .
                . . c c c c c c c c c c c c . .
                . . . f f b b b b b b f f . . .
                . . . f f b b b b b b f f . . .
                . . . . f f f f f f f f . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . b b b b b b . . . . .
                . . . . b b b 8 b b b b . . . .
                . . . c b b b b b b b b c . . .
                . . . c b b b b b b a f c . . .
                . . . c b b b b 8 f f f a a . .
                . . c c c c c b 8 8 1 1 8 a . .
                . . c c c c c c a a a a a a . .
                . . . f f f f 8 8 b b b c . . .
                . . . . f f f 8 8 b b b c . . .
                . . . . . f f f f f c c . . . .
            `,
            img`
                . . . b b b b b b . . . . . . .
                . . b b b b b b 8 b . . 8 8 8 .
                . c b b b b b b b b c . 8 8 8 .
                . c b b b b b b b b c . 8 8 8 .
                . c 8 b c f f c b 8 c f f . . .
                . c 8 c f f f f c 8 f f f . . .
                . a 9 8 f f f f 8 9 f f . . . .
                . . a 9 8 1 1 8 9 b b 9 . . . .
                . c c c a a a a b b 1 9 . . . .
                . c b b c b b c c 1 9 . . . . .
                . 9 1 1 8 b b b c 9 . . . . . .
                . . f f c b b b c c f . . . . .
                . 8 8 f c c c c c c f f . . . .
                . 8 8 . c c . . . f f f . . . .
                . . . c c c . . . . f f . . . .
                . . c c c c . . . . . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . b b b b b b . . . . . . .
                . . b b b b b b b b . . 8 8 8 .
                . c b b b b b b 8 b c . 8 8 8 .
                . c b b b b b b b b c . 8 8 8 .
                . c 8 b c f f c b 8 c f f . . .
                . c 8 f f f f f f 8 c f f . . .
                . c 8 f f f f f c 8 f f . . . .
                . a 9 8 f f f f 8 9 f 9 . . . .
                . . a 9 8 1 1 8 9 b b 9 . . . .
                . c c c a a a a b b 1 . . . . .
                . 9 1 1 8 b b b c 9 . . . . . .
                . . f f c b b b c c f . . . . .
                . 8 8 f c c c c c c f f . . . .
                . 8 8 c c c . . . f f f . . . .
                . . c c c c . . . . f f . . . .
            `
        ];
        animationFrames[PlayerAnimation.ThrowLeft] = [
            img`
                . . . . . . c b b b b b . . . .
                . . . . . c b b 8 b b b b . . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b b b c . .
                . . . a a f f c b b b b b c . .
                . . . a 9 f f f f c b b c c . .
                . . . a 8 f f f 9 b c f c c c .
                . . . a 9 f f f c b f 8 b b c c
                . . . . a 7 7 9 a c f 8 b b c c
                . . . . a 7 1 1 7 a c c 8 1 1 9
                . . . . a 7 7 7 7 c c c c f f .
                . . . . a 9 7 7 7 c 8 8 f f . .
                . . . . d a a a a c 8 8 f f . .
                . . . . . . . . . f f f f . . .
                . . . . . . . . c c c f f f . .
                . . . . . . . c c c f f f f . .
            `,
            img`
                . . . c b b b b b . . . . . . .
                . . c b b 8 b b b b . . . . . .
                . . c b b b b b b b c . . . . .
                . a a c b b b b b b c . . . . .
                . 9 f f f c b b b b c . . . . .
                . 8 f f f f c b b c c . a a a a
                . 9 1 f f f b c c c c a 7 7 7 a
                . . 9 1 1 1 c b b c a 7 1 1 7 a
                . . . 9 9 c f b 8 8 a 7 7 7 7 a
                f . . c b b f 8 f f a 7 a a 9 a
                f f . c b b b f f f f 9 8 8 a a
                f f f c b b b b f f f a 8 8 a .
                f f f c c c c f f . c a a a . .
                . f . . . c c . . . . . . . . .
                . . . . c c c c . . . . . . . .
                . . . c c c c . . . . . . . . .
            `,
            img`
                . . . c b b b b b . . . . . . .
                . . c b b d b b b b . . . . . .
                . . c b b b b b b b c . . . . .
                . a a c b b b b b b c . . . . .
                . 9 f f f c b b b b c . a a a a
                . 8 f f f f c b b c c a 7 7 7 a
                . 9 1 f f f 9 b c c a 7 1 1 7 a
                . . 9 1 1 1 9 c b b a 7 7 7 7 a
                . . . . 9 c c f b 8 a 7 a a 9 a
                . . . . c b b f 8 f f 9 8 8 a a
                . f . . c b b b f f f a 8 8 a .
                . f f . c b b b b f c a a a . .
                . f f f c c c c f f . . . . . .
                . f f f . . . c c . . . . . . .
                . . f . . . c c c c . . . . . .
                . . . . . c c c c . . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . b b b b b b . . . . . . .
                . . c b 8 b b b b c . . . . . .
                . a b b 8 b b b b b c . . . . .
                . a b b b b b b b b c . . . . .
                . a f f b b b b b b c . . . . .
                . 9 f f f f b b c c c . . . . .
                . 9 f f f f 1 c b b c f . . . .
                . 9 8 1 1 1 9 f 8 b b f . . . .
                . . 9 9 9 f f f f 8 8 c c f f f
                . . . f f f f f b b c c f f f f
                . 8 8 f f f c b b c c . . f f .
                . 8 8 . . . . c c . . . f f . .
                . . . . . . c c c c . . . . . .
                . . . . . c c c c . . . . . . .
            `,
            img`
                . . . . b b b b b b . . . . . .
                . . . c b 8 b b b b c . . . . .
                . . a b b b b b b b b c . . . .
                . . a b b b b b b b b c . . . .
                . . a f f b b b b b b c . . . .
                . . 9 f f f f 9 b b c c . . . .
                . . 9 8 f f f 1 c c c . . . . .
                . . 9 9 1 1 1 c b b c f . . . .
                . 8 8 9 a a b f 8 b b f . . . .
                . 8 8 f f f f f f 8 8 c c f f f
                . . . f f f f b b b c c f f f f
                . . . . . . c b b c c . . f f .
                . . . . . . . c c . . . f f . .
                . . . . . . . c c . . . . . . .
                . . . . . . c c c c . . . . . .
                . . . . . c c c c . . . . . . .
            `
        ];
        animationFrames[PlayerAnimation.ThrowRight] = [
            img`
                . . . . b b b b b c . . . . . .
                . . . b b b b 8 b b c . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b b b c . . . . .
                . . c b b b b b c f f a a . . .
                . . c c b b c f f f f 9 a . . .
                . c c c f c b 9 f f f 8 a . . .
                c c b b 8 f b c f f f 9 a . . .
                c c b b 8 f c a 9 7 7 a . . . .
                9 1 1 8 c c a 7 1 1 7 a . . . .
                . f f c c c c 7 7 7 7 a . . . .
                . . f f 8 8 c 7 7 7 9 a . . . .
                . . f f 8 8 c a a a a d . . . .
                . . . f f f f . . . . . . . . .
                . . f f f c c c . . . . . . . .
                . . f f f f c c c . . . . . . .
            `,
            img`
                . . . . . . . b b b b b c . . .
                . . . . . . b b b b 8 b b c . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b b c a a .
                . . . . . c b b b b c f f f 9 .
                a a a a . c c b b c f f f f 8 .
                a 7 7 7 a c c c c b f f f 1 9 .
                a 7 1 1 7 a c b b c 1 1 1 9 . .
                a 7 7 7 7 a 8 8 b f c 9 9 . . .
                a 9 a a 7 a f f 8 f b b c . . f
                a a 8 8 9 f f f f b b b c . f f
                . a 8 8 a f f f b b b b c f f f
                . . a a a c . f f c c c c f f f
                . . . . . . . . . c c . . . f .
                . . . . . . . . c c c c . . . .
                . . . . . . . . . c c c c . . .
            `,
            img`
                . . . . . . . b b b b b c . . .
                . . . . . . b b b b d b b c . .
                . . . . . c b b b b b b b c . .
                . . . . . c b b b b b b c a a .
                a a a a . c b b b b c f f f 9 .
                a 7 7 7 a c c b b c f f f f 8 .
                a 7 1 1 7 a c c b 9 f f f 1 9 .
                a 7 7 7 7 a b b c 9 1 1 1 9 . .
                a 9 a a 7 a 8 b f c c 9 . . . .
                a a 8 8 9 f f 8 f b b c . . . .
                . a 8 8 a f f f b b b c . . f .
                . . a a a c f b b b b c . f f .
                . . . . . . f f c c c c f f f .
                . . . . . . . c c . . . f f f .
                . . . . . . c c c c . . . f . .
                . . . . . . . c c c c . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . b b b b b b . . .
                . . . . . . c b b b b 8 b c . .
                . . . . . c b b b b b 8 b b a .
                . . . . . c b b b b b b b b a .
                . . . . . c b b b b b b f f a .
                . . . . . c c c b b f f f f 9 .
                . . . . f c b b c 1 f f f f 9 .
                . . . . f b b 8 f 9 1 1 1 8 9 .
                f f f c c 8 8 f f f f 9 9 9 . .
                f f f f c c b b f f f f f . . .
                . f f . . c c b b c f f f 8 8 .
                . . f f . . . c c . . . . 8 8 .
                . . . . . . c c c c . . . . . .
                . . . . . . . c c c c . . . . .
            `,
            img`
                . . . . . . b b b b b b . . . .
                . . . . . c b b b b 8 b c . . .
                . . . . c b b b b b b b b a . .
                . . . . c b b b b b b b b a . .
                . . . . c b b b b b b f f a . .
                . . . . c c b b 9 f f f f 9 . .
                . . . . . c c c 1 f f f 8 9 . .
                . . . . f c b b c 1 1 1 9 9 . .
                . . . . f b b 8 f b a a 9 8 8 .
                f f f c c 8 8 f f f f f f 8 8 .
                f f f f c c b b b f f f f . . .
                . f f . . c c b b c . . . . . .
                . . f f . . . c c . . . . . . .
                . . . . . . . c c . . . . . . .
                . . . . . . c c c c . . . . . .
                . . . . . . . c c c c . . . . .
            `
        ];

        this.animations = [];

        if (!this.controlled) {
            animationFrames.forEach(anim => {
                anim.forEach(frame => {
                    frame.replace(0xb, this.primaryColor);
                    frame.replace(0xc, this.secondaryColor);
                });
            });
        }

        this.animations[PlayerAnimation.Left] = animation.createAnimation(PlayerAnimation.Left, 150);
        this.animations[PlayerAnimation.LeftWithBall] = animation.createAnimation(PlayerAnimation.LeftWithBall, 150);
        this.animations[PlayerAnimation.Right] = animation.createAnimation(PlayerAnimation.Right, 150);
        this.animations[PlayerAnimation.RightWithBall] = animation.createAnimation(PlayerAnimation.RightWithBall, 150);
        this.animations[PlayerAnimation.Celebrate1] = animation.createAnimation(PlayerAnimation.Celebrate1, 100);
        this.animations[PlayerAnimation.Celebrate2] = animation.createAnimation(PlayerAnimation.Celebrate2, 100);
        this.animations[PlayerAnimation.Celebrate3] = animation.createAnimation(PlayerAnimation.Celebrate3, 100);
        this.animations[PlayerAnimation.ThrowLeft] = animation.createAnimation(PlayerAnimation.ThrowLeft, 200);
        this.animations[PlayerAnimation.ThrowRight] = animation.createAnimation(PlayerAnimation.ThrowRight, 200);

        animationFrames.forEach((frames, index) =>
            frames.forEach(im => this.animations[index].addAnimationFrame(im))
        );
    }
}

namespace teams {
    export function create(
        teamData: TeamData,
        controlled: boolean
    ) {
        return new Team(
            teamData,
            controlled
        );
    }
}