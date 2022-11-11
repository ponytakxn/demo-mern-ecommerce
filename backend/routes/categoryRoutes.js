const express = require('express');
const { getCategories, newCategory, deleteCategory, saveAttr } = require('../controllers/categoryController');
const router = express.Router();

router.get('/', getCategories);
router.post('/', newCategory);
router.delete('/:category', deleteCategory);
router.post('/attr', saveAttr);

module.exports = router;