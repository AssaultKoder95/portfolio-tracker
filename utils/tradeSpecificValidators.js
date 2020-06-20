const orderTypeValidation = (orderType) => {
  if (!orderType) {
    throw 'MISSING_ORDER_TYPE';
  }

  if (typeof orderType !== 'string') {
    throw 'INVALID_TYPEOF_ORDER_TYPE';
  }

  if (orderType.toUpperCase() !== 'BUY' && orderType.toUpperCase() !== 'SELL') {
    throw 'INVALID_ORDER_TYPE';
  }
};

const quantityValidation = (quantity) => {
  if (!quantity && quantity !== 0) {
    throw 'MISSING_SHARE_QUANTITY';
  }

  if (typeof quantity !== 'number' || Number.isNaN(quantity)) {
    throw 'INVALID_TYPEOF_SHARE_QUANTITY';
  }

  if (quantity <= 0) {
    throw 'INVALID_SHARE_QUANTITY';
  }
};

const priceValidation = (price) => {
  if (!price && price !== 0) {
    throw 'MISSING_SHARE_PRICE';
  }

  if (typeof price !== 'number' || Number.isNaN(price)) {
    throw 'INVALID_TYPEOF_SHARE_PRICE';
  }

  if (price <= 0) {
    throw 'INVALID_SHARE_PRICE';
  }
};

const symbolValidation = (symbol) => {
  if (!symbol) {
    throw 'MISSING_SHARE_SYMBOL';
  }

  if (typeof symbol !== 'string') {
    throw 'INVALID_TYPEOF_SYMBOL';
  }
};

// TODO: Add implementation specific validation for userId
// currently supports string value
const userIdValidation = (userId) => {
  if (!userId) {
    throw 'MISSING_USER_ID';
  }

  if (typeof userId !== 'string') {
    throw 'INVALID_TYPEOF_USER_ID';
  }
};

module.exports = {
  orderTypeValidation,
  quantityValidation,
  priceValidation,
  symbolValidation,
  userIdValidation,
};
