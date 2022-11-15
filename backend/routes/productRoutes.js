const express = require('express');
const { getProducts, getProductsById, getBestSellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct,
    adminUpload, adminDeleteProductImage } = require('../controllers/productController');
const { verifyIsLogin, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const router = express.Router();

router.get('/category/:categoryName/search/:searchQuery', getProducts);
router.get('/category/:categoryName', getProducts);
router.get('/search/:searchQuery', getProducts);
router.get('/', getProducts);
router.get('/bestsellers', getBestSellers);
router.get('/get-one/:id', getProductsById);

// admin routes:
router.use(verifyIsLogin);
router.use(verifyIsAdmin);
router.get('/admin', adminGetProducts);
router.delete('/admin/:id', adminDeleteProduct);
router.delete('/admin/image/:imagePath/:productId', adminDeleteProductImage);
router.put('/admin/:id', adminUpdateProduct);
router.post('/admin/upload', adminUpload);
router.post('/admin', adminCreateProduct);


module.exports = router;