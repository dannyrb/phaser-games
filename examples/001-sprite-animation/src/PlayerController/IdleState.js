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
    const key = this.player.anims.currentAnim.key;
    const parts = key.split("-");
    const direction = parts[0];

    this.player.setVelocity(0, 0);
    this.player.play(`${direction}-idle`);
  }
}

export default IdleState;
