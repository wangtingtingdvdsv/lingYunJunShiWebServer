/*admin */
const mysql = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);

setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

//connection.connect();

function queryUserIfExist(data) {
    console.log("data:", data);
    var  sql = `SELECT * from admin WHERE admin_name='${data.userName}' AND admin_pass='${data.passWord}'`;
    return new Promise((resolve, reject) => {
       
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })  
          
    })
}

const logout = (ctx, next) => { //管理员登出
    ctx.session.user = '';
    ctx.status = 200;
    ctx.body = { success: false, msg: '登出成功' };
} 
const login = async (ctx, next) => { //登录验证 
    var data = await queryUserIfExist(ctx.request.body);
    console.log("data", data);
    if (data) {
       ctx.status = 200;
       ctx.session.user = data[0].admin_name;
    //    ctx.response.set('Access-Control-Allow-Credentials', true);
       console.log("#####@", ctx.session.user);
       ctx.body = { success: true, msg: '登录成功！' };
        console.log('登陆成功');
   }
   else{ 
       ctx.status = 400;
       ctx.body = { success: false, msg: '账号或密码错误！' };
       console.log('登录失败');
   }
}
const register = (ctx, next) => { //新增管理员
    var data = ctx.request.body;
    var sql = `INSERT INTO admin( admin_name, admin_pass) values ('${data.userName}', '${data.passWord}')`;
    var invitationCode = 123456;
    if(data.invitationCode != invitationCode) {
        ctx.status = 200;
        ctx.body = {
            code: 0,
            msg: "请求",
            data: null
        }
        return;
    }
    
    connection.query(sql,function (err, result) {
        if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
        }
    })
   

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    }
} 

/*categorytable */

 function getCategorys() {
    var  sql = `SELECT * from category`;
    return new Promise((resolve, reject) => {
        
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })  
       
    })
}


const searchCategory = async (ctx, next) => {

   var data = await getCategorys();
    
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:data
    };
};

//修改类目信息
const changeCategoryInfo = async (ctx, next) => {
    var data = ctx.request.body;
    var sql;
    if(data.categoryId) { //修改类目信息
        sql = `UPDATE category SET category_name='${data.categoryName}'
        WHERE  category_id =${data.categoryId}`;
        
        var result = await connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            return result;
        })
        
    } else { //新增类目
        sql = `INSERT INTO category (category_name) values ('${data.categoryName}')`;
        
        var result = await connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            return result;
        })
        
    }
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    }
}



/*comment*/




function getComment() {
    var  sql = `SELECT * from comment_table`;
    return new Promise((resolve, reject) => {
       
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })    
        
    })
}


const searchComment = async (ctx, next) => { 
    var data = await getComment();
   
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:data
    };
}



/*order */



const cancelOrder = (ctx, next) => {//取消订单
    let orderId = ctx.params.orderId;
    sql = `UPDATE orderSummary SET order_status=2
    WHERE order_id=${orderId}`;
   
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       
    })
   
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    }
} 

const finishOrder = (ctx, next) => {//接单
    let orderId = ctx.params.orderId;
    sql = `UPDATE orderSummary SET order_status=1
    WHERE order_id=${orderId}`;
   
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
       
    })
    
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    }
} 

const orderPageQuery = async (ctx, next) => { //订单概要分页查询
    var data = await getOrderByPageAndSize();
    //console.log("request", data);
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:data
    };
} 

const searchOrderById = async (ctx, next) => { //通过订单ID查询某订单
    let orderId = ctx.params.orderId;
    //console.log("orderId", orderId);
    var order = await getOrderById(orderId);
    var orderDetail = await getOrderDetailListByOrderId(order);

     console.log('orderDetail', orderDetail);
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            orderDetail
        }
    };
}

function getOrderByPageAndSize() {
    var  sql = `SELECT * from orderSummary`; //从start+1条到第end条， 一共size条。
    console.log('sql', sql);
    return new Promise((resolve, reject) => {
       
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })    
        
    })
}

function  getOrderDetailListByOrderId(order) {
        var  sql = `SELECT * from orderdetails WHERE order_id=${order[0].order_id}`;
        order[0].orderDetailList = [];
        return new Promise((resolve, reject) => {
           
            connection.query(sql, ( err, orderDetailList) => {
                if ( err ) {
                    reject( err )
                } else {
                   order[0].orderDetailList = orderDetailList;
                   resolve(order);
                }
            })  
            
        })
}

function getOrderById(orderId) {
    var  sql = `SELECT * from orderSummary WHERE order_id=${orderId}`;
    return new Promise((resolve, reject) => {
       
        connection.query(sql, ( err, result) => {
            if ( err ) {
                console.log("+++++++++++");
              reject( err )
            } else {
              resolve( result )
            }
        })    
        
    })
}

