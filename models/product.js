/*const db=require("../util/database");
const Cart = require("./cart");

module.exports=class Product {
    constructor(id,title,imageUrl,description,price){
        this.id=id;
        this.title=title;
        this.imageUrl=imageUrl;
        this.description=description;
        this.price=price;
    }
    save(){
        return db.execute("INSERT INTO products(title,price,description,imageUrl) VALUES(?,?,?,?)",[this.title,this.price,this.description,this.imageUrl]);
    }
    static fetchAll(){
        return db.execute("select * from products");
    }
    static findById(id){
        return db.execute("SELECT * FROM products where products.id=?",[id]);
    }
    static deleteById(id){
       
    }
}*/

const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Product= sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    title:Sequelize.STRING,
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageUrl:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports=Product;