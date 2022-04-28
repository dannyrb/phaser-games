import IdleState from "./IdleState";
import MoveLeftState from "./MoveLeftState";
import MoveRightState from "./MoveRightState";

/**
 * TODO:
 * - We "flipX" the player if they change walking direction
 * - This should only happen when reusing left/right walking sprite, but img needs flipped
 * - This "happens" to persist the flip for the idle state as well
 */
class PlayerController {
  states = {};
  currentState = "moveLeft";

  /**
   * @param {Phaser.Physics.Arcade.Sprite} player
   */
  constructor(player) {
    this.states = {
      idle: new IdleState(player),
      moveLeft: new MoveLeftState(player),
      moveRight: new MoveRightState(player),
      // moveDown: new MoveDownState(player),
      // moveUp: new MoveUpState(player)
    };
  }

  setState(name) {
    if (this.currentState === this.states[name]) {
      return;
    }

    this.currentState = this.states[name];
    this.currentState.enter();
  }
}

export default PlayerController;
