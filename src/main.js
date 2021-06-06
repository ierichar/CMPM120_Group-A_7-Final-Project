/***
 * Group A_7 Ace Heaven - Final Project
 * Authors: Ilda Lara Aguilar, Jackson Bazeal, Ian Richardson
 * CMPM 120/ARTG 120
 * Started: May 11th, 2021
 * 
 */

//Jacksons swag comment

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            x:0,
            y:0,
            // debug off for assignment submission
             debug: true,
        },
    },
    scene: [ Menu, Credits, HowToPlay, Play, GameOver, StageComplete ]
}

let game = new Phaser.Game(config);

// Variables ------------------------------------------------------------------
// Global Level Tracker
// NOTE: stage divider is +10 between one end and the next start.
//       Also, you can adjust levels for debug, but we need to decide
//       on solid, challenging/non-boring level distances.
let globalLevel = 0;
// Tutorial             // Current Level Distances:
let stage0Start = 0;    // 0
let stage0End = 10;     // 10
// Stage 1
let stage1Start = 20;   // 20
let stage1End = 30;     // 60
// Stage 2
let stage2Start = 40;   // 70
let stage2End = 50;    // 120
// Stage 3
let stage3Start = 60;  // 130
let stage3End = 70;    // 180

const tileSize = 280;
const globalGravity = 500;
const elevatorLeft = 190;
const elevatorRight = 717;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard bindings
let keyP;
let keyM;
let keyW;
let keyA;
let keyS;
let keyD;
let keyN;