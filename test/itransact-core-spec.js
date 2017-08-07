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

    const apiUsername = "ac_Tyuw5U88";
    const apiKey = "EH92cWP4gR7KC8GvNen6";
    const usernameEncoded = "123";
    const expectedSignature = 'ClXzIZnwP0LEkd9FMXcfktBEU6wGyQQLE0PZIPsUafE=';

    let payload = new iTransactCore.transactionPostPayloadModel();
    let cardData = new iTransactCore.cardDataModel();

    beforeEach(function () {
        cardData.name = 'Greg';
        cardData.number = '41111111111111111';
        cardData.cvv = '123';
        cardData.expMonth = '11';
        cardData.expYear = '2020';

        payload.amount = '1000';
        payload.card = cardData;
    });

    afterEach(function () {
        payload = new iTransactCore.transactionPostPayloadModel();
        cardData = new iTransactCore.cardDataModel();
    });

    describe('#getJSON()', function () {
        it('should return a valid statusCode and a json object', function (done) {
            // TODO - this section should just snag some object as a get request.
            const options = {
                host: 'api.itransact.com',
                port: 443,
                path: '/transactions',
                method: 'POST',
                headers: {
                    'Authorization': `${usernameEncoded}:${iTransactCore.signPayload(apiKey,payload)} `,
                    'Content-Type': 'application/json'
                }
            };

            // iTransactCore.getJSON(options, function (statusCode, object) {
                // TODO - get the proper return type.
                //expect(statusCode).to.equal(401);

                // done();
            // });
            done();
        });
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
        it('should get a xyz when talking to server with valid credentials', function (done) {
            iTransactCore.postCardTransaction(payload, apiUsername, apiKey, function (response) {
                // TODO - push the right stuff
                expect(response.statusCode).to.equal(200);

                done();
            });

        });

        it('should get a 401 when talking to server with invalid credentials', function (done) {
            iTransactCore.postCardTransaction(payload, 'abcd', 'efg', function (response) {
                expect(response.statusCode).to.equal(401);
                done();
            });

        });

        // it('should get a 400 when talking to server with bad data', function (done) {
        //     iTransactCore.postCardTransaction(payload, apiUsername, apiKey, function (response) {
        //         expect(serverResponse.statusCode).to.equal(400);
        //         done();
        //     });
        //
        // });
    });

});