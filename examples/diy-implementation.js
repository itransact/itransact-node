"use strict";

// Node Core Library
const crypto = require('crypto');

// Store this somewhere safe.
const api_key = 'test_apikey';

// Note - As the payload or key changes, the expectedSignature also changes
const expectedSignature = 'CtWScJ95V4lRZ181QN1iriN4EGyX1YMU2pkvDlh7dKE=';
const exampleJsonPayload = {
    'amount': '1000',
    'card': {
        'name': 'Greg',
        'number': '41111111111111111',
        'cvv': '123',
        'exp_month': '11',
        'exp_year': '2020'
    }
};

// NOTE - stringify will strip out any spaces - so make sure to stringify your json object when sending to the server or they may not match
const hmac = crypto
                .createHmac('sha256', api_key)
                .update(JSON.stringify(exampleJsonPayload));

const actualSignature = hmac.digest('base64');

if (expectedSignature === actualSignature) {
    console.log(`
        Success!
        Signature: ${actualSignature}
    `);
} else {
    console.log("Failure!\n");
    console.log("Expected Signature: " + expectedSignature + '\n');
    console.log("Actual Signature: " + actualSignature + '\n');
}