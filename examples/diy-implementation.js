"use strict";
/*
* Use this example, if you would prefer to write your own implementation without needing the npm module.
*
* This allows for the greatest degree of flexibility, but also is trickier to make sure your payload signature, and base encoded username are accurate.
*
* Below is an example showing how to generate the signature for your payload.
* */

// Node Core Library
const crypto = require('crypto');

// Store this somewhere safe.
const api_key = 'test_apikey';
const api_username = 'test_username';
const expectedSignature = 'CtWScJ95V4lRZ181QN1iriN4EGyX1YMU2pkvDlh7dKE='; // Note - As the payload or key changes, the expectedSignature also changes
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