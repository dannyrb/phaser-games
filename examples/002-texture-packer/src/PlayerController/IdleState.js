class IdleState {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player;

  /**
   * @param {Phaser.Physics.Arcade.Sprite} player
   */
  constructor(player) {
    this.player = player;
  }

  // Idle in the direction we were previously walking
  enter() {
    this.player.setVelocity(0, 0);
    this.player.play("idle");
  }
}

export default IdleState;
