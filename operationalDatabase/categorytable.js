const mysql = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);
connection.connect();

function getAllCategory() {
    let sql = `SELECT * from category`;
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

 function getCategoryById(id) {
    var  sql = `SELECT * from category WHERE category_id=${id}`;
    var data = {};
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

//通过id查询类目
const searchCategoryById = async (ctx, next) => {
    if(isNaN(ctx.params.id)){
        return; //不是数字
    }
    const id = ctx.params.id;
   var data = await getCategoryById(id);
    
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: "请求成功",
        data:{
            data
        }
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



module.exports = {
    searchCategoryById,
     changeCategoryInfo,
     getAllCategory
};


