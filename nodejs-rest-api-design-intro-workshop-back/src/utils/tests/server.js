const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const config = require("../../config/config");

function setupTestServer() {
  let SERVER = null;
  let MONGO_URI = null;

  const MONGO_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  async function startTestServer() {
    SERVER = new MongoMemoryServer();
    MONGO_URI = await SERVER.getUri();
  }

  function debugTestServer() {
    if (MONGO_URI) {
      config.logger.debug(`MongoDB connected to ${MONGO_URI}`);
    } else {
      config.logger.debug(`MongoDB not connected yet`);
    }
  }

  async function connectTestServer() {
    try {
      await mongoose.connect(MONGO_URI, MONGO_OPTIONS);

      mongoose.connection.on("error", (error) => {
        if (e.message.code === "ETIMEDOUT") {
          config.logger.debug(error);
          mongoose.connect(mongoUri, mongooseOpts);
        }

        config.logger.debug(error);
      });
    } catch (error) {
      config.logger.error(error);
    }
  }

  async function initTestServer() {
    await startTestServer();
    await connectTestServer();
  }

  async function clearUsersCollection() {
    await mongoose.connection.db.collection("users").deleteMany({});
  }

  async function clearSongsCollection() {
    await mongoose.connection.db.collection("songs").deleteMany({});
  }

  async function clearBooksCollection() {
    await mongoose.connection.db.collection("books").deleteMany({});
  }

  async function stopTestServer() {
    await mongoose.disconnect();
    await SERVER.stop();
  }

  return {
    initTestServer: initTestServer,
    debugTestServer: debugTestServer,
    clearUsersCollection: clearUsersCollection,
    clearSongsCollection: clearSongsCollection,
    clearBooksCollection: clearBooksCollection,
    stopTestServer: stopTestServer,
  };
}

module.exports = setupTestServer();
