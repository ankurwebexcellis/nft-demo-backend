require('dotenv').config();

const enums = require('./enums');

const API_VERSION = '1.0.0';
const headers = {
  'x-api-version': API_VERSION,
  'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
  'Access-Control-Allow-Credentials': true,
};

// 200
module.exports.ok = function (data) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.OK,
    body: JSON.stringify(data),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 201
module.exports.created = function (data) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.CREATED,
    body: JSON.stringify(data),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 500
module.exports.error = function (error) {
  console.log(error);
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.SERVER_ERROR,
    body: JSON.stringify({ message: error }),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 401
module.exports.unAuthorized = function (message) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.UNAUTHORIZED,
    body: JSON.stringify({ message: message || 'Unauthorized' }), // Matches response from AWS.
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 402
module.exports.paymentRequired = function (message) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.PAYMENT_REQUIRED,
    body: JSON.stringify({ message: message || 'Payment required' }),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 403
module.exports.forbidden = function (message) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.FORBIDDEN,
    body: JSON.stringify({ message: message || 'Forbidden.' }),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 409
module.exports.conflict = function (message) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.CONFLICT,
    body: JSON.stringify({ message: message || 'Conflict' }),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 400
module.exports.badRequest = function (message, data) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.BAD_REQUEST,
    body: JSON.stringify({ message: message || 'Bad request', data }),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 418
module.exports.ipBlocked = function (isAllowed, error) {
  const lambdaProxyResponse = {
    statusCode: isAllowed == 0 ? enums.HTTP_STATUS.IP_NOT_ALLOWED : enums.HTTP_STATUS.IP_CHECK_FAILED,
    body: JSON.stringify({ message: error }),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 404
module.exports.notFound = function (message) {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.NOT_FOUND,
    body: JSON.stringify({ message: message || 'Not found' }),
    headers: headers,
  };
  return lambdaProxyResponse;
};

// 503
module.exports.serviceUnavailable = function () {
  const lambdaProxyResponse = {
    statusCode: enums.HTTP_STATUS.SERVICE_UNAVAILABLE,
    body: JSON.stringify({
      message: 'currently undergoing maintenance and is not available. Check back soon.',
    }),
    headers: headers,
  };
  return lambdaProxyResponse;
};
