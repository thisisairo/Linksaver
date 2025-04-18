const mongoose = require("mongoose");
require("dotenv/config");

let connection;

const connect = async (connectionURI) => {
  const uri = connectionURI || process.env.MONGODB_URI;
  try {
    connection = await mongoose.connect(uri);
    return connection;
  } catch (error) {
    console.error(error);
  }
};

const disconnect = async () => mongoose.disconnect();

const getConnection = () => connection;

module.exports = {
  connect,
  disconnect,
  getConnection,
};
