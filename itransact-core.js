"use strict";

// External requirements
const crypto = require('crypto');
const http = require('http');
const https = require('https');

// Internal models.
const CardData = require('./models/card-data');
const TransactionPostPayload = require('./models/transaction-post-payload');

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

exports.postCardTransaction = function (payload, apiUsername, apiKey, callback) {
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
        body: JSON.stringify(payload)
    };

    // TODO - I believe there is an issue with the payload being sent. Perhaps need to trim on the server side?

    exports.getJSON(options, function (statusCode, object) {
        // Bubble up response
        callback(statusCode, object);
    });
};

exports.signPayload = function (apiKey, payload) {
    // Return payload and signature on that object.
    const hmac = crypto.createHmac('sha256', apiKey).update(JSON.stringify(payload));
    return hmac.digest('base64');
};