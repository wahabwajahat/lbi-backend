var dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: 5000,
  MONGO_URI: "mongodb://wahabwajahat:gun24Run@cluster0-shard-00-00-tgl43.mongodb.net:27017,cluster0-shard-00-01-tgl43.mongodb.net:27017,cluster0-shard-00-02-tgl43.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
  MONGO_DB_NAME: "LBI",
  JWT_SECRET: "sl_myJwtSecret"
};