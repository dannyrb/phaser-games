// import logger from "./logger";
require("../api/fixtures");

const handleProcessEvents = () => {
  try {
    process.on("exit", async () => {
      //   if (
      //     process.mongodb &&
      //     process.mongodb.connection &&
      //     process.mongodb.connection.isConnected()
      //   ) {
      //     process.mongodb.connection.close();
      //   }
    });

    process.on("uncaughtException", (error) => {
      //logger.error(error);
      console.warn(error);
    });

    process.on("uncaughtException", async (error) => {
      //logger.error(error);
      console.warn(error);
    });

    process.on("unhandledRejection", async (error) => {
      //logger.error(error);
      console.warn(error);
    });
  } catch (exception) {
    throw new Error(`[startup.handleProcessEvents] ${exception.message || exception}`);
  }
};

const startup = async (options, { resolve, reject }) => {
  try {
    handleProcessEvents();
    resolve();
  } catch (exception) {
    reject(`[startup] ${exception.message}`);
  }
};

const startupWithOptions = (options) =>
  new Promise((resolve, reject) => {
    startup(options, { resolve, reject });
  });

module.exports = startupWithOptions;
