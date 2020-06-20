const express = require('express');
const router = express.Router();

const tradesController = require('../controllers/trades');

const { tradeValidator, tradeUpdationValidator, tradeIdValidator } = require('../middlewares/tradeValidation');

const responseHandler = require('../utils/responseHandler');
const statusCodes = require('../utils/statusCodes');
const { ERR_MESSAGES } = require('../utils/messages');

router.post('/', tradeValidator, async (req, res) => {
  try {
    const data = req.body;
    data.orderType = data.orderType.toUpperCase();
    const response = await tradesController.addTrade(data);
    responseHandler.sendSuccessResponse(res, statusCodes.SUCCESS, response);
  } catch (err) {
    console.log(`Inside POST /trade`, err);

    if (err === 'NO_USER_FOUND') {
      return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES.NO_USER_FOUND);
    }

    if (err === 'QTY_GREATER_HOLDING') {
      return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES.QTY_GREATER_HOLDING);
    }

    responseHandler.sendErrorResponse(res, statusCodes.INTERNAL_ERROR);
  }
});

router.put('/:userId/:tradeId', tradeIdValidator, tradeUpdationValidator, async (req, res) => {
  const { userId, tradeId } = req.params;

  const newQuantity = req.body.quantity;
  const newPrice = req.body.price;

  try {
    await tradesController.updateTrade({ userId, tradeId, newQuantity, newPrice });
    responseHandler.sendSuccessResponse(res, statusCodes.SUCCESS_UPDATE);
  } catch (err) {
    console.log(`Inside PUT /trade/${userId}/${tradeId}`, err);

    if (err === 'NO_TRADE_FOUND') {
      return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES.NO_TRADE_FOUND);
    }

    responseHandler.sendErrorResponse(res, statusCodes.INTERNAL_ERROR);
  }
});

router.delete('/:userId/:tradeId', tradeIdValidator, async (req, res) => {
  const { userId, tradeId } = req.params;
  try {
    const response = await tradesController.deleteTrade({ userId, tradeId });
    responseHandler.sendSuccessResponse(res, statusCodes.SUCCESS, response);
  } catch (err) {
    console.log(`Inside DELETE /trade/${userId}/${tradeId}`, err);

    if (err === 'NO_TRADE_FOUND') {
      return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES.NO_TRADE_FOUND);
	}

    responseHandler.sendErrorResponse(res, statusCodes.INTERNAL_ERROR);
  }
});

module.exports = router;
