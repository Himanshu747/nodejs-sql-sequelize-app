const Product = require("../models/product");

exports.getAddProduct = (req,res,next) => {
   
    res.render('admin/edit-product',{
                docTitle:'Add New Product',
                path:'/admin/add-product',
                editing:false
              });
};

exports.postAddProduct= (req,res,next)=>{
      const title=req.body.title;
      const imageUrl=req.body.imageUrl;
      const description=req.body.description;
      const price=req.body.price;
      req.user.createProduct({
            title:title,
            price:price,
            imageUrl:imageUrl,
            description:description
      }).then(result=>{
            //console.log(result);    
            console.log('Product created Successfully');
            res.redirect("/admin/products");
      })
      .catch(err=>{
            console.log(err)
      });
      //const product=new Product(null,title,imageUrl,description,price);
    /*  product.save()
      .then(()=>{
            res.redirect("/admin/products");
      }).catch((err)=>{
            console.log(err);
      });
   */
   
};

exports.getEditProduct = (req,res,next) => {
      const editMode=req.query.edit;
      if(!editMode){
          return res.redirect("/");
      }
      const prodId=req.params.productId;
      req.user.getProducts({where:{id:prodId}})
      .then(products=>{
    //  Product.findByPk(prodId).then(products=>{
      const product=products[0];
            if(!product){
                  return res.redirect("/");
            }
            res.render('admin/edit-product',{
                  docTitle:'Edit Product',
                  path:'/admin/add-product',
                  editing:editMode,
                  product:product
                });
      })
      .catch(error=>{
            console.log(error);
      });
      
     
};

exports.postEditProduct =(req,res,next)=>{
      const prodId=req.body.productId;
      const updatedTitle=req.body.title;
      const updatedPrice=req.body.price;
      const updatedImageUrl=req.body.imageUrl;
      const updatedDesc=req.body.description;
      Product.findByPk(prodId)
      .then(product=>{
            product.title=updatedTitle;
            product.price=updatedPrice;
            product.imageUrl=updatedImageUrl;
            product.description=updatedDesc;
            return product.save();
      })
      .then(result=>{
            console.log('Updated Product Successfully');
            res.redirect('/admin/products');
      })
      .catch(error=>{
            console.log(error);
      });
   
};

exports.getProducts=(req,res,next)=>{
      req.user.getProducts()
      .then(products=>{
            res.render('admin/products',{
                  prod:products,
                  docTitle:'Admin Products',
                  path:'/admin/products'
            });  
      })
      .catch(error=>{
            console.log(error);
      });
   
    
};

exports.postDeleteProduct=(req,res,next)=>{
      const prodId=req.body.productId;
      //Product.deleteById(prodId);
      Product.findByPk(prodId)
      .then(product=>{
            return product.destroy();
      })
      .then(result=>{
            console.log('Products Delete successfully');
            res.redirect("/admin/products");
      })
      .catch(error=>{
            console.log(error);
      });
     
}