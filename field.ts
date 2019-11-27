namespace field {
    export function initialize() {
        scene.setTileMap(img`
            5 6 7 8 9 a b c d e 5 6 7 8 9 a b c d e
            3 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 4
            3 f . f . f . f . f . f . f . f . f . 4
            3 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 4
            3 f . f . f . f . f . f . f . f . f . 4
            3 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 1 2 4
            3 f . f . f . f . f . f . f . f . f . 4
            . . . . . . . . . . . . . . . . . . . .
        `);

        // field
        scene.setTile(0x1, img`
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 1 5 5 1 5 5 1 5 5 1 5 5 5
            1 5 5 1 5 5 1 5 5 1 5 5 1 5 5 5
            1 5 5 1 5 5 1 5 5 1 5 5 1 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        `, false);
        scene.setTile(0x2, img`
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 1 6 6 1 6 6 1 6 6 1 6 6 6
            1 6 6 1 6 6 1 6 6 1 6 6 1 6 6 6
            1 6 6 1 6 6 1 6 6 1 6 6 1 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
        `, false);
        scene.setTile(0xF, img`
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            1 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        `, false);
        scene.setTile(0x0, img`
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
        `, false);
        
        // end zones
        scene.setTile(0x3, img`
            c c b b b b b b b b b b b b c c
            c c b b b b c b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b c b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b c b b b b b b b c c
            c c b b b b c b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b c b b b b b c c
            c c b b b b c b c b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b b b b b b b c c
            c c b b b b b b c b b b b b c c
            c c b b b b b b c b b b b b c c
        `, false);
        scene.setTile(0x4, img`
            e e d d d d d d d d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d d d e d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d e d e d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d e d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d d d e d d d d d e e
            e e d d d d d d e d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d d d d d d d d d e e
            e e d d d d e d d d d d d d e e
        `, false);

        // crowd
        scene.setTile(0x5, img`
            a a f f f f f f f a a a a f f f
            9 a 5 5 a f f f f a a a a a f e
            9 5 5 5 5 a f f a a a f a a e d
            5 f 5 5 f 5 f f a a f 9 a f d e
            5 a 5 5 a 5 a 6 6 a f d d f d 9
            5 5 5 5 5 a 6 6 6 6 a 9 d a d d
            a 5 f f a 6 f 6 6 f 6 a 9 9 a d
            a a 5 5 a 6 5 6 6 5 6 a a 9 9 a
            a a a a a 6 6 6 6 6 6 a a a 9 9
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0x6, img`
            f f f f a a a a f f f f f f f a
            d d e f a a a f f b c c b f a a
            d d d e f f f f b c c c c b a a
            d d e d f a 9 f c f c c f c f a
            d d 9 d f d d f b c b b c b f f
            e e d d a d 9 f b b b b b b a 9
            9 9 d a 9 a f f 9 b a a b 9 8 8
            d d a 9 9 f f f f 9 4 4 9 8 9 8
            9 9 9 9 a f f f a a a a a 8 a 8
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0x7, img`
            a f f f f f f f f f f f a 6 6 a
            a a f f f f f f f f f a 6 6 6 6
            a a f a 9 9 a f 9 f f 6 f 6 6 f
            a f a 9 9 9 9 a 6 6 f 6 5 6 6 5
            f f 9 f 9 9 f 9 9 6 5 6 6 a a 6
            9 f 9 a 9 9 a 9 f 9 9 a 6 9 9 6
            8 8 f 9 f f 9 9 f a 9 a a 6 6 9
            8 9 8 a a a 9 a f f a 9 9 9 9 a
            8 a 8 a 9 9 a f f f f f a 9 9 a
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0x8, img`
            f f f a 9 9 9 9 a a f f f f f f
            a f f 9 a 9 9 a 9 c b b c f f f
            6 f f 9 a 9 9 a c b b b b c f f
            6 f f 9 9 9 9 9 b f b b f b f f
            6 a 9 9 a 9 9 a b c b b c b a 6
            9 e e e e a a a b b b b b a 6 6
            e d e e d e a a c b f f a 6 f 6
            d e d d e d f f a c b b a 6 5 6
            d d d d d d f f a a a a a 6 6 6
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0x9, img`
            f a a a a f f f f f f f a a a a
            f a a a a a f a b b a f a a a f
            a a a f a a a b b b b a f f f f
            a a f c a f b a b b a b f a c f
            6 a f b b f b c b b c b f b b f
            6 6 a c b a b b a a b b a b c f
            6 f 6 a c c a b c c b a c a f f
            6 5 6 a a c c a b b a c c f f f
            6 6 6 a a a c c c c c c a f f f
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0xA, img`
            f f f f f f f a a f f f f f f f
            f a 9 9 a f a a a a f f f f f f
            a 9 9 9 9 a a a a a f d e e d f
            9 f 9 9 f 9 f a a f d e e e e d
            4 a 4 4 a 4 f f f f e f e e f 9
            4 4 4 4 4 4 a 9 9 f e d e e d 9
            9 4 a a 4 9 8 8 8 8 f e f f 9 9
            f 9 4 4 9 8 9 8 8 9 8 a a a 9 a
            a a a a a 8 a 8 8 a 8 a 9 9 a f
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0xB, img`
            f f f f a e e a f f f a 9 9 9 9
            f f f a e e e e a f f 9 a 9 9 a
            9 f f e f e e f e f f 9 a 9 9 a
            e e f e d e e d e f f d 9 9 9 9
            d e d e e a a e e a d d a 9 9 a
            f d d a e 9 9 e 9 e e e e a a a
            f a d a a e e 9 e 9 e e 9 e a a
            f f a d d d d a d a d d a d f f
            f f f f a d d a d d d d d d f f
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0xC, img`
            a a f f f f f f f a a a a f f f
            9 a 5 5 a f f f f a a a a a f a
            9 5 5 5 5 a f f a a a f a a a 8
            5 f 5 5 f 5 f f a a f 9 a f 8 a
            5 a 5 5 a 5 a b b a f 8 8 f 8 9
            5 5 5 5 5 a b b b b a 9 8 a 8 8
            a 5 f f a b f b b f b a 9 9 a 8
            a a 5 5 a b c b b c b a a 9 9 a
            a a a a a b b b b b b a a a 9 9
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0xD, img`
            f f f f a a a a f f f f f f f a
            8 8 a f a a a f f a e e a f a a
            8 8 8 a f f f f a e e e e a a a
            8 8 a 8 f a 9 f e f e e f e f a
            8 8 9 8 f 8 8 f d a d d a d f f
            a a 8 8 a 8 9 f d d d d d d a 9
            9 9 8 a 9 a f f e d a a d e 8 8
            8 8 a 9 9 f f f f e d d e 8 9 8
            9 9 9 9 a f f f a a a a a 8 a 8
            f f f a 5 5 5 5 5 5 5 5 5 5 5 5
            f a 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            f 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            a 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        scene.setTile(0xE, img`
            a f f f f f f f f f f f a 6 6 a
            a a f f f f f f f f f a 6 6 6 6
            a a f a 9 9 a f 9 f f 6 f 6 6 f
            a f a 9 9 9 9 a 6 6 f 6 5 6 6 5
            f f 9 f 9 9 f 9 9 6 5 6 6 a a 6
            9 f 9 a 9 9 a 9 f 9 9 a 6 9 9 6
            d d f 9 f f 9 9 f a 9 a a 6 6 9
            d 9 d a a a 9 a f f a 9 9 9 9 a
            d a d a 9 9 a f f f f f a 9 9 a
            5 5 5 5 5 5 5 5 5 5 5 5 a f f f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 a f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 f
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 a
            6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
        `, false);
        createLogo();
        createFieldGoals();
    }

    function createLogo() {
        const output = sprites.create(img`
            . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . .
            . . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . . .
            . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . .
            . . . . . . . 1 b b b b 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 b b b b 1 . . . . . . .
            . . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . 1 1 1 1 1 . . . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . 1 1 d d d d d 1 1 . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . 1 d d d d d d d d d 1 . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . 1 d d d d d d d d d 1 . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . 1 d d d d d d d d d 1 . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . 1 d d d d d d d 1 . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . 1 d d d d d d d 1 . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . . 1 d d d d d 1 . . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . 1 1 1 1 1 1 1 1 d d d d d 1 1 1 1 1 1 1 1 . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 1 d d d d d d d d d d d d d d d d d d d 1 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . 1 b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d 1 1 1 d d d 1 . . . . . . . . 1 b b b 1 . . . .
            . . . 1 b b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . 1 1 d 1 . . . . . . . . 1 b b b b 1 . . .
            . . 1 b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . . . 1 1 . . . . . . . . . 1 b b b b 1 . .
            . 1 b b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . 1 . . . . . . . . . 1 b b b b b 1 .
            1 b b b b 1 1 . . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . . . . . . . . . . . . 1 1 b b b b 1
            . 1 b b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . . . . . . . . . . . 1 b b b b b 1 .
            . . 1 b b b b 1 . . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . . . . . . . . . . . 1 b b b b 1 . .
            . . . 1 b b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d 1 . . . . . . . 1 . . . . . . . . 1 b b b b 1 . . .
            . . . . 1 b b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . . . 1 1 . . . . . . . . 1 b b b 1 . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d 1 . . . 1 1 d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d 1 1 1 d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 d d d d d d d d d d d d d d d d d d d d d 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . 1 1 d d d d d d d d d d d d d d d d d d d 1 1 . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b 1 . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . .
            . . . . . . . 1 b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b 1 . . . . . . .
            . . . . . . . 1 b b b b 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 b b b b 1 . . . . . . .
            . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . .
            . . . . . . . . . 1 b b b b b b 1 . . . . . . . . . . . . . . . . . . . . . . . 1 b b b b b b 1 . . . . . . . . .
            . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . . . . . . . . . . . . . . . 1 1 1 1 1 1 1 . . . . . . . . . .
        `, SpriteKind.Logo);
        output.setFlag(SpriteFlag.Ghost, true);
        output.setPosition(field.WIDTH >> 1, 4 * 16);
        output.z = zindex.BACKGROUND;
        return output;
    }

    function createFieldGoals() {
        const fieldGoals = [
            sprites.create(img`
                . a a . . . . . . . . . . . . .
                a 9 9 a . . . . . . . . . . . .
                a 9 9 a . . . . . . . . . . . .
                . a a 8 9 . . . . . . . . . . .
                . 9 9 8 9 . . . . . . . . . . .
                . . a 8 8 9 . . . . . . . . . .
                . . 9 9 8 9 . . . . . . . . . .
                . . . a 8 8 9 . . . . . . . . .
                . . . 9 9 8 9 . . . . . . . . .
                . . . . a 8 8 9 . . . . . . . .
                . . . . 9 9 8 9 . . . . . . . .
                . . . . . a 8 8 9 . . . . . . .
                . . . . . 9 9 8 9 . . . . . . .
                . . . . . . a 8 8 9 . . . . . .
                . . . . . . 9 9 8 9 . . . . . .
                . . . . . . . a 8 8 9 . . . . .
                . . . . . . . 9 9 8 9 . . . . .
                . . . . . . . . a 8 8 9 . . . .
                . . . . . . . . 9 9 8 9 . . . .
                . . . . . . . . . a 8 8 9 . . .
                . . . . . . . . . 9 9 8 9 . . .
                . . . . . . . . . . a 8 8 9 . .
                . . . . . . . . . . 9 9 8 9 . .
                . . . . . . . . . . . a 8 8 9 .
                . . . . . . . . . . . 9 9 8 9 .
                . . . . . . . . . . . . a 8 1 9
                . . . . . . . . . . . . a 1 1 9
                . . . . . . . . . . . . a 1 1 9
                . a a . . . . . . . . . a 1 1 9
                a 9 9 a . . . . . . . . a 1 1 9
                a 9 9 a . . . . . . . . a 1 1 9
                . a a 8 9 . . . . . . . a 1 1 9
                . 9 9 8 9 . . . . . . . a 1 1 9
                . . a 8 8 9 . . . . . . a 1 1 9
                . . 9 9 8 9 . . . a a a 9 1 1 9
                . . . a 8 8 a a a 9 9 9 9 1 1 9
                . . . 9 9 8 a a 9 a a a 9 1 1 9
                . . . . a 8 8 9 a a . . 9 1 1 9
                . . . a 9 9 8 a a . . . 9 1 1 9
                . . . a 9 a 8 8 9 . . . 9 1 1 9
                . . a 9 a 9 9 8 9 . . . 9 1 1 9
                . . a 9 f . a 8 8 9 . . 9 1 1 9
                . . f 9 f . 9 9 8 9 . . 9 1 1 9
                . . f a f . . a 8 8 9 . 9 1 1 9
                . . f a f . . 9 9 8 9 . 9 1 1 9
                . . f a f . . . a 8 8 9 9 1 1 9
                . . f a f . . . 9 9 8 9 9 1 1 9
                . a f a f a . . . a 8 8 9 1 1 9
                a 9 f a f 9 a . . 9 9 8 8 1 1 9
                a 8 f f f 8 a . . . a 8 8 8 1 9
                a 8 a f a 8 a . . . 9 9 8 8 1 9
                a 9 8 8 8 9 a . . . . a 8 8 8 a
                a 9 9 9 9 9 a . . . . 9 9 8 8 a
                a 9 9 9 9 9 a . . . . . a 8 8 a
                a 9 9 9 9 9 a . . . . . 9 9 8 a
                a 9 9 9 9 9 a . . . . . . a a .
                a 9 9 9 9 9 a . . . . . . . . .
                a 9 9 9 9 9 a . . . . . . . . .
                a 9 9 9 9 9 a . . . . . . . . .
                a 9 9 9 9 9 a . . . . . . . . .
                a 9 9 9 9 9 a . . . . . . . . .
                a 9 9 9 9 9 a . . . . . . . . .
                . a 9 9 9 a . . . . . . . . . .
                . . a a a . . . . . . . . . . .
            `, SpriteKind.FieldGoal),
            sprites.create(img`
                . . . . . . . . . . . . . a a .
                . . . . . . . . . . . . a 9 9 a
                . . . . . . . . . . . . a 9 9 a
                . . . . . . . . . . . 9 8 a a .
                . . . . . . . . . . . 9 8 9 9 .
                . . . . . . . . . . 9 8 8 a . .
                . . . . . . . . . . 9 8 9 9 . .
                . . . . . . . . . 9 8 8 a . . .
                . . . . . . . . . 9 8 9 9 . . .
                . . . . . . . . 9 8 8 a . . . .
                . . . . . . . . 9 8 9 9 . . . .
                . . . . . . . 9 8 8 a . . . . .
                . . . . . . . 9 8 9 9 . . . . .
                . . . . . . 9 8 8 a . . . . . .
                . . . . . . 9 8 9 9 . . . . . .
                . . . . . 9 8 8 a . . . . . . .
                . . . . . 9 8 9 9 . . . . . . .
                . . . . 9 8 8 a . . . . . . . .
                . . . . 9 8 9 9 . . . . . . . .
                . . . 9 8 8 a . . . . . . . . .
                . . . 9 8 9 9 . . . . . . . . .
                . . 9 8 8 a . . . . . . . . . .
                . . 9 8 9 9 . . . . . . . . . .
                . 9 8 8 a . . . . . . . . . . .
                . 9 8 9 9 . . . . . . . . . . .
                9 1 8 a . . . . . . . . . . . .
                9 1 1 a . . . . . . . . . . . .
                9 1 1 a . . . . . . . . . . . .
                9 1 1 a . . . . . . . . . a a .
                9 1 1 a . . . . . . . . a 9 9 a
                9 1 1 a . . . . . . . . a 9 9 a
                9 1 1 a . . . . . . . 9 8 a a .
                9 1 1 a . . . . . . . 9 8 9 9 .
                9 1 1 a . . . . . . 9 8 8 a . .
                9 1 1 9 a a a . . . 9 8 9 9 . .
                9 1 1 9 9 9 9 a a a 8 8 a . . .
                9 1 1 9 a a a 9 a a 8 9 9 . . .
                9 1 1 9 . . a a 9 8 8 a . . . .
                9 1 1 9 . . . a a 8 9 9 a . . .
                9 1 1 9 . . . 9 8 8 a 9 a . . .
                9 1 1 9 . . . 9 8 9 9 a 9 a . .
                9 1 1 9 . . 9 8 8 a . f 9 a . .
                9 1 1 9 . . 9 8 9 9 . f 9 f . .
                9 1 1 9 . 9 8 8 a . . f a f . .
                9 1 1 9 . 9 8 9 9 . . f a f . .
                9 1 1 9 9 8 8 a . . . f a f . .
                9 1 1 9 9 8 9 9 . . . f a f . .
                9 1 1 9 8 8 a . . . a f a f a .
                9 1 1 8 8 9 9 . . a 9 f a f 9 a
                9 1 8 8 8 a . . . a 8 f f f 8 a
                9 1 8 8 9 9 . . . a 8 a f a 8 a
                a 8 8 8 a . . . . a 9 8 8 8 9 a
                a 8 8 9 9 . . . . a 9 9 9 9 9 a
                a 8 8 a . . . . . a 9 9 9 9 9 a
                a 8 9 9 . . . . . a 9 9 9 9 9 a
                . a a . . . . . . a 9 9 9 9 9 a
                . . . . . . . . . a 9 9 9 9 9 a
                . . . . . . . . . a 9 9 9 9 9 a
                . . . . . . . . . a 9 9 9 9 9 a
                . . . . . . . . . a 9 9 9 9 9 a
                . . . . . . . . . a 9 9 9 9 9 a
                . . . . . . . . . a 9 9 9 9 9 a
                . . . . . . . . . . a 9 9 9 a .
                . . . . . . . . . . . a a a . .
            `, SpriteKind.FieldGoal)
        ];
        fieldGoals[0].left = -5;
        fieldGoals[1].right = field.WIDTH + 5;
        fieldGoals.forEach(fg => {
            fg.setFlag(SpriteFlag.Ghost, true);
            fg.y = field.HEIGHT >> 1;
            fg.z = zindex.FIELD_GOAL;
        });
    }
}