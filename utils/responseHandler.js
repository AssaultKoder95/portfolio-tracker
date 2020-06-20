const errorMessages = require('./messages').errors;
const statusCodes = require('./statusCodes');

function sendSuccessResponse(res, status, obj) {

  if (!status) {
    res.status(statusCodes.INTERNAL_ERROR);
    res.send(errorMessages['500']);
    return;
  }

  res.status(status);

  obj = obj || {};
  res.send(obj);
}

function sendErrorResponse(res, status, message) {
  const error = {
    status,
    message,
  };

  if (!status) {
	status = statusCodes.INTERNAL_ERROR;
	error.status = statusCodes.INTERNAL_ERROR;
    error.message = error.errorMessages[statusCodes.INTERNAL_ERROR];
  }

  res.status(status);
  res.send(error);
}

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
