namespace player {
    export function create(team: Team) {
        const isPlayerTeam = team.isPlayerControlled();
        const startAnim = team.animations[PlayerAnimation.Left];
        const player = sprites.create(
            startAnim.frames[0],
            isPlayerTeam ?
                SpriteKind.PlayerTeam
                :
                SpriteKind.OpposingTeam
        );
        team.animations
            .forEach(a => animation.attachAnimation(player, a));

        player.z = isPlayerTeam ? zindex.PLAYER_TEAM : zindex.OPPOSING_TEAM;

        return player;
    }

    function updatePlayerState(player: Sprite) {
        const currentGame = football.activeGame();
        const isPlayerWithBall = player === currentGame.playerWhoHasBall;
        const offset = isPlayerWithBall ? 1 : 0;
        if (player.vx < 0)
            animation.setAction(player, PlayerAnimation.Left + offset);
        else if (player.vx > 0)
            animation.setAction(player, PlayerAnimation.Right + offset);

        // constrain player within field
        if (player.y < 16 || player.y > field.HEIGHT) {
            player.y = Math.clamp(16, field.HEIGHT, player.y);
            if (football.hardMode() && isPlayerWithBall) {
                currentGame.ballStopped("OUT OF BOUNDS!");
            }
        }
    }

    export function initializeEvents() {
        game.onUpdate(() => {
            const currentGame = football.activeGame();
            currentGame
                .offense
                .players
                .forEach(updatePlayerState);
            currentGame
                .defense
                .players
                .forEach(updatePlayerState);
        });
        sprites.onOverlap(
            SpriteKind.PlayerTeam,
            SpriteKind.OpposingTeam,
            (s, os) => {
                const currentGame = football.activeGame();
                if (currentGame.playIsActive()) {
                    const offenseDirection = currentGame.offenseDirection();
                    if (s.x < os.x) {
                        // push player back
                        s.x -= 3 * offenseDirection;
                        os.x += 2 * offenseDirection;
                    } else {
                        // 'drag' player back
                        s.x -= offenseDirection;
                        os.x -= offenseDirection;
                    }
                }
            }
        );
    }
}
