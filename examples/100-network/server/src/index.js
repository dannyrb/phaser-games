const uuid = require("uuid");
const express = require("express");
const startup = require("./lib/startup");
// import api from "./api/index";
// import middleware from "./middleware/index";
// import logger from "./lib/logger";
const websockets = require("./websockets");
const GameState = require("./GameState.js");

console.log("Initial GameState: ", GameState);

startup()
  .then(async () => {
    const app = express();
    const port = process.env.PORT || 3000;

    // middleware(app);
    // api(app);

    const server = app.listen(port, () => {
      if (process.send) {
        process.send(`Server running at http://localhost:${port}\n\n`);
      }
    });

    // Kickstart WebsocketServer
    const wsServer = await websockets(server);

    wsServer.on("connection", function connection(websocketConnection, connectionRequest) {
      const playerId = uuid.v4();
      GameState.clients.add(websocketConnection);
      GameState.worldState.players[playerId] = {
        id: playerId,
        direction: 5,
        x: 200,
        y: 200,
      };

      websocketConnection.on("message", (message) => {
        const parsedMessage = { ...JSON.parse(message), playerId: playerId };

        if (parsedMessage.hasOwnProperty("direction")) {
          GameState.messages.push(parsedMessage);
        }
      });

      websocketConnection.on("close", function () {
        console.log("Client Disconnected!");
        GameState.clients.delete(websocketConnection);
      });
    });

    startTicking(5000);
  })
  .catch((error) => {
    console.error(error);
  });

function startTicking(msInterval) {
  console.log("Start ticking...");
  processNextTick(msInterval);
}

function processNextTick(msInterval) {
  // Everything in here should be async, so we don't
  // kill the main thread?
  GameState.tick += 1;

  // Process player input
  console.log("Current Tick: ", GameState.tick);
  console.log("Num Clients: ", GameState.clients.size);
  console.log("GameState Messages: ", GameState.messages.length);
  while (GameState.messages.length > 0) {
    const message = GameState.messages.shift();
    console.log("message: ", message);
    const { playerId, direction } = message;
    const player = GameState.worldState.players[playerId];
    console.log(player);

    player.direction = direction;
  }

  // Update game state
  // 1. Update player positions
  Object.keys(GameState.worldState.players).forEach((playerId) => {
    const player = GameState.worldState.players[playerId];
    const { direction } = player;

    // Need to do collision bounds here?
    if (direction < 4) {
      player.y -= 100;
    } else if (direction > 6) {
      player.y += 100;
    }

    if ((direction - 1) % 3 === 0) {
      player.x -= 100;
    } else if (direction % 3 === 0) {
      player.x += 100;
    }
  });

  // Message players current gamestate + tick
  for (let websocketConnection of GameState.clients) {
    websocketConnection.send(
      JSON.stringify({
        tick: GameState.tick,
        players: GameState.worldState.players,
      })
    );
  }

  // Queue next tip
  GameState.tickCancelToken = setTimeout(() => {
    processNextTick(msInterval);
  }, msInterval);
}
