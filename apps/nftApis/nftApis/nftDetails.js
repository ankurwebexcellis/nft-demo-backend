const presentation = require('../common/presentation');
const { validateDetailRequest } = require('../validations/nftApis');
const sdk = require('api')('@opensea/v2.0#8e0h2clqbegixe');

const nftDetails = async (event) => {
  try {
    const jsonBody = event.queryStringParameters ? event.queryStringParameters : {};
    console.log('jsonBody: ', jsonBody);
    const { error } = validateDetailRequest(jsonBody);
    if (error) return presentation.badRequest(error.details[0].message);

    sdk.server('https://api.opensea.io');
    sdk.auth(process.env.OPENSEA_API_KEY);

    const requestParams = { chain: process.env.CHAIN, address: jsonBody.address, identifier: jsonBody.identifier };
    const result = await sdk.get_nft(requestParams);
    return presentation.ok(result);
  } catch (err) {
    console.log('Error: ', err);
    return presentation.error(err.message);
  }
};
exports.nftDetails = nftDetails;
