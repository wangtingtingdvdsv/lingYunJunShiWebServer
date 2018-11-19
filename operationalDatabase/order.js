const mysql = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);
connection.connect();

const sendProduct = (ctx, next) => {
    let orderId = ctx.params.orderId;
    if(!orderId) {
        return;
    }
    sql = `update ordersummary set send_status= 1 where  order_id= ${orderId}`;
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

const cancelOrder = (ctx, next) => {//取消订单
    let orderId = ctx.params.orderId;
    sql = `UPDATE ordersummary SET order_status=2
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
    sql = `UPDATE ordersummary SET order_status=1
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
    var {page, size} = ctx.request.query;
    var data = await getProductByPageAndSize(page, size);

    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
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

function getProductByPageAndSize(page, size) {
    var start = (page-1) * size;
    var  sql = `SELECT * from ordersummary LIMIT ${start}, ${size}`; //从start+1条到第end条， 一共size条。
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
    var  sql = `SELECT * from ordersummary WHERE order_id=${orderId}`;
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

module.exports = {
    sendProduct,
    cancelOrder,
    finishOrder,
    orderPageQuery,
    searchOrderById
};