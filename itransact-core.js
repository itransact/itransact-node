"use strict";

// External requirements
const crypto = require('crypto');
const http = require('http');
const https = require('https');

// Endpoints
const base_endpoint = 'api.itransact.com';
const token_post_endpoint = `/tokens`;
const token_get_endpoint = `${token_post_endpoint}/`; // Add id to the end
const transactions_post_endpoint = `/transactions`; // Add id to the end
const transactions_get_endpoint = `${transactions_post_endpoint}/`; // Add id to the end

// Public models for convenience
exports.cardDataModel = require('./models/card-data');
exports.transactionPostPayloadModel = require('./models/transaction-post-payload');

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
    const payloadJsonString = JSON.stringify(payload);

    const options = {
        host: base_endpoint,
        port: 443,
        path: transactions_post_endpoint,
        method: 'POST',
        headers: {
            'Authorization': `${usernameEncoded}:${payloadSignature} `,
            'Content-Type': 'application/json',
            'Content-Length': payloadJsonString.length
        }
    };

    http.request(options, callback).write(payloadJsonString);
};

exports.signPayload = function (apiKey, payload) {
    // Return payload and signature on that object.
    const hmac = crypto.createHmac('sha256', apiKey).update(JSON.stringify(payload));
    return hmac.digest('base64');
};