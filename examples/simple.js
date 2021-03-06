'use strict';
const itransact = require('itransact-node');

// Store these somewhere safe - like in environment variables - committing plain text user names and passwords to vcs is discouraged.
const _api_username = 'test_user';
const _api_key = 'test_key';

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
// let payloadSignature = itransact.sign_payload(apiKey, payload);

// If you want to post a card transaction
let fooCallback = function (response) {
  // Do something with response here
};

itransact.post_card_transaction(payload, _api_username, _api_key, fooCallback); // That's it!
