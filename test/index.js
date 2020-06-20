const mongoose = require('mongoose');

// import modules
const server = require('../app');
const mongoServer = require('../externalClients/db').mongoServerInstance();

// import tests
// trades
const addTrade = require('./api/trade/add');
const updateTrade = require('./api/trade/update');
const deleteTrade = require('./api/trade/delete');
// portfolio
const fetchHoldings = require('./api/portfolio/holdings');
const fetchReturns = require('./api/portfolio/returns');

function checkInit() {
  return server.initializationComplete;
}

function wrapCheck(done) {
  if (checkInit()) {
    done();
  } else {
    setTimeout(() => {
      wrapCheck(done);
    }, 100);
  }
}

async function wrapUp() {
  await mongoose.disconnect();
  await mongoServer.stop();
  console.log('Mongoose & Mongo server successfully disconnected.');
}

before(wrapCheck);
after(wrapUp);

describe('Portfolio Tracker API Test', () => {
  describe('Trades:', () => {
    addTrade.run();
    updateTrade.run();
    deleteTrade.run();
  });

  describe('Portfolio:', () => {
    fetchHoldings.run();
    fetchReturns.run();
  });
});
