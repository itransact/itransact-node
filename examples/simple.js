'use strict';
const itransact = require('itransact-node');

// Store these somewhere safe.
const apiUsername = 'test_user';
const apiKey = 'test_key';

// You can use your own JSON Model, or use the included models.
const cardData = new itransact.CardDataModel();
cardData.name = 'Greg';
cardData.number = '4111111111111111';
cardData.cvv = '123';
cardData.exp_month = '11';
cardData.exp_year = '2020';

// Address is optional, unless using loopback /sandbox / demo account.
const addressData = new itransact.AddressDataModel();
addressData.postal_code = '84025';

const metaData = new itransact.MetaDataModel();
metaData.email = 'example@itransact.com';

const payload = new itransact.TransactionPostPayloadModel();
payload.amount = '1000';
payload.card = cardData;
payload.address = addressData;
payload.metadata = metaData; // Optional
payload.send_customer_receipt = true; // Optional - default: false - requires email in metadata

// IF you want to just sign the payload
// let payloadSignature = itransact.signPayload(apiKey, payload);

// If you want to post a card transaction
let fooCallback = function (response) {
  // Do something with response here
};

itransact.postCardTransaction(payload, apiUsername, apiKey, fooCallback); // That's it!
