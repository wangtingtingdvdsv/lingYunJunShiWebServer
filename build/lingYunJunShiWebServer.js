/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mysql");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  host: 'wangtingting.top',
  user: 'root',
  password: '',
  database: 'lingYunJunShi'
  // module.exports = {
  //     host: 'localhost',
  //     user:'root',

  //     password:'',
  //     database: 'order_applet'
  // }

};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(5);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

var app = __webpack_require__(6);
var debug = __webpack_require__(20)('demo:server');
var http = __webpack_require__(21);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3005');
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, function () {
  console.log('3005 端口启动成功');
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Koa = __webpack_require__(7);
var koaBody = __webpack_require__(8);
var cors = __webpack_require__(9);
var category = __webpack_require__(10);
var product = __webpack_require__(12);
var order = __webpack_require__(14);
var admin = __webpack_require__(16);
var session = __webpack_require__(18);
var convert = __webpack_require__(19);

var app = new Koa();
app.keys = ['this is my secret and fuck you all'];

app.use(cors({
  credentials: true,
  maxAge: '1728000'
}));
app.use(koaBody());
app.use(convert(session({
  key: 'loginAuthentication', /** cookie的名称，可以不管 */
  maxAge: 7200000 /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  // overwrite: true, /** (boolean) can overwrite or not (default true) */
  // httpOnly: true, /** (boolean) httpOnly or not (default true) */
  // signed: true, /** (boolean) signed or not (default true) */
}, app)));

app.use(admin.routes()).use(admin.allowedMethods());
app.use(category.routes()).use(category.allowedMethods());
app.use(product.routes()).use(product.allowedMethods());
app.use(order.routes()).use(order.allowedMethods());

app.listen(9008, function () {
  console.log('启动成功');
});

module.exports = app;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa2-cors");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Router = __webpack_require__(0);
var router = new Router();
var category = __webpack_require__(11);
router.post('/seller/category/save', category.changeCategoryInfo); //修改和新增类目信息
router.get('/seller/category/:id', category.searchCategoryById); //通过类目ID查询类目
router.get('/seller/category', category.getAllCategory); //获取所有类目信息

module.exports = router;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mysql = __webpack_require__(1);
var config = __webpack_require__(2);
var connection = mysql.createConnection(config);
connection.connect();

function getAllCategory() {
    var sql = 'SELECT * from category';
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getCategoryById(id) {
    var sql = 'SELECT * from category WHERE category_id=' + id;
    var data = {};
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

//通过id查询类目
var searchCategoryById = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var id, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (!isNaN(ctx.params.id)) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt('return');

                    case 2:
                        id = ctx.params.id;
                        _context.next = 5;
                        return getCategoryById(id);

                    case 5:
                        data = _context.sent;


                        ctx.status = 200;
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: {
                                data: data
                            }
                        };

                    case 8:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function searchCategoryById(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

//修改类目信息
var changeCategoryInfo = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
        var data, sql, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = ctx.request.body;

                        if (!data.categoryId) {
                            _context2.next = 8;
                            break;
                        }

                        //修改类目信息
                        sql = 'UPDATE category SET category_name=\'' + data.categoryName + '\'\n        WHERE  category_id =' + data.categoryId;
                        _context2.next = 5;
                        return connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[SELECT ERROR] - ', err.message);
                                return;
                            }
                            return result;
                        });

                    case 5:
                        result = _context2.sent;
                        _context2.next = 12;
                        break;

                    case 8:
                        //新增类目
                        sql = 'INSERT INTO category (category_name) values (\'' + data.categoryName + '\')';
                        _context2.next = 11;
                        return connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[SELECT ERROR] - ', err.message);
                                return;
                            }
                            return result;
                        });

                    case 11:
                        result = _context2.sent;

                    case 12:
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: null
                        };

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function changeCategoryInfo(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

module.exports = {
    searchCategoryById: searchCategoryById,
    changeCategoryInfo: changeCategoryInfo,
    getAllCategory: getAllCategory
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Router = __webpack_require__(0);
var router = new Router();
var product = __webpack_require__(13);
router.post('/seller/product/save', product.changeProductInfo); //商品信息修改和添加

router.get('/seller/product/list/:productId', product.searchProductById); //通过商品ID查询商品
router.post('/seller/product/offSale/:productId', product.productOffSale); //商品下架
router.post('/seller/product/onSale/:productId', product.productOnSale); //商品上架
router.get('/seller/product/list', product.productPagingQuery); //商品分页查询
router.post('/seller/carouselProduct/save', product.addCarouselProduct); //轮播商品添加
router.post('/seller/carouselProduct/delete', product.deleteCarouselProduct); //轮播商品删除

module.exports = router;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mysql = __webpack_require__(1);
var config = __webpack_require__(2);
var connection = mysql.createConnection(config);
connection.connect();

var addCarouselProduct = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = ctx.request.body;

                        if (data.productName || data.productId) {
                            _context.next = 3;
                            break;
                        }

                        return _context.abrupt('return');

                    case 3:
                        _context.next = 5;
                        return getProductById(data.productId);

                    case 5:
                        if (_context.sent) {
                            _context.next = 7;
                            break;
                        }

                        return _context.abrupt('return', "商品不存在");

                    case 7:

                        sql = 'update product set product_carousel = 1 where product_id = ' + data.productId;
                        connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[SELECT ERROR] - ', err.message);
                                return;
                            }
                        });
                        ctx.status = 200;
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: null
                        };

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function addCarouselProduct(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var deleteCarouselProduct = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        data = ctx.request.body;

                        if (data.productName || data.productId) {
                            _context2.next = 3;
                            break;
                        }

                        return _context2.abrupt('return');

                    case 3:
                        _context2.next = 5;
                        return getProductById(data.productId);

                    case 5:
                        if (_context2.sent) {
                            _context2.next = 7;
                            break;
                        }

                        return _context2.abrupt('return', "商品不存在");

                    case 7:

                        sql = 'update product set product_carousel = 0 where product_id = ' + data.productId;
                        connection.query(sql, function (err, result) {
                            if (err) {
                                console.log('[SELECT ERROR] - ', err.message);
                                return;
                            }
                        });
                        ctx.status = 200;
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: null
                        };

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function deleteCarouselProduct(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

function getProductById(id) {
    var sql = 'SELECT * from product WHERE product_id=' + id;
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

var changeProductInfo = function changeProductInfo(ctx, next) {
    var data = ctx.request.body;
    console.log(ctx.request.body);
    var sql;

    if (data.productId) {
        //修改类目信息
        console.log('###########');
        sql = 'UPDATE  SET product_name=\'' + data.productName + '\'  , product_price=\'' + data.productPrice + '\', product_description=\'' + data.productDescription + '\', seller_phone=\'' + data.sellerPhone + '\', product_icon=\'' + data.productIcon + '\', category_type=\'' + data.categoryType + '\'\n        WHERE product_id=\'' + data.productId + '\'';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
        });
    } else {
        //新增类目
        sql = 'INSERT INTO product(product_name, product_price, product_description, seller_phone, product_icon, category_type) values (\'' + data.productName + '\', \'' + data.productPrice + '\', \'' + data.productDescription + '\', \'' + data.sellerPhone + '\', \'' + data.productIcon + '\', \'' + data.categoryType + '\')';
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
        });
    }
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    };
};

