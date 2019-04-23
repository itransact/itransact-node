'use strict';

// External requirements
const crypto = require('crypto');
const request = require('request');

// Public models for convenience
exports.CardDataModel = require('./models/card-data');
exports.AddressDataModel = require('./models/address-data');
exports.MetaDataModel = require('./models/meta-data');
exports.TransactionPostPayloadModel = require('./models/transaction-post-payload');
exports.getBaseUrl = () => {
  switch (process.env.ITRANSACT_ENVIRONMENT) {
    case 'local': return 'http://localhost:8080';
    case 'stage': return 'https://stage.api.itransact.com';
    default: return 'https://api.itransact.com';
  }
};

// Exports
exports.post_card_transaction = function (payload, apiUsername, apiKey, callback) {
  if (payload instanceof this.TransactionPostPayloadModel) {
    payload = payload.toJson();
  }

  const usernameEncoded = this.encode_username(apiUsername);
  const payloadSignature = exports.sign_payload(apiKey, payload);
  const payloadJsonString = JSON.stringify(payload);

  console.log(`Authorization Header: ${usernameEncoded}:${payloadSignature}`);
  request({
    method: 'POST',
    uri: `${this.getBaseUrl()}/transactions`,
    headers: {
      'Authorization': `${usernameEncoded}:${payloadSignature}`,
      'Content-Type': 'application/json',
      'User-Agent': `Node.js ${process.version} - iTransact SDK ${require('./package.json').version}`
    },
    body: payloadJsonString
  }, function (error, response, body) {
    console.log('itransact-core error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    callback(response);
  });
};

exports.sign_payload = function (apiKey, payload) {
  const hmac = crypto.createHmac('sha256', apiKey).update(JSON.stringify(payload));
  return hmac.digest('base64');
};

exports.encode_username = function (apiUsername) {
  return Buffer.from(apiUsername, 'utf8').toString('base64');
};
