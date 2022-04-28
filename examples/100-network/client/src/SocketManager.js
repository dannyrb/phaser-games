function createSocketManager() {
  const webSocketUrl = "ws://localhost:3000/websockets";
  const webSocket = new WebSocket(webSocketUrl);

  webSocket.onopen = function (event) {
    webSocket.send(JSON.stringify({ message: "Hello" }));
  };

  webSocket.onmessage = function (event) {
    console.log(event);
  };

  return {
    webSocket,
  };
}

const SocketManager = createSocketManager();

export default SocketManager;
