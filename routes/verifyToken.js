const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    const token = req.headers['auth-token'];
    if(!token) {
        return res.json({status:'error', error: 'access denied'})
    }

    try{
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        return res.json({status:'error', error: 'Invalid token'}) 
    }
}