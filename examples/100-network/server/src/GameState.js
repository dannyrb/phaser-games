function createGameState() {
  return {
    clients: new Set(),
    tick: 0,
    tickCancelToken: undefined,
    // queue to process
    messages: [],
    // current state of world
    worldState: {
      players: {},
    },
  };
}

const GameState = createGameState();

module.exports = GameState;
