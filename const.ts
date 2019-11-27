namespace SpriteKind {
    export const Ball = SpriteKind.create();
    export const Shadow = SpriteKind.create();
    export const ThrowTarget = SpriteKind.create();
    export const Logo = SpriteKind.create();
    export const PlayerTeam = SpriteKind.create();
    export const OpposingTeam = SpriteKind.create();
    export const FieldGoal = SpriteKind.create();
}

namespace datakey {
    export const IS_CHASING_BALL = "NOW_FOLLOWING_BALL";
}

// must maintain relative positions of left / leftWithBall and right/rightWithBall,
// such that the one without the ball is one less than the one with the ball.
enum PlayerAnimation {
    Left = 0,
    LeftWithBall = 1,
    Right = 2,
    RightWithBall = 3,
    Celebrate1 = 4,
    Celebrate2 = 5,
    Celebrate3 = 6,
    ThrowLeft = 7,
    ThrowRight = 8
}

enum MovementDirection {
    Left = -1,
    Right = 1
}

enum TeamId {
    //% block="player"
    Player = 0,
    //% block="computer"
    Computer = 1
}

namespace zindex {
    export const BACKGROUND = 0;
    export const SHADOW = 1;
    export const THROW_TARGET = 2;
    export const OPPOSING_TEAM = 5;
    export const PLAYER_TEAM = 6;
    export const BALL = 10;
    export const FIELD_GOAL = 15;
    export const PLAYER_INDICATOR = 20;
    export const HUD = 100; // scene.HUD_Z
}

namespace field {
    export const TILE_SIZE = 16;
    export const WIDTH = 20 * TILE_SIZE;
    export const HEIGHT = 7 * TILE_SIZE;

    export const START_OFFSET = 55;
}