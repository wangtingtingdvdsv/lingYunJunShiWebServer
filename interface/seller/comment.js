<<<<<<< HEAD
const Router = require('koa-router');
const router = new Router();
const comment = require('../../operationalDatabase/dataBase.js');

router.get('/seller/comment', comment.searchComment)


module.exports = router;
=======
const Router = require('koa-router');
const router = new Router();
const comment = require('../../operationalDatabase/dataBase.js');

router.get('/seller/comment', comment.searchComment)


module.exports = router;
>>>>>>> ad9b35940496e9bcf2c81d26b29068aab185bcb4
