const Product = require("../models/product");
const Cart=require("../models/cart");
exports.getProducts = (req,res,next)=>{

      Product.findAll().then(products=>{
            res.render('shop/product-list',{
                  prod:products,
                  docTitle:'Admin Products',
                  path:'/products'
            });  
      });
};

exports.getProduct= (req,res,next)=>{
     const productId=req.params.productId;

     Product.findByPk(productId)
      .then(products =>{
            res.render('shop/product-details',{product:products,docTitle:products.title,path:'/products'});
      })
      .catch(error=>{console.log(error)});
}

exports.getIndex=(req,res,next)=>{
      Product.findAll()
      .then(product=>{
            res.render('shop/index',{
                  prod:product,
                  docTitle:'Shop',
                  path:'/'
            });
      })
      .catch(error=>{
            console.log(error);
      });

};

exports.getCart=(req,res,next)=>{
      console.log(req.user.getCart());
      req.user
      .getCart()
      .then((cart)=>{
            return cart
            .getProducts()
            .then(products=>{
                  res.render('shop/cart',{
                                          path:'/cart',
                                          docTitle:'Your Cart',
                                          products:products
                                        });
            })
            .catch(err=>console.log(err));
      })
      .catch((err)=>{ console.log(err);});
  
    
};

exports.postCart=(req,res,next)=>{
      const prodId=req.body.productId;
      let fetchedCart;
      let newQuantity=1;
      req.user
      .getCart()
      .then(cart=>{
            fetchedCart=cart;
            return cart.getProducts({where:{id:prodId}});
      })
      .then(products=>{
            let product;
            if(products.length>0){
                  product=products[0];
            }
         
            if(product){
                  const oldQuantity=product.cartItem.quantity;
                  newQuantity=oldQuantity+1;
                  return product;
            }
            return Product.findByPk(prodId);
      })  
      .then(product=>{
            return fetchedCart.addProduct(product,{through:{quantity:newQuantity}});
      }) 
      .then(()=>{
            res.redirect("/cart");
      }) 
      .catch(err=>console.log(err));

}

exports.postCartDeleteProduct=(req,res,next)=>{
      const prodId=req.body.productId;

      req.user
      .getCart()
      .then(cart=>{
            return cart.getProducts({where:{id:prodId}});
      })
      .then(products=>{
            const product=products[0];
            product.cartItem.destroy();
      })
      .then(result=>{
            res.redirect('/cart');
      })
      .catch(err=>console.log(err));

}
exports.postOrder=(req,res,next)=>{
      let fetchedCart;  
      req.user
      .getCart()
      .then(cart=>{
            fetchedCart=cart;
            return cart.getProducts();
      })
      .then(products=>{
            //console.log(products);
            return req.user
            .createOrder()
            .then(order=>{
                 return order.addProducts(
                        products.map(product=>{
                              product.orderItem={quantity:product.cartItem.quantity};
                              return product;
                        })
                  );
            })
            .catch(err=>console.log(err));
      })
      .then(result=>{
            return fetchedCart.setProducts(null);
      })
      .then(result=>{
            res.redirect('/orders');
      })
      .catch(err=>console.log(err));
};

exports.getOrders=(req,res,next)=>{
      req.user.getOrders({include:['products']})
      .then(orders=>{
            res.render('shop/orders',{
                  path:'/orders',
                  docTitle:'Your Orders',
                  orders:orders
            });
      })
      .catch(err=>{
            console.log(err);
      });
     
};


exports.getCheckout=(req,res,next)=>{
      res.render('shop/checkout',{
            path:'/checkout',
            pageTitle:'Checkout'
      });
}


  