// const mysql=require("mysql2");

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'node_app',
//     password:''
// });
// module.exports=pool.promise();

const Sequelize = require("sequelize");

const sequelize= new Sequelize('node_app','root','',{
    dialect:'mysql',host:'localhost'
});

module.exports=sequelize;