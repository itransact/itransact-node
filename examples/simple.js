"use strict";
const itransact = require('itransact-core');

// Store these somewhere safe.
const api_username = 'test_username';
const api_key = 'test_apikey';

// You can use your own JSON Model, or use the included models.
const cardData = new itransact.cardDataModel();
cardData.name = 'Greg';
cardData.number = '4111111111111111';
cardData.cvv = '123';
cardData.exp_month = '11';
cardData.exp_year = '2020';

const payload = new itransact.transactionPostPayloadModel();
payload.amount = '1000';
payload.card = cardData;

let fooCallback = function (response) {
    // Do something with response here
};

itransact.postCardTransaction(payload, api_username, api_key, fooCallback); // Thats it!