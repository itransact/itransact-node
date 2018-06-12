"use strict";

var TransactionPostPayload = function () {
    this.amount = null;
    this.card = null;
    this.address = null;
    this.metadata = null;
    this.send_merchant_receipt = true;
    this.send_customer_receipt = false;
};

module.exports = TransactionPostPayload;