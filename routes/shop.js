const express=require("express");
const router=express.Router();
const shopController = require('../controllers/shop');
const adminRoutes=require("./admin");


router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);
router.get('/products/:productId',shopController.getProduct);
router.get('/cart',shopController.getCart);
router.post('/cart',shopController.postCart);
router.get('/checkout',shopController.getCheckout);
router.post('/cart-delete-item',shopController.postCartDeleteProduct);
router.post('/create-order',shopController.postOrder);
router.get('/orders',shopController.getOrders);
module.exports=router;