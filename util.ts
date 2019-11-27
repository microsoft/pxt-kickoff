namespace util {
    let focusedPosition: number;
    let focusedSprite: Sprite;
    let focuser: Sprite;

    export function initCamera() {
        focusedPosition = screen.width >> 1;

        // should be done with centerCameraAt, but that seems to be buggy right now..
        focuser = sprites.create(img`.`);
        focuser.setFlag(SpriteFlag.Ghost, true);
        focuser.setFlag(SpriteFlag.Invisible, true);
        focuser.x = focusedPosition;
        focuser.top = 1;
        const maxFocusMovement = 5;
        
        game.onUpdate(() => {
            if (focusedSprite) {
                if (focusedSprite.x > focusedPosition) {
                    focusedPosition += Math.min(maxFocusMovement, focusedSprite.x - focusedPosition);
                } else if (focusedSprite.x < focusedPosition) {
                    focusedPosition -= Math.min(maxFocusMovement, focusedPosition - focusedSprite.x);
                }
            }
            focuser.x = focusedPosition;
            // scene.centerCameraAt(focusedPosition, 0);
        });
        scene.cameraFollowSprite(focuser);
    }

    export function focusCamera(s: Sprite) {
        focusedSprite = s;
    }
}