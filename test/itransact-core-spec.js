'use strict';

require('dotenv').config();
const { afterEach, beforeEach, describe, it } = require('mocha');
const { expect } = require('chai');

describe('#iTransactCore Test Suite', function () {
  const iTransactCore = require('../itransact-core');

  const defaultAmount = '1000';
  const environment = 'production';
  const localUrl = 'http://localhost:8080';
  const stageUrl = 'https://stage.api.itransact.com';
  const prodUrl = 'https://api.itransact.com';
  const apiUsername = 'test_user';
  const apiKey = 'test_key';
  const expectedPayloadSignature = '6ns1KeecRlcOOwvLYRWy4B3nh1mL8TToEW71RSRfLZo='; // Changes when api key, username, or payload changes.
  const expectedUsernameEncoded = Buffer.from(apiUsername, 'utf8').toString('base64');

  let payload = new iTransactCore.TransactionPostPayloadModel();
  let cardData = new iTransactCore.CardDataModel();
  let addressData = new iTransactCore.AddressDataModel();
  let metaData = new iTransactCore.MetaDataModel();

  beforeEach(function () {
    process.env.ITRANSACT_ENVIRONMENT = environment;

    cardData.name = 'Greg';
    cardData.number = '4111111111111111';
    cardData.cvv = '123';
    cardData.exp_month = '11';
    cardData.exp_year = '2020';

    addressData.line1 = 'PO Box 999';
    addressData.city = 'Farmington';
    addressData.state = 'UT';
    addressData.postal_code = '84025';

    metaData.email = 'example@payroc.com';

    payload.amount = defaultAmount;
    payload.card = cardData;
    payload.address = addressData;
    payload.metadata = metaData;
  });

  afterEach(function () {
    payload = new iTransactCore.TransactionPostPayloadModel(defaultAmount);
    cardData = new iTransactCore.CardDataModel();
    addressData = new iTransactCore.AddressDataModel();
    metaData = new iTransactCore.MetaDataModel();
  });

  describe('#getBaseUrl()', function () {
    it('should return the base url for staging', function (done) {
      process.env.ITRANSACT_ENVIRONMENT = 'stage';
      const baseUrl = iTransactCore.getBaseUrl();
      expect(baseUrl, 'Expecting environment to be stage for this test to pass').to.equal(stageUrl);
      done();
    });

    it('should return the base url for localhost', function (done) {
      process.env.ITRANSACT_ENVIRONMENT = 'local';
      const baseUrl = iTransactCore.getBaseUrl();
      expect(baseUrl, 'Expecting environment to be stage for this test to pass').to.equal(localUrl);
      done();
    });

    it('should default to production if no environment variable is found', function (done) {
      process.env.ITRANSACT_ENVIRONMENT = undefined;
      const baseUrl = iTransactCore.getBaseUrl();
      expect(baseUrl, 'When an environment is not supplied, it should use production').to.equal(prodUrl);
      done();
    });

    it('should default to production if environment is invalid', function (done) {
      process.env.ITRANSACT_ENVIRONMENT = 'foo';
      const baseUrl = iTransactCore.getBaseUrl();
      expect(baseUrl, 'Bad environment value, it should default to use production').to.equal(prodUrl);
      done();
    });
  });

  describe('#sign_payload()', function () {
    it('should create hmac using payload and api', function (done) {
      const actualSignature = iTransactCore.sign_payload(apiKey, payload);
      expect(expectedPayloadSignature, 'Payload signatures should match, check if payload changed resulting in outdated expected signature.').to.equal(actualSignature);
      done();
    });

    it('should create a unique hmac for every character changed', function (done) {
      payload.amount = '10001'; // add 1 character to the payload
      const actualSignature = iTransactCore.sign_payload(apiKey, payload);
      expect(expectedPayloadSignature, 'Payload signature should change when any characters in payload update.').to.not.equal(actualSignature);
      done();
    });
  });

  describe('#encode_username()', function () {
    it('should return a base64 encoded string for the username', function (done) {
      const actualEncodedUsername = iTransactCore.encode_username(apiUsername);
      expect(actualEncodedUsername, 'Encoded username should be in base64 and match the example.').to.equal(expectedUsernameEncoded);
      done();
    });
  });

  describe('#post_card_transaction()', function () {
    it('should get a 201 when talking to server with valid credentials', function (done) {
      iTransactCore.post_card_transaction(payload, process.env.ITRANSACT_API_USERNAME, process.env.ITRANSACT_API_KEY, function (response) {
        expect(response.statusCode, 'only works if your username and password match your environment.').to.equal(201);
        done();
      });
    });

    it('should get a 401 when talking to server with invalid credentials', function (done) {
      iTransactCore.post_card_transaction(payload, 'abcd', 'efg', function (response) {
        expect(response.statusCode, 'Status code should return a 401').to.equal(401);
        done();
      });
    });

    it('should get a 400 when talking to server with bad data', function (done) {
      payload.amount = null;
      iTransactCore.post_card_transaction(payload, process.env.ITRANSACT_API_USERNAME, process.env.ITRANSACT_API_KEY, function (response) {
        console.log(response);
        expect(response.statusCode, 'only works if your username and password match your environment.').to.equal(400);
        done();
      });
    });
  });

  // TODO - go through and void all the test transactions automatically.
});
