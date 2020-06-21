var express = require('express');
var router = express.Router();

const portfolioController = require('../controllers/portfolio');

const responseHandler = require('../utils/responseHandler');
const statusCodes = require('../utils/statusCodes');
const { ERR_MESSAGES } = require('../utils/messages');

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await portfolioController.getPortfolio(userId);
    responseHandler.sendSuccessResponse(res, statusCodes.SUCCESS, response);
  } catch (err) {
    console.log(`Inside GET /portfolio/${req.params.userId}`, err);

    if (err === 'USER_PORTFOLIO_NOT_FOUND') {
      return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES.USER_PORTFOLIO_NOT_FOUND);
    }

    responseHandler.sendErrorResponse(res, statusCodes.INTERNAL_ERROR);
  }
});

router.get('/holdings/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await portfolioController.getHoldings(userId);
    responseHandler.sendSuccessResponse(res, statusCodes.SUCCESS, response);
  } catch (err) {
    console.log(`Inside GET /portfolio/holdings/${req.params.userId}`, err);

    if (err === 'USER_PORTFOLIO_NOT_FOUND') {
      return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES.USER_PORTFOLIO_NOT_FOUND);
    }

    responseHandler.sendErrorResponse(res, statusCodes.INTERNAL_ERROR);
  }
});

router.get('/returns/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await portfolioController.getStocksReturnData(userId);
    responseHandler.sendSuccessResponse(res, statusCodes.SUCCESS, response);
  } catch (err) {
    console.log(`Inside GET /portfolio/returns/${req.params.userId}`, err);

    if (err === 'USER_PORTFOLIO_NOT_FOUND') {
      return responseHandler.sendErrorResponse(res, statusCodes.BAD_REQUEST, ERR_MESSAGES.USER_PORTFOLIO_NOT_FOUND);
    }

    responseHandler.sendErrorResponse(res, statusCodes.INTERNAL_ERROR);
  }
});

module.exports = router;
