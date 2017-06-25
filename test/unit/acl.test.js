const { app, expect, request } = require('../common');

describe('ACL', () => {
  describe('Category', () => {
    it('should return 200 when listing categories', () => {
      return request
        .get('/api/Categories')
        .expect(200);
    });
    it('should return 401 when creating categories', () => {
      return request
        .post('/api/Categories')
        .send({ name: 'my-category' })
        .expect(401);
    });
    it('should return 401 when updating categories', () => {
      return request
        .patch('/api/Categories/1')
        .send({ name: 'my-new-category' })
        .expect(401);
    });
    it('should return 401 when deleting categories', () => {
      return request
        .delete('/api/Categories/1')
        .expect(401);
    });
  });
  describe('Product', () => {
    it('should return 200 when listing products', () => {
      return request
        .get('/api/Products')
        .expect(200);
    });
    it('should return 401 when creating products', () => {
      return request
        .post('/api/Products')
        .send({ name: 'my-product' })
        .expect(401);
    });
    it('should return 401 when updating products', () => {
      return request
        .patch('/api/Products/1')
        .send({ name: 'my-new-product' })
        .expect(401);
    });
    it('should return 401 when deleting products', () => {
      return request
        .delete('/api/Products/1')
        .expect(401);
    });
    it('should return 200 when buying a product', () => {
      return app.models.Product.create({ name: 'test', price: 100 })
        .then(res =>
          request
            .post(`/api/Products/${res.id}/buy`)
            .send({ quantity: 100 })
            .expect(200))
    });
  });
});
