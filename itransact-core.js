"use strict";

// External requirements
const crypto = require('crypto');
const http = require('http');
const https = require('https');

// Internal models.
const CardData = require('./models/CardData');
const TransactionPostPayload = require('./models/TransactionPostPayload');

// Endpoints
const base_endpoint = 'api.itransact.com';
const token_post_endpoint = `/tokens`;
const token_get_endpoint = `${token_post_endpoint}/`; // Add id to the end
const transactions_post_endpoint = `/transactions`; // Add id to the end
const transactions_get_endpoint = `${transactions_post_endpoint}/`; // Add id to the end

// Exports
exports.getJSON = function (options, onResult) {
    const port = options.port === 443 ? https : http;
    const req = port.request(options, function (res) {
        console.log(options.host + ':' + res.statusCode);

        let output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function () {
            const obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function (err) {
        console.error(err);
    });

    req.end();
};

exports.postCardTransaction = function (payload, apiUsername, apiKey) {
    const usernameEncoded = new Buffer(apiUsername).toString('base64');
    const payloadSignature = exports.signPayload(apiKey, payload);

    const options = {
        host: base_endpoint,
        port: 443,
        path: transactions_post_endpoint,
        method: 'POST',
        headers: {
            'Authorization': `${usernameEncoded}:${payloadSignature} `,
            'Content-Type': 'application/json'
        },
        body: payload // TODO - make sure to stringify the json object
    };

    exports.getJSON(options, function (statusCode, object) {
        console.log('Not implemented yet')
    });

    // TODO - send to the server.

};

exports.signPayload = function (apiKey, payload) {
    // Return payload and signature on that object.
    console.log(JSON.stringify(payload));
    const hmac = crypto.createHmac('sha256', apiKey).update(JSON.stringify(payload));
    return hmac.digest('base64');
};


///////
// Move these to formalized mocha tests.
///////
const apiUsername = "test_account";
const apiKey = "EH92cWP4gR7KC8GvNen6";

// Create card data
let cardDataModel = new CardData();
cardDataModel.name = "Greg";
cardDataModel.number = "41111111111111111";
cardDataModel.cvv = "123";
cardDataModel.expMonth = "11";
cardDataModel.expYear = "2020";

// Create payload
let transactionPayload = new TransactionPostPayload();
transactionPayload.amount = "1000";
transactionPayload.card = cardDataModel;

// Submit payload
// console.log(exports.signPayload(apiKey, transactionPayload));
exports.postCardTransaction(transactionPayload, apiUsername, apiKey);