//通过商品ID查询商品
var searchProductById = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(ctx, next) {
        var id, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log(ctx.params);

                        if (!isNaN(ctx.params.productId)) {
                            _context3.next = 3;
                            break;
                        }

                        return _context3.abrupt('return');

                    case 3:
                        id = ctx.params.productId;
                        _context3.next = 6;
                        return getProductById(id);

                    case 6:
                        data = _context3.sent;


                        ctx.status = 200;
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: {
                                data: data
                            }
                        };

                    case 9:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function searchProductById(_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

var productOffSale = function productOffSale(ctx, next) {
    //商品下架
    var data = ctx.request.body;
    var id = ctx.params.productId;
    if (!id) {
        return;
    }
    var sql = 'UPDATE  SET product_status=\'' + data.productStatus + '\'\n    WHERE product_id=\'' + id + '\'';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: {
            data: data
        }
    };
};

var productOnSale = function productOnSale(ctx, next) {
    //商品上架
    var data = ctx.request.body;
    var id = ctx.params.productId;
    if (!id) {
        return;
    }
    var sql = 'UPDATE product SET product_status=\'' + data.productStatus + '\'\n    WHERE product_id=\'' + id + '\'';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: {
            data: data
        }
    };
};

function getProductByPageAndSize(page, size) {

    var start = (page - 1) * size;
    var sql = 'SELECT * from product LIMIT ' + start + ', ' + size; //从start+1条开始的size条（下标从0开始的）
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

var productPagingQuery = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(ctx, next) {
        var _ctx$request$query, page, size, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        //分页查询
                        if (!ctx.session.user) {
                            console.log('你需要登录');
                            ctx.response.redirect('/login');
                        } else {
                            console.log("登录成功：", ctx.session.user);
                        }
                        console.log("#####@@@@%%%%%%%%%%%%%", ctx.session);
                        _ctx$request$query = ctx.request.query, page = _ctx$request$query.page, size = _ctx$request$query.size; //通过query获取get方式中data里面的数据，通过body获取post方式中data里面的数据

                        _context4.next = 5;
                        return getProductByPageAndSize(page, size);

                    case 5:
                        data = _context4.sent;


                        ctx.status = 200;
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: {
                                data: data
                            }
                        };

                    case 8:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function productPagingQuery(_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

module.exports = {
    deleteCarouselProduct: deleteCarouselProduct,
    addCarouselProduct: addCarouselProduct,
    changeProductInfo: changeProductInfo,
    searchProductById: searchProductById,
    productOffSale: productOffSale,
    productOnSale: productOnSale,
    productPagingQuery: productPagingQuery
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Router = __webpack_require__(0);
var router = new Router();
var order = __webpack_require__(15);

router.get('/seller/order/detail/:orderId', order.searchOrderById); //通过订单ID查询某订单
router.post('/seller/order/cancel/:orderId', order.cancelOrder); //取消订单
router.post('/seller/order/finish/:orderId', order.finishOrder); //接单
router.get('/seller/order/list', order.orderPageQuery); //订单概要分页查询
router.post('/seller/order/send/:orderId', order.sendProduct); //发货

module.exports = router;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mysql = __webpack_require__(1);
var config = __webpack_require__(2);
var connection = mysql.createConnection(config);
connection.connect();

var sendProduct = function sendProduct(ctx, next) {
    var orderId = ctx.params.orderId;
    if (!orderId) {
        return;
    }
    sql = 'update ordersummary set send_status= 1 where  order_id= ' + orderId;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    };
};

var cancelOrder = function cancelOrder(ctx, next) {
    //取消订单
    var orderId = ctx.params.orderId;
    sql = 'UPDATE ordersummary SET order_status=2\n    WHERE order_id=' + orderId;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    };
};

var finishOrder = function finishOrder(ctx, next) {
    //接单
    var orderId = ctx.params.orderId;
    sql = 'UPDATE ordersummary SET order_status=1\n    WHERE order_id=' + orderId;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    };
};

