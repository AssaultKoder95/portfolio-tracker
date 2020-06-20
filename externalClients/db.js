const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
let mongoServer;

mongoose.Promise = Promise;
mongoose.set('useFindAndModify', false);

module.exports.initialize = () => {
  mongoServer = new MongoMemoryServer();
  return new Promise((resolve, reject) => {
    mongoServer.getConnectionString().then((mongoUri) => {
      const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
      };

      mongoose.connect(mongoUri, mongooseOpts);

      mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e);
          mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
        reject();
      });

      mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to testing environment at ${mongoUri}`);
        resolve();
      });
    });
  });
};

module.exports.mongoServerInstance = () => mongoServer;
