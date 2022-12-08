const User = require('../models/UserModel');
const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');
const { hashPassword, comparePasswords } = require('../utils/hashPassword');
const generateAuthToken = require('../utils/generateAuthToken');

const getUsers = async(req,res,next) => {
    try{
        const users = await User.find({}).select('-password');
        return res.json(users);
    } catch (err){
        next(err);
    }
};

const registerUser = async(req,res,next) => {
    try{
        const { name, lastName, email, password } = req.body
        if(!(name && lastName && email && password)) {
            return res.status(400).json('All inputs are required')
        }

        const userExists = await User.findOne({ email })
        if(userExists) {
            return res.status(400).json({ error: 'User already exists' })
        } else {
            const hashedPassword = hashPassword(password)
            const user = await User.create({
                name, lastName, email: email.toLowerCase(), password: hashedPassword
            });
            res
                .cookie('access_token', generateAuthToken(user._id,user.name,user.lastName,user.email,user.isAdmin), {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict'
                })
                .status(201)
                .json({
                    success: 'User created',
                    userCreated: {
                        _id: user._id,
                        name: user.name,
                        lastName: user.lastName,
                        email: user.email,
                        isAdmin: user.isAdmin
                    }
                });
        }
    } catch(err){
        next(err);
    }
};

const loginUser = async(req,res,next) => {
    try{
        const { email, password, doNotLogout } = req.body;
        if(!(email && password)) {
            return res.status(400).send('All inputs are required.');
        }

        const user = await User.findOne({email}).orFail();
        if(user && comparePasswords(password, user.password)){
            let cookieParams = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            }

            if(doNotLogout){
                cookieParams = {...cookieParams, maxAge: 1000*60*60*24*7} // 1000 = 1ms
            }

            return res.cookie(
                'access_token', 
                generateAuthToken(user._id,user.name,user.lastName,user.email,user.isAdmin), cookieParams)
                .json({
                    success: 'user logged in',
                    userLoggedIn: { 
                        _id: user._id, 
                        name: user.name, 
                        lastName: user.lastName, 
                        email: user.email, 
                        isAdmin: user.isAdmin, 
                        doNotLogout}
                });
        } else{
            return res.status(401).send('wrong credentials')
        }
    }catch(err){
        next(err);
    }
}

const updateUserProfile = async(req,res,next) => {
    try{
        const user = await User.findById(req.user._id).orFail();
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber;
        user.address = req.body.address;
        user.country = req.body.country;
        user.zipCode = req.body.zipCode;
        user.city = req.body.city;
        if(user.password !== req.body.password){
            user.password = hashPassword(req.body.password);
        }

        await user.save();

        res.json({
            success: 'User updated',
            userUpdated: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })

    } catch(err){
        next(err);
    }
}

const getUserProfile = async(req,res,next) => {
    try{
        const user = await User.findById(req.params.id).orFail();
        return res.send(user);

    }catch(err){
        next(err);
    }
}

const writeReview = async(req,res,next) => {
    try{
        // Vamos a usar una transacción. Esto hará que solo haremos los cambios en la BD si es que ambos objetos cumplen los requisitos para ser
        // modificados. Por ej., si el usuario ya escribió una reseña entonces no se guardará la reseña en el producto, pero tampoco queremos que
        // esa reseña se guarde en la clase Review.
        const session = await Review.startSession(); // Iniciamos la sesión

        const { comment, rating } = req.body;

        if(!(comment && rating)) {
            return res.status(400).send('All inputs are required.')
        }

        const ObjectId = require('mongodb').ObjectId;
        let reviewId = ObjectId();

        session.startTransaction(); // Iniciamos la transacción antes de crear el documento en nuestra clase.

        await Review.create([
            {
                _id: reviewId,
                comment: comment,
                rating: Number(rating),
                user: { _id: req.user._id, name: req.user.name + " " + req.user.lastName }
            }
        ], { session: session }) // Agregamos la sesión como parámetro

        const product = await Product.findById(req.params.productId).populate('reviews').session(session); // En la segunca clase llamamos a la sesión

        const alreadyReviewed = product.reviews.find((r) => r.user._id.toString() === req.user._id.toString());
        if(alreadyReviewed){
            await session.abortTransaction(); // Si el producto ya fue reseñado por el usuario entonces abortamos la transacción
            session.endSession(); // Y luego finalizamos la sesión
            res.status(400).send('Product already reviewed by this user.')
        }
        
        let prc = [...product.reviews];
        prc.push({ rating: rating });
        product.reviews.push(reviewId);

        if(product.reviews.length === 1){
            product.rating = Number(rating);
            product.reviewsNumber = 1;
        } else{
            product.rating = prc.map((item) => Number(item.rating)).reduce((sum,item) => sum + item, 0) / product.reviews.length;
            product.reviewsNumber = product.reviews.length;
        }

        await product.save();

        await session.commitTransaction(); // Si todo sale bien, entonces realizamos la transacción y guardamos los cambios en la BD
        session.endSession(); // Finalizamos la sesión.

        res.send('Review added');

    }catch(err){
        next(err);
    }
}

const getOneUser = async(req,res,next) => {
    try{
        const user = await User.findById(req.params.id).select("name lastName email isAdmin").orFail();
        return res.send(user);

    }catch(err){
        next(err);
    }
}

const updateUser = async(req,res,next) => {
    try{
        const user = await User.findById(req.params.id).orFail();
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        await user.save();
        res.send('User updated');
    }catch(err){
        next(err);
    }
}

const deleteUser = async(req,res,next) => {
    try{
        const user = User.findById(req.params.id).orFail();
        await user.remove();
        res.send('user removed');
    } catch(err){
        next(err);
    }
}

module.exports = { getUsers, registerUser, loginUser, updateUserProfile, getUserProfile, writeReview, getOneUser, updateUser, deleteUser };