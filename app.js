const path=require('path');
const bodyParser=require('body-parser');
const errorController=require('./controllers/error');
const express=require('express');
const sequelize=require('./util/database');
const app=express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use((req,res,next)=>{
  User.findByPk(1)
  .then(user=>{
     req.user=user;
     next();
  })
  .catch(err=>console.log(err));
});
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem=require('./models/cart-item');
const Order=require('./models/order');
const OrderItem=require('./models/order-item');
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product,{through:OrderItem});

app.set('view engine','ejs');
app.set('views','views')
app.use('/admin',adminRoutes);
app.use("/",shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});

//Here by using this we can sync table in database directly.
sequelize
//.sync({force:true})//We can pass force true to recreate all tables in database 
.sync()
.then(result=>{
    return User.findByPk(1);
    //console.log(result);
    app.listen(3000);
})
.then(user=>{
    if(!user){
        return User.create({name:'Himanshu',email:'test@test.com'});
    }
    return user;
})
.then(user=>{
    return user.createCart();
})
.then(cart=>{
    app.listen(3000);
})
.catch(err=>{
   console.log(err);
}); 
//