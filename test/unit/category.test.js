const { app, expect } = require('../common');

const Category = app.models.Category;
const Product = app.models.Product;

describe('Category', () => {
  describe('Hooks', () => {
    it('should not allow deleting a category with products', () => {
      return Promise.resolve()
        .then(() => Category.create({ name: 'my category' }))
        .then(cat =>
          Product.create({
            name: 'category-product',
            price: 299,
            categoryId: cat.id
          })
        )
        .then(res => Category.destroyById(res.categoryId))
        .then(res => expect(res).to.equal(null))
        .catch(err =>
          expect(err).to.equal('Error deleting category with products'));
    });
  });
});
