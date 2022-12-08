const jwt = require('jsonwebtoken');

const verifyIsLogin = (req,res,next) => {
    try{
        const token = req.cookies.access_token;
        if(!token){
            return res.status(403).send('A token is required for authentication.')
        }

        try{
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decodedToken;
            next();
        }catch(err){
            return res.status(401).send('Unahutorized. Invalid token')
        }
    }catch(err){
        next(err);
    }
}

const verifyIsAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else{
        return res.status(401).send('Unahutorized. Admin required.')
    }
}

module.exports = { verifyIsLogin, verifyIsAdmin };