const Joi = require('joi');

function validateContractRequest(request) {
  const schema = Joi.object({
    address: Joi.string().required(),
    limit: Joi.number().min(10).max(200),
    next: Joi.string().allow(null),
  });
  return schema.validate(request);
}

function validateWalletRequest(request) {
  const schema = Joi.object({
    address: Joi.string().required(),
    limit: Joi.number().min(10).max(200),
    next: Joi.string().allow(null),
  });
  return schema.validate(request);
}

function validateDetailRequest(request) {
  const schema = Joi.object({
    address: Joi.string().required(),
    identifier: Joi.string().required(),
  });
  return schema.validate(request);
}

exports.validateContractRequest = validateContractRequest;
exports.validateWalletRequest = validateWalletRequest;
exports.validateDetailRequest = validateDetailRequest;
