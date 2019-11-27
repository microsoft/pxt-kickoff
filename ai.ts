namespace ai {
    export function setTeamDefense(defense: Team, offense: Team, on: boolean) {
        defense.players.forEach((player, ind) => {
            if (player !== defense.activePlayer) {
                player.follow(offense.players[ind], on ? 100 : 0, 2);
            } else {
                controller.moveSprite(player);
            }
        });
    }

    export function setTeamOffense(offense: Team, on: boolean) {
        const currSceneData = game.currentScene().data;
        let offenseList: Sprite[] = currSceneData[datakey.CURRENT_OFFENSE];
        if (!offenseList) {
            currSceneData[datakey.CURRENT_OFFENSE] = offenseList = [];
            game.onUpdate(() => {
                offenseList.forEach((p, index) => {
                    // do something to make offense 'avoid' defense.
                    // Should probably also eventually run towards / follow ball ball when possible / close enough --
                    // maybe when halfway across field?
                    if (Math.percentChance(3)) {
                        p.vy = -p.vy * Math.randomRange(50, 150) / 100
                    }
                });
            });
        }

        while (offenseList.length)
            offenseList.pop();

        if (on) {
            offense.players
                .filter(p => p != offense.activePlayer)
                .forEach(p => {
                    offenseList.push(p)
                    // TODO: generalize based off team's target direction.
                    p.vx = 80;
                    p.vy = Math.randomRange(-50, 50)
                });
            controller.moveSprite(offense.activePlayer)
        }
    }
}