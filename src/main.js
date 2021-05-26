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
             debug: false,
        },
    },
    scene: [ Menu, Play, GameOver, stageComplete ]
}

let game = new Phaser.Game(config);

//variable
const tileSize = 280;
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