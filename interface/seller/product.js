const Router = require('koa-router');
const router = new Router();
const product = require('../../operationalDatabase/product.js');
router.post('/seller/product/save', product.changeProductInfo) //商品信息修改和添加

 router.get('/seller/product/list/:productId', product.searchProductById)//通过商品ID查询商品
 router.post('/seller/product/offSale/:productId', product.productOffSale) //商品下架
 router.post('/seller/product/onSale/:productId', product.productOnSale) //商品上架
 router.get('/seller/product/list', product.productPagingQuery) //商品分页查询
 router.post('/seller/carouselProduct/save', product.addCarouselProduct)//轮播商品添加
 router.post('/seller/carouselProduct/delete', product.deleteCarouselProduct) //轮播商品删除

module.exports = router;