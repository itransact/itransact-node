'use strict';
class TransactionPostPayload {
  constructor (amount, card = null, address = null, metadata = null, sendMerchantReceipt = true, sendCustomerReceipt = false) {
    this._amount = amount || '0'; // Required
    this.card = card;
    this.address = address;
    this.metadata = metadata;
    this._send_merchant_receipt = sendMerchantReceipt;
    this._send_customer_receipt = sendCustomerReceipt;
  }

  get amount () {
    return this._amount;
  }

  set amount (newAmount) {
    let isAmountValid = TransactionPostPayload.isAmountValid(newAmount);
    this._amount = (isAmountValid) ? newAmount : '0';
  }

  static isAmountValid (amount) {
    let isValid = false;

    if (amount === undefined) {
      console.log(`The amount cannot be undefined`);
    } else if (typeof amount === 'string') {
      if (amount.includes('.') && amount.includes('$')) {
        console.log(`The amount entered is not valid. Please make sure its in US cents format ex: 100 = $1.00 USD`);
      } else {
        isValid = true;
      }
    }

    return isValid;
  }

  // eslint-disable-next-line camelcase
  get send_merchant_receipt () {
    return this._send_merchant_receipt;
  }

  // eslint-disable-next-line camelcase
  set send_merchant_receipt (value) {
    let validatedBooleanValue = true;
    if (TransactionPostPayload.checkForBoolean(value)) {
      validatedBooleanValue = value;
    }
    this._send_merchant_receipt = validatedBooleanValue;
  }

  // eslint-disable-next-line camelcase
  get send_customer_receipt () {
    return this._send_customer_receipt;
  }

  // eslint-disable-next-line camelcase
  set send_customer_receipt (value) {
    let validatedBooleanValue = false;

    if (TransactionPostPayload.checkForBoolean(value)) {
      validatedBooleanValue = value;
    }

    this._send_customer_receipt = validatedBooleanValue;
  }

  static checkForBoolean (value) {
    return typeof value === 'boolean';
  }

  toJson () {
    return {
      'amount': this._amount,
      'card': this.card.toJson(),
      'address': this.address.toJson(),
      'metadata': this.metadata.toJson(),
      'send_merchant_receipt': this._send_merchant_receipt,
      'send_customer_receipt': this._send_customer_receipt
    };
  }
}

module.exports = TransactionPostPayload;
