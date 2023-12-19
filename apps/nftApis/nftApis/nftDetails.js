const presentation = require("../common/presentation");
const { validateDetailRequest } = require("../validations/nftApis");
const sdk = require("api")("@opensea/v2.0#8e0h2clqbegixe");

// GET /nftApis/nftDetails

// function to get nft details
const nftDetails = async (event) => {
  try {
    // get json body
    const jsonBody = event.queryStringParameters ? event.queryStringParameters : {};

    // validate json body
    const { error } = validateDetailRequest(jsonBody);
    if (error) return presentation.badRequest(error.details[0].message);

    // set sdk
    sdk.server("https://api.opensea.io");
    sdk.auth(process.env.OPENSEA_API_KEY);

    // call sdk to get nft details
    const requestParams = { chain: process.env.CHAIN, address: jsonBody.address, identifier: jsonBody.identifier };

    // call sdk to get nft details
    const result = await sdk.get_nft(requestParams);


  try {
    const prices = await sdk.get_best_listing_on_nft_v2({
      collection_slug: result.data.nft.collection,
      identifier: result.data.nft.identifier,
    });
    // return response
    result.prices = prices;
  } catch (err) {
    // log error
    console.log("Error: ", err);
  }
    return presentation.ok(result);
  } catch (err) {
    // log error
    console.log("Error: ", err);

    // return error response
    return presentation.error(err.message);
  }
};
exports.nftDetails = nftDetails;
