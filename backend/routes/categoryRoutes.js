const express = require('express');
const { getCategories, newCategory, deleteCategory, saveAttr } = require('../controllers/categoryController');
const { verifyIsLogin, verifyIsAdmin } = require('../middleware/verifyAuthToken');

const router = express.Router();

router.get('/', getCategories);

router.use(verifyIsLogin);
router.use(verifyIsAdmin);
router.post('/', newCategory);
router.delete('/:category', deleteCategory);
router.post('/attr', saveAttr);

module.exports = router;