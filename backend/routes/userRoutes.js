const express = require('express');
const { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getOneUser, updateUser, 
    deleteUser } = require('../controllers/userController');
const { verifyIsLogin, verifyIsAdmin } = require('../middleware/verifyAuthToken');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// user logged in routes:
router.use(verifyIsLogin);
router.put('/profile', updateUserProfile);
router.get('/profile/:id', getUserProfile);
router.post('/review/:productId', writeReview);

//admin routes:
router.use(verifyIsAdmin);
router.get('/', getUsers);
router.get('/:id', getOneUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;