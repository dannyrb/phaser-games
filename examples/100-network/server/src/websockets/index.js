const WebSocket = require("ws");
const queryString = require("query-string");

/**
 * Extends our express server to support WebSocket upgrades
 * at `/websockets`
 *
 * @param {*} expressServer
 * @returns
 */
async function websockets(expressServer) {
  const websocketServer = new WebSocket.Server({
    noServer: true,
    path: "/websockets",
  });

  // When we upgrade a client from HTTP to WebSockets
  // emit a connection event for that client/upgrade
  expressServer.on("upgrade", (request, socket, head) => {
    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      websocketServer.emit("connection", websocket, request);
    });
  });

  // Track open websocketConnections in a set of clients
  // Remove them if they're closed
  websocketServer.on("connection", function connection(websocketConnection, connectionRequest) {
    const [_path, params] = connectionRequest?.url?.split("?");
    const connectionParams = queryString.parse(params);

    // NOTE: connectParams are not used here but good to understand how to get
    // to them if you need to pass data with the connection to identify it (e.g., a userId).
    // console.log('connection params: ', connectionParams);
    // console.log('webSocketConnection: ', websocketConnection);
    // console.log('connectionRequest: ', connectionRequest);

    console.log("New Connection!");
  });

  return websocketServer;
}

module.exports = websockets;
