'use strict';

module.exports = function(Product) {

  Product.observe('before save', function(ctx, next) {
    if (ctx.instance && ctx.instance.categoryId) {
      return Product.app.models.Category
        .count({ id: ctx.instance.categoryId })
        .then(res => {
          if (res < 1) {
            return Promise.reject('Error adding product to non-existing category');
          }
        });
    }

    return next();
  });
  /**
   * Return true if input is larger than zero
   * @param {number} quantity Number to validate
   */
  const validQuantity = quantity => Boolean(quantity > 0);

  /**
   * Buy this product
   * @param {number} quantity Number of products to buy
   * @param {Function(Error, object)} callback
   */

  Product.prototype.buy = function(quantity, callback) {
    if (!validQuantity(quantity)) {
      return callback(`Invalid quantity ${quantity}`);
    }
    const result = {
      status: `You bought ${quantity} product(s)`
    };

    callback(null, result);
  };

  // Validates minimal length of the name
  Product.validatesLengthOf('name', {
    min: 3,
    message: {
      min: 'Name should be at least 3 characters'
    }
  });

  // Validates uniqueness of the name
  Product.validatesUniquenessOf('name');

  //Custom validation that the prices is greater than or equal to 0
  const positiveInteger = /^[0-9]*$/;

  const validatePositiveInteger = function(err) {
    if (!positiveInteger.test(this.price)) {
      err();
    }
  };

  Product.validate('price', validatePositiveInteger, {
    message: 'Price should be a positive integer'
  });

  // Example of using asynchronous validation
  function validateMinimalPrice(err, done) {
    const price = this.price;

    process.nextTick(() => {
      const minimalPriceFromDB = 99;

      if(price < minimalPriceFromDB) {
        err();
      }
      done();
    })
  };

  Product.validateAsync('price', validateMinimalPrice, {
    message: 'Price should be higher than the minimal price in the DB'
  })
};
