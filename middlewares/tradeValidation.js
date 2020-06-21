const shortId = require('shortid');

const {
  orderTypeValidation,
  quantityValidation,
  priceValidation,
  symbolValidation,
  userIdValidation,
} = require('../utils/tradeSpecificValidators');

const statusCodes = require('../utils/statusCodes');
const responseHandler = require('../utils/responseHandler');
const { ERR_MESSAGES } = require('../utils/messages');

function tradeIdValidator(req, res, next) {
  const { tradeId } = req.params;

  if (!shortId.isValid(tradeId)) {
    return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES['INVALID_TRADE_ID']);
  }

  next();
}

function tradeValidator(req, res, next) {
  try {
    const { quantity, price, orderType, symbol, userId } = req.body;
    orderTypeValidation(orderType);
    quantityValidation(quantity);
    priceValidation(price);
    symbolValidation(symbol);
    userIdValidation(userId);
  } catch (err) {
    return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES[err]);
  }

  next();
}

function tradeUpdationValidator(req, res, next) {
  try {
    const { quantity, price } = req.body;

    if (!quantity && !price && quantity !== 0 && price !== 0) {
		throw 'MISSING_SHARE_QUANTITY_AND_PRICE';
	}

    if (typeof price !== 'number' || Number.isNaN(price)) {
      throw 'INVALID_TYPEOF_SHARE_PRICE';
    }

    if (typeof quantity !== 'number' || Number.isNaN(quantity)) {
      throw 'INVALID_TYPEOF_SHARE_QUANTITY';
    }

    if (quantity <= 0) {
      throw 'INVALID_SHARE_QUANTITY';
    }

    if (price <= 0) {
      throw 'INVALID_SHARE_PRICE';
    }
  } catch (err) {
    return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES[err]);
  }

  next();
}

module.exports = {
  tradeIdValidator,
  tradeValidator,
  tradeUpdationValidator,
};
