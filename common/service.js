const WARM_REQUEST = 'serverless-plugin-warmup';

module.exports.isWarmRequest = async (event) => {
  return event.source === WARM_REQUEST;
};
