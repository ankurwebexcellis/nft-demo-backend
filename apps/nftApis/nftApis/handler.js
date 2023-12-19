require('dotenv').config();

const presentation = require('../common/presentation');
const service = require('../common/service');
const { byContract } = require('./byContract');
const { byWallet } = require('./byWallet');
const { nftDetails } = require('./nftDetails');

module.exports.nftApis = async (event) => {
  try {
    if (await service.isWarmRequest(event)) return;

    let value = null;
    const route = event.httpMethod + '|' + event.resource;
    switch (route) {
      case 'GET|/nftApis/byContract':
        value = await byContract(event);
        break;
      case 'GET|/nftApis/byWallet':
        value = await byWallet(event);
        break;
      case 'GET|/nftApis/nftDetails':
        value = await nftDetails(event);
        break;
      default:
        throw new Error('Invalid route');
    }
    return value;
  } catch (err) {
    return presentation.error(err);
  }
};
