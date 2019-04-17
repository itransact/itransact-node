'use strict';

// External requirements
const crypto = require('crypto');
const request = require('request');

// Endpoints
const baseEndpoint = 'api.itransact.com';
// const tokenPostEndpoint = `/tokens`;
// const tokenGetEndpoint = `${tokenPostEndpoint}/`; // Add id to the end
const transactionsPostEndpoint = `/transactions`; // Add id to the end
// const transactionsGetEndpoint = `${transactionsPostEndpoint}/`; // Add id to the end

// Public models for convenience
exports.CardDataModel = require('./models/card-data');
exports.AddressDataModel = require('./models/address-data');
exports.MetaDataModel = require('./models/meta-data');
exports.TransactionPostPayloadModel = require('./models/transaction-post-payload');

// Exports
exports.postCardTransaction = function (payload, apiUsername, apiKey, callback) {
  const usernameEncoded = this.encodeUsername(apiUsername);
  const payloadSignature = exports.signPayload(apiKey, payload);
  const payloadJsonString = JSON.stringify(payload);

  request({
    method: 'POST',
    uri: 'https://' + baseEndpoint + transactionsPostEndpoint,
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

exports.signPayload = function (apiKey, payload) {
  // Return payload and signature on that object.
  const hmac = crypto.createHmac('sha256', apiKey).update(JSON.stringify(payload));
  return hmac.digest('base64');
};

exports.encodeUsername = function (apiUsername) {
  return Buffer.from(apiUsername, 'base64');
};
