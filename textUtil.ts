namespace text.util {
    let renderable: scene.Renderable;
    export function showInstruction(text: string, duration?: number): void {
        if (renderable) {
            renderable.destroy();
        }

        renderable = showText(text);

        if (duration) {
            control.runInParallel(() => {
                pause(duration);
                if (renderable) {
                    renderable.destroy();
                }
            });
        }
    }

    function showText(text: string): scene.Renderable {
        const largeFont = image.scaledFont(image.font8, 2);
        return scene.createRenderable(
            zindex.HUD,
            (target, camera) => {
                const x = (target.width - ((text.length - 0.5) * largeFont.charWidth)) / 2;
                const y = (target.height / 2) - (largeFont.charHeight / 2);

                printShadow(target, text, x, y, 0x2, largeFont);
                target.print(text, x, y, 0, largeFont);
            }
        );
    }

    function printBorder(img: Image, txt: string, x: number, y: number, c: number, f: image.Font) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                img.print(txt, x + i * 2, y + j * 2, c, f);
            }
        }
    }
    function printShadow(im: Image, txt: string, x: number, y: number, c: number, f: image.Font, up?: boolean, left?: boolean) {
        for (let i = (left ? -1 : 0); i <= (left ? 0 : 1); i++) {
            for (let j = (up ? -1 : 0); j <= (up ? 0 : 1); j++) {
                im.print(txt, x + i * 2, y + j * 2, c, f);
            }
        }
    }

    export function introInstruction(str: string) {
        const width = screen.width - 4;
        const height = Math.idiv(screen.height, 3) + 5;
        const top = screen.height - height;
        const left = screen.width - width >> 1;

        const dialog = new game.Dialog(width, height);
        const s = sprites.create(dialog.image, -1);
        s.z = zindex.HUD + 1
        s.top = top;
        s.left = left;
        dialog.setText(str);
        dialog.update();
        let done = false;
        control.runInParallel(() => {
            while (!done) {
                dialog.update();
                pause(300);
            }
        })
        
        pauseUntil(() => controller.A.isPressed());
        s.destroy();
        done = true;
    }
}