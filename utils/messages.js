const errors = {
  400: {
    message: 'Your request is missing parameters / contains invalid parameters.',
  },
  401: {
    message: 'You are unauthorized to perform this action.',
  },
  403: {
    message: 'You are forbidden to perform this action.',
  },
  404: {
    message: 'We could not find the requested resource.',
  },
  429: {
    message: 'The rate limits for the requested endpoint has been exceeded.',
  },
  500: {
    message: 'We have experienced an internal error while processing your request.',
  },
};

const ERR_MESSAGES = {
  INVALID_TRADE_ID: 'The tradeId is invalid.',

  MISSING_ORDER_TYPE: 'Share order type is missing.',
  MISSING_SHARE_QUANTITY: 'Share quantity is missing.',
  MISSING_SHARE_PRICE: 'Share price is missing.',
  MISSING_SHARE_SYMBOL: 'Share symbol is missing.',
  MISSING_USER_ID: 'User id is missing.',
  MISSING_SHARE_QUANTITY_AND_PRICE: 'Share quantity and price is missing.',

  INVALID_TYPEOF_ORDER_TYPE: 'Order type must be a string.',
  INVALID_TYPEOF_SHARE_QUANTITY: 'Share quantity must be a number.',
  INVALID_TYPEOF_SHARE_PRICE: 'Share price must be a number.',
  INVALID_TYPEOF_SYMBOL: 'Share symbol must be a string.',
  INVALID_TYPEOF_USER_ID: 'User id must be a string.',

  INVALID_ORDER_TYPE: 'Order type can be buy / sell only.',
  INVALID_SHARE_QUANTITY: 'Share quantity can not be less than or equal to zero.',
  INVALID_SHARE_PRICE: 'Share price can not be less than or equal to zero.',

  NO_USER_FOUND: 'Order can not be placed as no associated user found.',
  NO_TRADE_FOUND: 'No matching trade found.',
  USER_PORTFOLIO_NOT_FOUND: 'No trades found for this user',
  QTY_GREATER_HOLDING: 'Order can not be placed as sell quantity is higher than holding quantity.',
};

module.exports = { errors, ERR_MESSAGES };
