const uuid = require('uuid');

module.exports = requestInitializer = (req, res, next) => {
  req.requestData = req.requestData || {};
  req.requestData.requestId = uuid.v4();

  res.header('x-sm-requestId', req.requestData.requestId);

  next();
};
