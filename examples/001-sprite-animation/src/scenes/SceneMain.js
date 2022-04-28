import Phaser from "phaser";
//
import tilesImg from "../assets/tiles.png";
import brawlerSprite from "../assets/brawler48x48.png";
import mapJson from "../assets/map1.json";
//
import Align from "../util/Align";
import PlayerController from "../PlayerController";

const state = {
  isDirty: false,
  playerDirection: 5,
};

export class SceneMain extends Phaser.Scene {
  /** @type {PlayerController} */
  playerController

  constructor() {
    super("SceneMain");
  }
  preload() {
    this.load.image("tiles", tilesImg);
    this.load.spritesheet("brawler", brawlerSprite, {
      frameWidth: 48,
      frameHeight: 48,
    });
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
    // Animations
    this.anims.create({
      key: "left-walk",
      frames: this.anims.generateFrameNumbers("brawler", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "right-walk",
      frames: this.anims.generateFrameNumbers("brawler", {
        frames: [0, 1, 2, 3],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "left-idle",
      frames: this.anims.generateFrameNumbers("brawler", {
        frames: [5, 6, 7, 8],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: "right-idle",
      frames: this.anims.generateFrameNumbers("brawler", {
        frames: [5, 6, 7, 8],
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.player = this.physics.add
      .sprite(200, 200, "brawler")
      .setScale(8)
      .setCollideWorldBounds(true);

    // create an instance of PlayerController 👇
		this.playerController = new PlayerController(this.player)

		// set initial state to 'idle' 👇
		this.playerController.setState('moveLeft')
    
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

    if (this.cursors.left.isDown) {
      this.playerController.setState('moveLeft');
    } else if (this.cursors.right.isDown) {
      this.playerController.setState('moveRight');
    } else if (this.cursors.up.isDown) {
    } else if (this.cursors.down.isDown) {
    } else {
      this.playerController.setState('idle');
    }
    
  }
}
export default SceneMain;
