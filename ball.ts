namespace ball {
    let fball: Sprite;
    let shadow: Sprite;
    let target: Sprite;
    let lastXPos: number;
    let ballOffsetMagnitude: number;

    export function toss() {
        clear();
        const currentGame = football.activeGame();
        const offenseDirection = currentGame.offenseDirection();
        const playerIsOffense = currentGame.offense.isPlayerControlled();
        text.util.showInstruction(playerIsOffense ? "THROW!" : "DEFEND!", 500);
        target = sprites.create(img`
            a a . . . . . . . . a a
            a a a . . . . . . a a a
            1 a a a . . . . a a a 1
            1 1 a a a . . a a a 1 1
            . 1 1 a a a a a a 1 1 .
            . . 1 1 a a a a 1 1 . .
            . . . a a a a a a . . .
            . . a a a 1 1 a a a . .
            . a a a 1 1 1 1 a a a .
            a a a 1 1 . . 1 1 a a a
            a a 1 1 . . . . 1 1 a a
            1 1 1 . . . . . . 1 1 1
        `, SpriteKind.ThrowTarget);
        target.z = zindex.HUD - 1;
        target.x = Math.clamp(8, field.WIDTH - 8, currentGame.lineOfScrimmage + (40 * offenseDirection));
        util.focusCamera(target);

        shadow = sprites.create(img`
            . . a a a a . .
            . a f f f f a .
            a f f f f f f a
            a f f f f f f a
            . a f f f f a .
            . . a a a a . .
        `, SpriteKind.Shadow);
        shadow.z = zindex.SHADOW;
        shadow.setFlag(SpriteFlag.Ghost, true);
        shadow.setPosition(
            currentGame.lineOfScrimmage - (40 * offenseDirection),
            Math.randomRange(30, 100)
        );
        lastXPos = shadow.x;
        const {qb, qbAnimation} = currentGame.offense.quarterBack(); 
        qb.x = shadow.x;
        qb.y = shadow.y;

        if (playerIsOffense) {
            controller.moveSprite(target, 150, 150);
        }

        pause(400);
        if (playerIsOffense) {
            pauseUntil(() => {
                if (!controller.A.isPressed())
                    return false;
                if (offenseDirection === MovementDirection.Right) {
                    return target.x > currentGame.lineOfScrimmage;
                } else {
                    return target.x < currentGame.lineOfScrimmage
                }
            });
        } else {
            target.vx = offenseDirection * Math.randomRange(0, 100);
            target.vy = Math.randomRange(-40, 40);
            pause(Math.randomRange(500, 1000));
            target.vx = 0;
            target.vy = 0;
            pause(500);
        }

        shadow.setFlag(SpriteFlag.Ghost, false);
        target.z = zindex.THROW_TARGET;
        controller.moveSprite(target, 0, 0);

        // TODO: qb animation here
        animation.runImageAnimation(qb, qbAnimation, 150);
        util.focusCamera(shadow);
        // hard coded to match animation portion with ball
        pause(600);

        fball = sprites.create(img`
            . . 5 5 5 5 . .
            . 5 8 7 7 7 5 .
            5 1 9 1 1 7 8 5
            a 1 9 9 7 7 1 a
            . a 9 9 9 8 a .
            . . a a a a . .
        `, SpriteKind.Ball);
        fball.setPosition(20, 100);
        fball.z = zindex.BALL;
        fball.setFlag(SpriteFlag.Ghost, true);
        animation.runImageAnimation(fball, [
            img`
                . . 5 5 5 5 . .
                . 5 8 7 7 7 5 .
                5 1 9 1 1 7 8 5
                a 1 9 9 7 7 1 a
                . a 9 9 9 8 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 1 7 7 7 5 .
                5 8 7 7 7 7 7 5
                a 9 9 1 1 7 8 a
                . a 9 9 7 1 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 7 7 7 5 .
                5 8 7 7 7 7 8 5
                a 1 9 7 7 7 8 a
                . a 9 1 1 7 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 8 7 7 5 .
                5 8 7 7 7 7 8 5
                a 9 9 7 7 7 8 a
                . a 9 9 7 8 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 8 7 7 5 .
                5 8 7 7 7 7 8 5
                a 9 9 7 7 7 8 a
                . a 9 9 7 8 a .
                . . a a a a . .
            `,
            img`
                . . 5 5 5 5 . .
                . 5 8 1 1 7 5 .
                5 8 7 7 7 7 1 5
                a 9 9 7 7 7 8 a
                . a 9 9 7 8 a .
                . . a a a a . .
            `
        ], 30, true);
        
        // TODO?: make it so user can control speed / control with timing?
        const maxSpeed = football.hardMode() ? 120 : 80;
        const speed = Math.randomRange(maxSpeed >> 1, maxSpeed);
        ballOffsetMagnitude = Math.max(((maxSpeed * 1.4) - speed) >> 1, 10);
        const diffY = target.y - shadow.y;
        const diffX = target.x - shadow.x;

        const angleToTarget = Math.atan2(diffY, diffX);
        shadow.setVelocity(
            Math.cos(angleToTarget) * speed,
            Math.sin(angleToTarget) * speed
        );

        currentGame.startClock();
        text.util.showInstruction("CATCH!", 1000);

        pause(500);
        qb.setFlag(SpriteFlag.AutoDestroy, true);
        qb.setFlag(SpriteFlag.DestroyOnWall, true);
        qb.vx = -50 * offenseDirection;
    }

    export function clear() {
        if (target) {
            target.destroy();
            target = undefined;
        }
        if (fball) {
            fball.destroy();
            target = undefined;
        }
        if (shadow) {
            shadow.destroy();
            target = undefined;
        }
        const currentGame = football.activeGame();
        if (currentGame) {
            currentGame.playerWhoHasBall = undefined;
        }
    }

    export function initializeEvents() {
        game.onUpdate(
            () => {
                if (fball && shadow) {
                    fball.x = shadow.x;
                    fball.y = shadow.y - yOffset(lastXPos, fball.x, target.x, ballOffsetMagnitude);
                }
            }
        );

        game.onUpdate(
            () => {
                if (target) {
                    const currentGame = football.activeGame();
                    const offenseDirection = currentGame.offenseDirection();
                    const los = currentGame.lineOfScrimmage;
                    if (offenseDirection === MovementDirection.Right ? target.x < los : target.x > los) {
                        target.x = los + offenseDirection;
                    }
                    // don't let center go out of field;
                    if (target.y < 16 || target.y > field.HEIGHT) {
                        target.y = Math.clamp(16, field.HEIGHT, target.y);
                    }
                }
            }
        )

        sprites.onOverlap(
            SpriteKind.Shadow,
            SpriteKind.ThrowTarget,
            (s, os) => {
                const currentGame = football.activeGame();
                const offenseDirection = currentGame.offenseDirection();
                const heldBy = currentGame.offense.players.find(player => s.overlapsWith(player));
                const pastTarget = offenseDirection === MovementDirection.Right ? s.x >= os.x : s.x <= os.x;
                if (heldBy) {
                    fball.destroy();
                    currentGame.playerWhoHasBall = heldBy;
                    s.destroy();
                    os.destroy();
                    text.util.showInstruction("RUN!", 1000);
                    util.focusCamera(heldBy);
                    currentGame.setAI(true);
                    // TODO: touchdown checking in game.ts
                    // pauseUntil(() => !heldBy || heldBy.right > 19 * 16);
                    // currentGame.touchDown();
                
                } else if (pastTarget) {
                    // past the center line and no catch; make ball bounce once and move on
                    // move target a bit to the right to give somewhere to bounce to
                    os.setFlag(SpriteFlag.Ghost, true);
                    os.setFlag(SpriteFlag.Invisible, true);
                    os.x += 30 * offenseDirection;
                    s.setFlag(SpriteFlag.Ghost, true);
                    s.vx *= .6;
                    s.vy *= .6;
                    lastXPos = s.x;
                    ballOffsetMagnitude /= 3;
                    text.util.showInstruction("MISS!", 1500);

                    const stopPosition = os.bottom;
                    pauseUntil(() =>
                        offenseDirection === MovementDirection.Right ? fball.x > os.x - 2 : fball.x < os.x + 2
                    );
                    currentGame.stopClock();
                    football
                    s.destroy();
                    os.destroy();
                    s = undefined;
                    animation.stopAnimation(animation.AnimationTypes.ImageAnimation, fball);
                    pause(500);
                    currentGame.startPlay();
                }
            }
        )
    }

    export function getActiveTarget() {
        return target;
    }

    // a quick calculation for a position on a parabola containing the points
    // (start, 0), ((start + end) / 2, maxDisplacement), and (end,0)
    function yOffset(start: number, curr: number, end: number, maxDisplacement: number) {
        // map to a value between 0 and 100
        const x = Math.map(curr, start, end, 0, 100);
        // takes a known parabola path - the parabola containing (0,0), (50,1), and (100,0)
        //     -x^2/2500 + x/25
        // scaled to a hit (0,0), (50,maxDisplacement), and (100,0)
        const a = -maxDisplacement / 2500;
        const b = maxDisplacement / 25;

        return a * (x ** 2) + b * x;
    }
}