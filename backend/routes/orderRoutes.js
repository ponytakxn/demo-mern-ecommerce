const express = require('express');
const router = express.Router();
const { verifyIsLogin, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const { getUserOrders, getOrderDetails, createOrder, updateOrderToPaid, updateOrderToDelivered, getOrders } = require('../controllers/orderController');

// user routes
router.use(verifyIsLogin);
router.get('/', getUserOrders);
router.get('/user/:id', getOrderDetails);
router.post('/', createOrder);
router.put('/paid/:id', updateOrderToPaid);

//admin routes
router.use(verifyIsAdmin);
router.put('/delivered/:id', updateOrderToDelivered);
router.get('/admin', getOrders);


module.exports = router;