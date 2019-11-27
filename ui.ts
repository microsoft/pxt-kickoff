namespace ui.player {
    enum IndicatorImage {
        Left,
        Right,
        Down
    }

    function indicatorImage(currentGame: football.Game, dir: IndicatorImage) {
        if (currentGame.clock.secondsRemaining % 2) {
            switch (dir) {
                case IndicatorImage.Left:
                    return img`
                        . . . 3
                        . . 3 7
                        . 3 7 3
                        3 7 3 3
                        . 3 7 3
                        . . 3 7
                        . . . 3
                    `;
                case IndicatorImage.Right:
                    return img`
                        3 . . .
                        7 3 . .
                        3 7 3 .
                        3 3 7 3
                        3 7 3 .
                        7 3 . .
                        3 . . .
                    `;
                case IndicatorImage.Down:
                    return img`
                        3 7 3 3 3 7 3
                        . 3 7 3 7 3 .
                        . . 3 7 3 . .
                        . . . 3 . . .
                    `;
            }
        }
        // this ought to be in an else branch, but leaving it as 
        // an implicit else works around the compiler issue of not all branches
        // having a return / needing to have a default return
        switch (dir) {
            case IndicatorImage.Left:
                return img`
                    . . . 2
                    . . 2 3
                    . 2 3 2
                    2 3 2 2
                    . 2 3 2
                    . . 2 3
                    . . . 2
                `;
            case IndicatorImage.Right:
                return img`
                    2 . . .
                    3 2 . .
                    2 3 2 .
                    2 2 3 2
                    2 3 2 .
                    3 2 . .
                    2 . . .
                `;
            case IndicatorImage.Down:
                return img`
                    2 3 2 2 2 3 2
                    . 2 3 2 3 2 .
                    . . 2 3 2 . .
                    . . . 2 . . .
                `;
        }
    }

    export function createIndicator(currentGame: football.Game) {
        return scene.createRenderable(zindex.PLAYER_INDICATOR, (target, camera) => {
            const activePlayer = currentGame.offense.activePlayer || currentGame.defense.activePlayer;
            if (!activePlayer)
                return;

            const xPos = activePlayer.x - camera.offsetX;
            const yPos = activePlayer.top - camera.offsetY;

            // player is either:
            if (xPos < 0) { // off screen to left
                const indicator = indicatorImage(currentGame, IndicatorImage.Left);

                target.drawTransparentImage(
                    indicator,
                    0,
                    yPos + 5
                );
            } else if (xPos > screen.width) { // off screen to right
                const indicator = indicatorImage(currentGame, IndicatorImage.Right);

                target.drawTransparentImage(
                    indicator,
                    screen.width - indicator.width,
                    yPos + 5
                );
            } else { // within the screen
                const indicator = indicatorImage(currentGame, IndicatorImage.Down);
                // offset here is very hacky, probably just store state in data instead I guess
                target.drawTransparentImage(
                    indicator,
                    xPos + (activePlayer._action === PlayerAnimation.Left ? -5 : -3),
                    yPos - 5
                );
            }
        });
    }
}

namespace ui.scoreboard {
    export function create(currentGame: football.Game, playerTeam: Team, opposingTeam: Team) {
        return scene.createRenderable(zindex.HUD, (target, camera) => {
            const FONT = image.font8
            const HEIGHT = 10;
            const TOP = screen.height - HEIGHT;

            target.fillRect(
                0,
                TOP,
                screen.width,
                HEIGHT,
                0xF
            );
            let xPos = 1;
            const printAndUpdate = (data: string) => {
                target.print(data, xPos, TOP + 2, 0x1, FONT);
                xPos += data.length * FONT.charWidth + 1;
            }

            const teamOneText = playerTeam + "";
            const teamOneWidth = teamOneText.length * FONT.charWidth;
            const teamTwoText = opposingTeam + "";
            const teamTwoWidth = teamTwoText.length * FONT.charWidth;

            target.fillRect(
                0,
                TOP + 1,
                teamOneWidth,
                HEIGHT,
                playerTeam.primaryColor
            );
            target.fillRect(
                teamOneWidth,
                TOP + 1,
                teamTwoWidth,
                HEIGHT,
                opposingTeam.primaryColor
            );

            printAndUpdate(teamOneText);
            printAndUpdate(teamTwoText);
            printAndUpdate(currentGame.clock + "");
            printAndUpdate(` ${currentGame.downs}`);
        });
    }
}

namespace ui.field {
    export function createLineOfScrimmage(currentGame: football.Game) {
        return scene.createRenderable(zindex.BACKGROUND, (target, camera) => {
            const los = currentGame.lineOfScrimmage - camera.offsetX;
            if (los > 0 && los < screen.width) {
                target.drawLine(los, 16, los, screen.height, 0x3);
            }
        });
    }
}