/*product */

const deleteProduct = (ctx, next) => {
    let productId = ctx.request.body.productId;
    let sql =  `delete from product where product_id='${productId}' `;
    console.log(productId);
    
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })
    

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    }
}
const addProductPic = (sql) => {
    connection.query(sql, ( err, result) => {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          }
    })    
}
function getProductById(id) {
    var  sql = `SELECT * from dishes WHERE product_id=${id}`;
    return new Promise((resolve, reject) => {
        
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })  
          
    })
}

const changeProductInfo = (ctx, next) => {
    var data = ctx.request.body;
    console.log(ctx.request.body);
    var sql;
   
    if(data.productId) { //修改类目信息
        console.log('###########');
        sql = `UPDATE product SET product_name='${data.name}'  , product_price='${data.price}', product_description='${data.description}', seller_phone='${data.phone}', category_type='${data.category}'
        WHERE product_id='${data.productId}'`;
        let picUrlArr = data.picUrl;
        console.log('pic', picUrlArr);
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            console.log('result', result);
            let productId = result.insertId;
            let picSql = `UPDATE product_pic SET pic1='${picUrlArr[0]}'  , pic2='${picUrlArr[1]}', pic3='${picUrlArr[2]}' WHERE productId='${data.productId}'`;
            addProductPic(picSql);
        })
        
    } else { //新增类目
       
        sql = `INSERT INTO product(product_name, product_price, product_description, seller_phone, category_type) values ('${data.name}', '${data.price}', '${data.description}', '${data.phone}', '${data.category}')`;
        let picUrlArr = data.picUrl;
        
       
        
        connection.query(sql,function (err, result) {
            if(err){
              console.log('[SELECT ERROR] - ',err.message);
              return;
            }
            let productId = result.insertId;
            let picSql = `INSERT INTO product_pic(productId, pic1, pic2, pic3) values ('${productId}','${picUrlArr[0]}', '${picUrlArr[1]}', '${picUrlArr[2]}')`;
            addProductPic(picSql);
        })
        
    }
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data: null
    }
}

//通过商品ID查询商品
const searchProductById = async (ctx, next) => {
    console.log(ctx.params);
    if(isNaN(ctx.params.productId)){
        return; //不是数字
    }
    const id = ctx.params.productId;
   var data = await getProductById(id);
    
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
    };
};


const productOffSale = (ctx, next) => { //商品下架
    var data = ctx.request.body;
    const id = ctx.params.productId;
    if(!id) {
        return;
    }
    var sql = `UPDATE dishes SET product_status='${data.productStatus}'
    WHERE product_id='${id}'`;
    
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })
    

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
    };
}

const productOnSale = (ctx, next) => { //商品上架
    var data = ctx.request.body;
    const id = ctx.params.productId;
    if(!id) {
        return;
    }
    var sql = `UPDATE dishes SET product_status='${data.productStatus}'
    WHERE product_id='${id}'`;
    
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
    })
    

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
    };
}

var getProductPic = function(productId){
    let  sql = `SELECT * from product_pic where productId='${productId}'`; 
    return new Promise((resolve, reject) => {
        
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })  
    })
}

function getProductByPageAndSize() {
    var  sql = `SELECT * from product`; 
    return new Promise((resolve, reject) => {
        
        connection.query(sql, ( err, result) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( result )
            }
        })  
          
    })
}

const productPagingQuery = async (ctx, next) => { //分页查询
  //通过query获取get方式中data里面的数据，通过body获取post方式中data里面的数据
    var data = await getProductByPageAndSize();
    
     for(let i = 0; i < data.length; i++) {
        let pic = await getProductPic(data[i].product_id)
        
        if(!(pic[0] == null)) {
        
            data[i].picUrl=pic[0].pic1;
        }
       
        // data[i].picUrl = [];
        // for(let obj in pic[0]) {
        //     if(obj != 'productId') {
        //         data[i].picUrl.push(pic[0][obj])
        //     }
        // }
     }
     //console.log('@@@@@@@data', data);
     ctx.status = 200;
     ctx.body = {
         code: 0,
         msg: "请求成功",
         data:data
     };
}

module.exports = {
    logout,
    login,
    register,
    searchCategory,
    changeCategoryInfo,
    searchComment,
    cancelOrder,
    finishOrder,
    orderPageQuery,
    searchOrderById,
    deleteProduct,
    addProductPic,
    changeProductInfo,
    searchProductById,
    productOffSale,
    productOnSale,
    productPagingQuery
};