'use strict';

class CardData {
  constructor (name = null, number = null, cvv = null, expMonth = null, expYear = null) {
    this.name = name;
    this.number = number;
    this.cvv = cvv;
    this.exp_month = expMonth;
    this.exp_year = expYear;
  }

  toJson () {
    this.expirationValidation();
    return {
      'name': this.name,
      'number': this.number,
      'cvv': this.cvv,
      'exp_month': this.exp_month,
      'exp_year': this.exp_year
    };
  }
  // TODO: Add expiration date validation

  expirationValidation() {
    let today = new Date();
    if (this.exp_month === undefined || this.exp_year === undefined) {
      throw new TypeError('Card Expiration Date is invalid');
    }
    let expYear = parseInt(this.exp_year);
    let expMonth = parseInt(this.exp_month);
    let thisYear = (today.getFullYear());
    let thisMonth = (today.getMonth() + 1);
    if (isNaN(expMonth) || isNaN(expYear)) {
      throw new TypeError('Card Expiration Date is invalid');
    }
    if (expMonth < 0 || expMonth > 12) {
      throw new TypeError('Card Expiration Date is invalid');
    }
    if (expYear > thisYear) {
      return true;
    }
    if (expYear < thisYear) {
      throw new TypeError('Card Expiration Date is invalid');
    }

    if (expYear === thisYear && expMonth >= thisMonth) {
      return true;
    } else {
      throw new TypeError('Card Expiration Date is invalid');
    }
  }
}

module.exports = CardData;
