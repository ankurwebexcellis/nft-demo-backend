const presentation = require('../common/presentation');
const { validateWalletRequest } = require('../validations/nftApis');
const sdk = require('api')('@opensea/v2.0#8e0h2clqbegixe');

const byWallet = async (event) => {
  try {
    const jsonBody = event.queryStringParameters ? event.queryStringParameters : {};
    console.log('jsonBody: ', jsonBody);

    if (!jsonBody.limit) jsonBody.limit = 50;
    const { error } = validateWalletRequest(jsonBody);
    if (error) return presentation.badRequest(error.details[0].message);

    sdk.server('https://api.opensea.io');
    sdk.auth(process.env.OPENSEA_API_KEY);

    const requestParams = { chain: process.env.CHAIN, address: jsonBody.address };

    if (jsonBody.next) requestParams.next = jsonBody.next;

    const result = await sdk.list_nfts_by_account(requestParams);
    return presentation.ok(result);
  } catch (err) {
    console.log('Error: ', err);
    return presentation.error(err.message);
  }
};
exports.byWallet = byWallet;
