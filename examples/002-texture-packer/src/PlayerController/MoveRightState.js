class MoveRightState {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  /**
   * @param {Phaser.Physics.Arcade.Sprite} player
   */
  constructor(player) {
    this.player = player;
  }

  enter() {
    const speed = 200;

    this.player.play("run");
    this.player.setVelocity(speed, 0);
    this.player.flipX = false;
  }
}

export default MoveRightState;
