import Phaser from "phaser";
//
import tilesImg from "../assets/tiles.png";
import faceImg from "../assets/face.png";
import mapJson from "../assets/map1.json";
import SocketManager from "./../SocketManager.js";
//
import Align from "../util/Align";
import { AlignGrid } from "../util/alignGrid";
import { UIBlock } from "../util/UIBlock";

const state = {
  isDirty: false,
  playerDirection: 5,
};

export class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");

    this.webSocket = SocketManager.webSocket;
  }
  preload() {
    this.load.image("tiles", tilesImg);
    this.load.image("face", faceImg);
    this.load.tilemapTiledJSON("map", mapJson);
  }
  create() {
    const config = {
      tileWidth: 64,
      tileHeight: 64,
      mapWidth: 0,
      mapHeight: 0,
    };

    config.mapWidth = mapJson.width * config.tileWidth;
    config.mapHeight = mapJson.height * config.tileHeight;

    // Setup camera / world
    this.cameras.main.setBounds(0, 0, config.mapWidth, config.mapHeight);
    this.physics.world.setBounds(0, 0, config.mapWidth, config.mapHeight);

    const map = this.make.tilemap({
      key: "map",
      tileWidth: config.tileWidth,
      tileHeight: config.tileHeight,
    });
    const tileset = map.addTilesetImage("tiles1", "tiles");
    const groundLayer = map.createLayer("ground", tileset, 0, 0);
    const cactusLayer = map.createLayer("cactus", tileset, 0, 0);
    const hillLayer = map.createLayer("hills", tileset, 0, 0);

    this.player = this.physics.add
      .sprite(200, 200, "face")
      .setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player);

    // Scale player based on game width
    Align.scaleToGameW(this.player, 0.08, this);

    // Setup "input" source for cursor
    this.cursors = this.input.keyboard.createCursorKeys();

    // Player can collide with objects on this layer
    // tile id range, not inclusive, that player can collide with
    this.physics.add.collider(this.player, cactusLayer);
    cactusLayer.setCollisionBetween(38, 56);

    this.physics.add.collider(this.player, hillLayer);
    hillLayer.setCollisionBetween(5, 41);
  }

  update() {
    this.player.setVelocityY(0);
    this.player.setVelocityX(0);
    // direction
    // 1 2 3
    // 4 5 6
    // 7 8 9
    let direction = 5;

    if (this.cursors.up.isDown == true) {
      // this.player.setVelocityY(-100);
      direction -= 3;
    } else if (this.cursors.down.isDown == true) {
      // this.player.setVelocityY(100);
      direction += 3;
    }

    if (this.cursors.right.isDown == true) {
      // this.player.setVelocityX(100);
      direction += 1;
    } else if (this.cursors.left.isDown == true) {
      // this.player.setVelocityX(-100);
      direction -= 1;
    }

    if (direction !== state.direction) {
      state.direction = direction;
      state.isDirty = true;
    }

    if (state.isDirty) {
      state.isDirty = false;

      this.webSocket.send(JSON.stringify({ direction: direction }));
    }
  }
}
export default SceneMain;
