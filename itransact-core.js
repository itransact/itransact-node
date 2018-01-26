"use strict";

// External requirements
const crypto = require('crypto');
const request = require('request');

// Endpoints
const base_endpoint = 'api.itransact.com';
const token_post_endpoint = `/tokens`;
const token_get_endpoint = `${token_post_endpoint}/`; // Add id to the end
const transactions_post_endpoint = `/transactions`; // Add id to the end
const transactions_get_endpoint = `${transactions_post_endpoint}/`; // Add id to the end

// Public models for convenience
exports.cardDataModel = require('./models/card-data');
exports.addressDataModel = require('./models/address-data');
exports.transactionPostPayloadModel = require('./models/transaction-post-payload');

// Exports
exports.postCardTransaction = function (payload, apiUsername, apiKey, callback) {
    const usernameEncoded = new Buffer(apiUsername).toString('base64');
    const payloadSignature = exports.signPayload(apiKey, payload);
    const payloadJsonString = JSON.stringify(payload);


    request({
        method: 'POST',
        uri: 'https://' + base_endpoint + transactions_post_endpoint,
        headers: {
            'Authorization': `${usernameEncoded}:${payloadSignature} `,
            'Content-Type': 'application/json',
            'User-Agent': `Node.js ${process.version}`
        },
        body: payloadJsonString
    }, function (error, response, body) {
        callback(response);
    });
};

exports.signPayload = function (apiKey, payload) {
    // Return payload and signature on that object.
    const hmac = crypto.createHmac('sha256', apiKey).update(JSON.stringify(payload));
    return hmac.digest('base64');
};