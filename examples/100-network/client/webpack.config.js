const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    proxy: {
      "/websockets": {
        target: "ws://localhost:3000/websockets",
        ws: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(png)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