var orderPageQuery = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var _ctx$request$query, page, size, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        //订单概要分页查询
                        _ctx$request$query = ctx.request.query, page = _ctx$request$query.page, size = _ctx$request$query.size;
                        _context.next = 3;
                        return getProductByPageAndSize(page, size);

                    case 3:
                        data = _context.sent;


                        ctx.status = 200;
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: {
                                data: data
                            }
                        };

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function orderPageQuery(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var searchOrderById = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
        var orderId, order, orderDetail;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        //通过订单ID查询某订单
                        orderId = ctx.params.orderId;
                        //console.log("orderId", orderId);

                        _context2.next = 3;
                        return getOrderById(orderId);

                    case 3:
                        order = _context2.sent;
                        _context2.next = 6;
                        return getOrderDetailListByOrderId(order);

                    case 6:
                        orderDetail = _context2.sent;


                        console.log('orderDetail', orderDetail);
                        ctx.status = 200;
                        ctx.body = {
                            code: 0,
                            msg: "请求成功",
                            data: {
                                orderDetail: orderDetail
                            }
                        };

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function searchOrderById(_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

function getProductByPageAndSize(page, size) {
    var start = (page - 1) * size;
    var sql = 'SELECT * from ordersummary LIMIT ' + start + ', ' + size; //从start+1条到第end条， 一共size条。
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getOrderDetailListByOrderId(order) {
    var sql = 'SELECT * from orderdetails WHERE order_id=' + order[0].order_id;
    order[0].orderDetailList = [];
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, orderDetailList) {
            if (err) {
                reject(err);
            } else {
                order[0].orderDetailList = orderDetailList;
                resolve(order);
            }
        });
    });
}

function getOrderById(orderId) {
    var sql = 'SELECT * from ordersummary WHERE order_id=' + orderId;
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log("+++++++++++");
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    sendProduct: sendProduct,
    cancelOrder: cancelOrder,
    finishOrder: finishOrder,
    orderPageQuery: orderPageQuery,
    searchOrderById: searchOrderById
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Router = __webpack_require__(0);
var router = new Router();
var admin = __webpack_require__(17);

router.post('/admin/logout', admin.logout); //管理员登出
router.post('/admin/login', admin.login); //登录验证
router.post('/admin/register', admin.register); //新增管理员


module.exports = router;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var mysql = __webpack_require__(1);
var config = __webpack_require__(2);
var connection = mysql.createConnection(config);
connection.connect();

function queryUserIfExist(data) {
    console.log("data:", data);
    var sql = 'SELECT * from admintable WHERE admin_name=\'' + data.userName + '\' AND admin_pass=\'' + data.passWord + '\'';
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

var logout = function logout(ctx, next) {
    //管理员登出
    ctx.session.user = '';
    ctx.status = 200;
    ctx.body = { success: false, msg: '登出成功' };
};
var login = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return queryUserIfExist(ctx.request.body);

                    case 2:
                        data = _context.sent;

                        console.log("data", data);
                        if (data && data[0]) {
                            ctx.status = 200;
                            ctx.session.user = data[0].admin_name;
                            //    ctx.response.set('Access-Control-Allow-Credentials', true);
                            console.log("#####@", ctx.session.user);
                            ctx.body = { success: true, msg: '登录成功！' };
                            console.log('登陆成功');
                        } else {
                            ctx.status = 400;
                            ctx.body = { success: false, msg: '账号或密码错误！' };
                            console.log('登录失败');
                        }

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function login(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
var register = function register(ctx, next) {
    //新增管理员
    var data = ctx.request.body;
    var sql = 'INSERT INTO admintable( admin_name, admin_pass) values (\'' + data.userName + '\', \'' + data.passWord + '\')';
    var invitationCode = 123456;
    if (data.invitationCode != invitationCode) {
        ctx.status = 400;
        ctx.body = {
            code: 0,
            msg: "邀请码错误",
            data: null
        };
        return;
    }
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
    });

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    };
};
module.exports = {
    logout: logout,
    login: login,
    register: register
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("koa-convert");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ })
/******/ ]);