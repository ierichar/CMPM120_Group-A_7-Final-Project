/***
 * Group A_7 Ace Heaven - Final Project
 * Authors: Ilda Lara Aguilar, Jackson Bazeal, Ian Richardson
 * CMPM 120/ARTG 120
 * Started: May 11th, 2021
 * 
 */

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
            debug: true,
        },
    },
    scene: [ ]
}