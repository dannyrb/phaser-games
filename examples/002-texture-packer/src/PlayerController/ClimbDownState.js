class ClimbDownState {
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

    this.player.play("climb");
    this.player.setVelocity(0, +speed);
    this.player.flipX = false;
  }
}

export default ClimbDownState;
