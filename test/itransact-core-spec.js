'use strict';
// MOCHA
const mocha = require('mocha');
const afterEach = mocha.afterEach;
const beforeEach = mocha.beforeEach;
const describe = mocha.describe;
const it = mocha.it;
const xit = mocha.xit;

// CHAI
// const assert = require('chai').assert;
const expect = require('chai').expect;

describe('iTransact Core', function () {
  const iTransactCore = require('../itransact-core');

  const apiUsername = 'test_user';
  const apiKey = 'test_key';
  const expectedPayloadSignature = 'TIiC3HuXTg9FYxWr4HUDRcrICU215y8xp2ToCHP+n/M='; // Changes when api key, username, or payload changes.
  const expectedUsernameEncoded = ''; // FIXME

  let payload = new iTransactCore.TransactionPostPayloadModel();
  let cardData = new iTransactCore.CardDataModel();
  let addressData = new iTransactCore.AddressDataModel();
  let metaData = new iTransactCore.MetaDataModel();

  beforeEach(function () {
    cardData.name = 'Greg';
    cardData.number = '4111111111111111';
    cardData.cvv = '123';
    cardData.exp_month = '11';
    cardData.exp_year = '2020';

    addressData.line1 = 'PO Box 999';
    addressData.city = 'Farmington';
    addressData.state = 'UT';
    addressData.postal_code = '84025';

    metaData.email = 'example@itransact.com';

    payload.amount = '1000';
    payload.card = cardData;
    payload.address = addressData;
    payload.metadata = metaData;
  });

  afterEach(function () {
    payload = new iTransactCore.TransactionPostPayloadModel();
    cardData = new iTransactCore.CardDataModel();
    addressData = new iTransactCore.AddressDataModel();
    metaData = new iTransactCore.MetaDataModel();
  });

  describe('#sign_payload()', function () {
    it('should create hmac using payload and api', function (done) {
      const actualSignature = iTransactCore.sign_payload(apiKey, payload);
      expect(expectedPayloadSignature).to.equal(actualSignature);

      done();
    });

    it('should create a unique hmac for every character changed', function (done) {
      payload.amount = '10001'; // add 1 character to the payload
      const actualSignature = iTransactCore.sign_payload(apiKey, payload);
      expect(expectedPayloadSignature).to.not.equal(actualSignature);

      done();
    });
  });

  describe('#encode_username()', function () {
    it('should return a base64 encoded string for the username', function (done) {
      const actualEncoding = iTransactCore.encode_username(apiUsername);
      expect(expectedUsernameEncoded).to.equal(actualEncoding);

      done();
    });
  });

  // REST tests
  describe('#post_card_transaction()', function () {
    // Positive tests
    xit('should get a 200 when talking to server with valid credentials', function (done) {
      // We need to decide if we have a limited test user for these purposes.
      iTransactCore.post_card_transaction(payload, apiUsername, apiKey, function (response) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    // Negative tests
    it('should get a 401 when talking to server with invalid credentials', function (done) {
      iTransactCore.post_card_transaction(payload, 'abcd', 'efg', function (response) {
        expect(response.statusCode).to.equal(401);
        done();
      });
    });

    xit('should get a 401 when talking to server with bad data', function (done) {
      payload.amount = null;
      iTransactCore.post_card_transaction(payload, apiUsername, apiKey, function (response) {
        expect(response.statusCode).to.equal(400);
        done();
      });
    });
  });
});
