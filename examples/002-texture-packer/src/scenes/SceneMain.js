import Phaser from "phaser";
import Player from "../Player";
// Map
import tilesImg from "../assets/map/tiles.png";
import mapJson from "../assets/map/map1.json";
//
import Align from "../util/Align";

export class SceneMain extends Phaser.Scene {
  player;
  sceneTextureObjects = [];

  constructor() {
    super("SceneMain");
    this.player = new Player(this);
  }
  preload() {
    this.player.preload();
    this.load.image("tiles", tilesImg);
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

    // Player
    this.player.create(200, 200);
    this.cameras.main.startFollow(this.player._instance);

    // Scale player based on game width
    Align.scaleToGameW(this.player._instance, 0.08, this);

    // Setup "input" source for cursor
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.action("moveLeft");
    } else if (this.cursors.right.isDown) {
      this.player.action("moveRight");
    } else if (this.cursors.up.isDown) {
      this.player.action("climbUp");
    } else if (this.cursors.down.isDown) {
      this.player.action("climbDown");
    } else {
      this.player.action("idle");
    }
  }
}
export default SceneMain;
