"use strict";
// MOCHA
const mocha = require("mocha");
const afterEach = mocha.afterEach;
const beforeEach = mocha.beforeEach;
const describe = mocha.describe;
const it = mocha.it;

// CHAI
const assert = require('chai').assert;
const expect = require('chai').expect;

describe('iTransact Core', function () {
    const iTransactCore = require('../itransact-core');

    const apiUsername = "test_user";
    const apiKey = "test_key";
    const expectedSignature = 'dmMH2rT4LUP25xeMsW1i+zLX4sXgtoUFoXpZk2zIuyg='; // Changes when api key, username, or payload changes.

    let payload = new iTransactCore.transactionPostPayloadModel();
    let cardData = new iTransactCore.cardDataModel();

    beforeEach(function () {
        cardData.name = 'Greg';
        cardData.number = '4111111111111111';
        cardData.cvv = '123';
        cardData.exp_month = '11';
        cardData.exp_year = '2020';

        payload.amount = '1000';
        payload.card = cardData;
    });

    afterEach(function () {
        payload = new iTransactCore.transactionPostPayloadModel();
        cardData = new iTransactCore.cardDataModel();
    });

    describe('#signPayload()', function () {
        it('should create hmac using payload and api', function (done) {
            const actualSignature = iTransactCore.signPayload(apiKey,payload);
            expect(expectedSignature).to.equal(actualSignature);

            done()
        });

        it('should create a unique hmac for every character changed', function (done) {
            payload.amount = '10001'; // add 1 character to the payload
            const actualSignature = iTransactCore.signPayload(apiKey,payload);
            expect(expectedSignature).to.not.equal(actualSignature);

            done()
        });
    });

    // Rest tests
    describe('#postCardTransaction()', function () {
        // it('should get a xyz when talking to server with valid credentials', function (done) {
        //     iTransactCore.postCardTransaction(payload, apiUsername, apiKey, function (response) {
        //         expect(response.statusCode).to.equal(200);
        //         done();
        //     });
        //
        // });
        //
        // it('should get a 401 when talking to server with invalid credentials', function (done) {
        //     iTransactCore.postCardTransaction(payload, 'abcd', 'efg', function (response) {
        //         expect(response.statusCode).to.equal(401);
        //         done();
        //     });
        //
        // });
        //
        // it('should get a 402 when talking to server with past due account credentials', function (done) {
        //     iTransactCore.postCardTransaction(payload, apiUsername, apiKey, function (response) {
        //         expect(response.statusCode).to.equal(402);
        //         done();
        //     });
        //
        // });
        //
        // it('should get a 400 when talking to server with bad data', function (done) {
        //     iTransactCore.postCardTransaction(payload, apiUsername, apiKey, function (response) {
        //         expect(serverResponse.statusCode).to.equal(400);
        //         done();
        //     });
        //
        // });
    });

});