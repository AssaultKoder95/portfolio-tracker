const shortId = require('shortid');

const TradesModel = require('../models/trades');
const PortfolioModel = require('../models/portfolio');

const constants = require('../utils/constants');

function sanitizeRecord(record) {
  const { _id, __v, createdAt, updatedAt, ...sanitizedRecord } = record;

  sanitizedRecord.price = parseFloat(sanitizedRecord.price);
  sanitizedRecord.quantity = parseInt(sanitizedRecord.quantity, 10);
  sanitizedRecord.timestamp = createdAt;

  return sanitizedRecord;
}

async function canUserSellShares({ userId, symbol, quantity }) {
  const portfolio = await PortfolioModel.findOne({ userId, symbol });

  if (!portfolio) {
    throw 'NO_USER_FOUND';
  }

  const existingQuantity = parseInt(portfolio.quantity, 10);
  if (quantity > existingQuantity) {
    throw 'QTY_GREATER_HOLDING';
  }

  return Promise.resolve();
}

async function updatePortfolio({ userId, symbol, quantity, price, orderType }) {
  const portfolio = await PortfolioModel.findOne({ userId, symbol });

  if (!portfolio) {
    const newPortfolio = new PortfolioModel({ userId, symbol, quantity, price });
    await newPortfolio.save();
    return Promise.resolve();
  }

  const existingQuantity = parseInt(portfolio.quantity, 10) || 0;
  const averagePrice = parseFloat(portfolio.price) || 0;

  if (orderType === constants.ORDER_TYPE.BUY) {
    const updatedQuantity = existingQuantity + parseInt(quantity, 10);
    const updatedAvgPrice =
      (averagePrice * existingQuantity + parseFloat(price) * parseInt(quantity, 10)) / updatedQuantity;

    portfolio.quantity = updatedQuantity;
    portfolio.price = updatedAvgPrice.toFixed(4);
  } else {
    portfolio.quantity = existingQuantity - parseInt(quantity, 10);
  }

  await portfolio.save();

  return Promise.resolve();
}

async function negateTradeEffect({ userId, symbol, quantity, price, orderType }) {
  const portfolio = await PortfolioModel.findOne({ userId, symbol });
  const existingQuantity = parseInt(portfolio.quantity, 10);
  const averagePrice = parseFloat(portfolio.price);

  if (orderType === constants.ORDER_TYPE.BUY) {
    const updatedQuantity = existingQuantity - parseInt(quantity, 10);
    const updatedAvgPrice =
      (averagePrice * existingQuantity - parseFloat(price) * parseInt(quantity, 10)) / updatedQuantity;

    portfolio.quantity = updatedQuantity;
    portfolio.price = updatedAvgPrice.toFixed(4);
  } else {
    portfolio.quantity = existingQuantity + parseInt(quantity, 10);
  }

  await portfolio.save();

  return Promise.resolve();
}

async function createTrade({ userId, orderType, symbol, price, quantity }) {
  const trade = new TradesModel({
    userId,
    quantity,
    symbol,
    price,
    orderType,
    tradeId: shortId.generate(),
  });

  await trade.save();

  return sanitizeRecord(trade.toObject());
}

async function addTrade({ userId, orderType, symbol, price, quantity }) {
  if (orderType === constants.ORDER_TYPE.SELL) {
    await canUserSellShares({ userId, symbol, quantity });
  }

  const trade = await createTrade({ userId, orderType, symbol, price, quantity });
  await updatePortfolio({ userId, orderType, symbol, price, quantity });

  return Promise.resolve(trade);
}

async function updateTrade({ userId, tradeId, newQuantity, newPrice }) {
  const trade = await TradesModel.findOne({ userId, tradeId }).lean();

  if (!trade) {
    throw 'NO_TRADE_FOUND';
  }

  await negateTradeEffect(trade);

  const updatedTrade = { ...trade };

  if (newPrice) {
    updatedTrade.price = newPrice;
    await TradesModel.findOneAndUpdate({ userId, tradeId }, { price: newPrice });
  }

  if (newQuantity) {
    updatedTrade.quantity = newQuantity;
    await TradesModel.findOneAndUpdate({ userId, tradeId }, { quantity: newQuantity });
  }

  await updatePortfolio(updatedTrade);

  return Promise.resolve(sanitizeRecord(updatedTrade));
}

async function deleteTrade({ userId, tradeId }) {
  const trade = await TradesModel.findOne({ userId, tradeId });

  if (!trade) {
    throw 'NO_TRADE_FOUND';
  }

  const tradeObj = trade.toObject();

  await negateTradeEffect(tradeObj);
  await TradesModel.findOneAndDelete({ userId, tradeId });

  return Promise.resolve(sanitizeRecord(tradeObj));
}

module.exports = {
  addTrade,
  updateTrade,
  deleteTrade,
};
