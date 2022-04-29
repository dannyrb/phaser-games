import playerSprite from "../assets/player/player.png";
import playerAtlas from "../assets/player/player.json";
import PlayerController from "../PlayerController";

class Player {
  /** @type {Phaser.Scene} */
  _scene;
  /** @type {PlayerController} */
  _playerController;
  /** @type {String} */
  _textureName = "playerTexture";
  /** @type {Phaser.Physics.Arcade.Sprite} */
  _instance;

  constructor(PhaserScene) {
    this._scene = PhaserScene;
  }

  /**
   *
   * @param {*} PhaserScene
   */
  preload() {
    this._scene.load.atlas(this._textureName, playerSprite, playerAtlas);
  }

  create(x, y) {
    this._createAnimations(this._textureName);
    this._instance = this._scene.physics.add
      .sprite(x, y, this._textureName)
      .setCollideWorldBounds(true);

    this._playerController = new PlayerController(this._instance);
    this.action("idle");
  }

  action(actionName) {
    switch (actionName) {
      case "climbDown":
        this._playerController.setState("climbDown");
        break;

      case "climbUp":
        this._playerController.setState("climbUp");
        break;

      case "moveLeft":
        this._playerController.setState("moveLeft");
        break;

      case "moveRight":
        this._playerController.setState("moveRight");
        break;

      default:
        this._playerController.setState("idle");
    }
  }

  /**
   *
   * @private
   * @param {string} textureName
   */
  _createAnimations(textureName) {
    const climb = this._scene.anims.generateFrameNames(textureName, {
      start: 0,
      end: 9,
      zeroPad: 2,
      prefix: "climb/player_climb_",
      suffix: ".png",
    });

    this._scene.anims.create({
      key: "climb",
      frames: climb,
      frameRate: 8,
      repeat: -1,
    });

    const run = this._scene.anims.generateFrameNames(textureName, {
      start: 0,
      end: 9,
      zeroPad: 2,
      prefix: "run/player_run_",
      suffix: ".png",
    });

    this._scene.anims.create({
      key: "run",
      frames: run,
      frameRate: 8,
      repeat: -1,
    });

    const idle = this._scene.anims.generateFrameNames(textureName, {
      start: 0,
      end: 7,
      zeroPad: 1,
      prefix: "idle/player_idle_",
      suffix: ".png",
    });

    this._scene.anims.create({
      key: "idle",
      frames: idle,
      frameRate: 8,
      repeat: -1,
    });
  }
}

export default Player;
