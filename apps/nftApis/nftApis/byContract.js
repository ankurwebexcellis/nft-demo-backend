const presentation = require('../common/presentation');
const { validateContractRequest } = require('../validations/nftApis');
const sdk = require('api')('@opensea/v2.0#8e0h2clqbegixe');


// GET /nftApis/byContract
// function to get nft by contract
const byContract = async (event) => {
  try {

    // get json body
    const jsonBody = event.queryStringParameters ? event.queryStringParameters : {};

    // validate json body
    if (!jsonBody.limit) jsonBody.limit = 16;
    const { error } = validateContractRequest(jsonBody);
    if (error) return presentation.badRequest(error.details[0].message);

    // set sdk
    sdk.server('https://api.opensea.io');
    sdk.auth(process.env.OPENSEA_API_KEY);

    // set request params
    const requestParams = { chain: process.env.CHAIN, address: jsonBody.address, limit: jsonBody.limit };

    // set optional params if exist
    if (jsonBody.next) requestParams.next = jsonBody.next;

    // call sdk to get nft by contract
    const result = await sdk.list_nfts_by_contract(requestParams);

    // return response
    return presentation.ok(result);
  } catch (err) {

    // log error
    console.log('Error: ', err);

    // return error response
    return presentation.error(err.message);
  }
};
exports.byContract = byContract;
