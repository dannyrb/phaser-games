/*jshint esversion: 6 */
import Phaser from "phaser";
import { SceneMain } from "./scenes/SceneMain";
import SocketManager from "./SocketManager.js";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 480,
  height: 640,
  backgroundColor: 0x000000,
  scene: SceneMain,
  // https://photonstorm.github.io/phaser3-docs/Phaser.Physics.Arcade.html
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
