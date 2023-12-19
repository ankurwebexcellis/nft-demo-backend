function jsonParser(event) {
  //if (typeof event.body === 'string') return {};
  return event.isBase64Encoded
    ? JSON.parse(Buffer.from(event.body, 'base64').toString('UTF-8')) //for lambda function
    : JSON.parse(event.body); //For local
}

exports.jsonParser = jsonParser;
