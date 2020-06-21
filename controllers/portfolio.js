const TradesModel = require('../models/trades');
const PortfolioModel = require('../models/portfolio');

function toFixedTwoDecimals(value) {
  return parseFloat(parseFloat(value).toFixed(2));
}

function sanitizeTrade(trade) {
  const { _id, __v, createdAt, updatedAt, userId, symbol, ...sanitizedTrade } = trade;

  sanitizedTrade.price = toFixedTwoDecimals(sanitizedTrade.price);
  sanitizedTrade.quantity = parseInt(sanitizedTrade.quantity, 10);
  sanitizedTrade.timestamp = createdAt;

  return sanitizedTrade;
}

function sanitizeRecord(record) {
  const { _id, __v, createdAt, updatedAt, userId, ...sanitizedRecord } = record;

  sanitizedRecord.price = toFixedTwoDecimals(sanitizedRecord.price);
  sanitizedRecord.quantity = parseInt(sanitizedRecord.quantity, 10);

  return sanitizedRecord;
}

// TODO: update this endpoint in order to fetch real time data for share
// => getCurrentStockPrice(symbol)
function getCurrentStockPrice() {
  return 100;
}

function merge(stockReturns, trades) {
  const mergedData = [];

  for (let i = 0; i < trades.length; i += 1) {
    const data = Object.assign(stockReturns[i], trades[i]);
    mergedData.push(data);
  }

  return mergedData;
}

function sanitizeSymbolWiseTrades({ trades, symbol }) {
  const sanitizedTrades = trades.map((trade) => sanitizeTrade(trade));
  return { symbol, trades: sanitizedTrades };
}

function getSymbolWiseTradeData(userId) {
  const match = { $match: { userId } };
  const groupBy = { $group: { _id: '$symbol', trades: { $push: '$$ROOT' } } };
  const sort = { $sort: { _id: 1 } };
  const projection = { $project: { symbol: '$_id', trades: 1, _id: 0 } };

  return TradesModel.aggregate([match, groupBy, sort, projection]);
}

async function getPortfolio(userId) {
  const symbolWiseTrades = await getSymbolWiseTradeData(userId);

  if (!symbolWiseTrades.length) throw 'USER_PORTFOLIO_NOT_FOUND';

  const sanitizedSymbolWiseTrades = symbolWiseTrades.map(sanitizeSymbolWiseTrades);
  const symbolWiseReturns = await getStocksReturnData(userId);
  const conslidatedData = merge(symbolWiseReturns, sanitizedSymbolWiseTrades);

  return conslidatedData;
}

async function getHoldings(userId) {
  const allStocks = await PortfolioModel.find({ userId })
    .where({ quantity: { $gt: 0 } })
    .sort({ symbol: 1 })
    .lean();

  if (!allStocks.length) throw 'USER_PORTFOLIO_NOT_FOUND';

  return allStocks.map((stock) => sanitizeRecord(stock));
}

async function getStocksReturnData(userId) {
  const holdings = await getHoldings(userId);
  const data = holdings.map((stock) => {
    const { price, quantity } = stock;
    const currentStockPrice = getCurrentStockPrice();

    const returnValue = (currentStockPrice - price) * quantity;
    const returnPercentage = (returnValue / (quantity * price)) * 100;

    stock.currentPrice = currentStockPrice;
    stock.returns = {
      value: toFixedTwoDecimals(returnValue),
      percentage: toFixedTwoDecimals(returnPercentage),
    };

    return sanitizeRecord(stock);
  });

  return data;
}

module.exports = {
  getPortfolio,
  getHoldings,
  getStocksReturnData,
};
