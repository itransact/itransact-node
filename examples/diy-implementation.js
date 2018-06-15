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
const api_username = 'test_user';
const api_key = 'test_key';
const expectedSignature = 'OHlO1iX5WVxiafCGm15fFnPzHJyhCuHSsNmmP3jefnA='; // Note - As the payload or key changes, the expectedSignature also changes
const exampleJsonPayload = {
    'amount': '1000',
    'card': {
        'name': 'Greg',
        'number': '41111111111111111',
        'cvv': '123',
        'exp_month': '11',
        'exp_year': '2020'
    },
    'address': { // Optional - postal code required if loopback / sandbox / demo account
        'postal_code': '84025'
    },
    'metadata': { // Optional
        'email': 'example@itransact.com'
    },
    'send_customer_receipt': 'true' // Optional - default: false
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
    console.log("Did you change the payload, username or api key?\n");
    console.log("Expected Signature: " + expectedSignature + '\n');
    console.log("Actual Signature: " + actualSignature + '\n');
}