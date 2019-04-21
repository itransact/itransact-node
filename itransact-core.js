'use strict';

// External requirements
const crypto = require('crypto');
const request = require('request');

// Public models for convenience
exports.CardDataModel = require('./models/card-data');
exports.AddressDataModel = require('./models/address-data');
exports.MetaDataModel = require('./models/meta-data');
exports.TransactionPostPayloadModel = require('./models/transaction-post-payload');

// Exports
exports.post_card_transaction = function (payload, apiUsername, apiKey, callback) {
  const usernameEncoded = this.encode_username(apiUsername);
  const payloadSignature = exports.sign_payload(apiKey, payload);
  const payloadJsonString = JSON.stringify(payload);

  request({
    method: 'POST',
    uri: `https://api.itransact.com/transactions`,
    headers: {
      'Authorization': `${usernameEncoded}:${payloadSignature} `,
      'Content-Type': 'application/json',
      'User-Agent': `Node.js ${process.version}`
    },
    body: payloadJsonString
  }, function (error, response, body) {
    if (error) console.log(`itransact-core Errors: ${error}`);
    callback(response);
  });
};

exports.sign_payload = function (apiKey, payload) {
  // Return payload and signature on that object.
  const hmac = crypto.createHmac('sha256', apiKey).update(JSON.stringify(payload));
  return hmac.digest('base64');
};

exports.encode_username = function (apiUsername) {
  return Buffer.from(apiUsername, 'base64');
};
