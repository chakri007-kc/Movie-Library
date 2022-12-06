const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('hello world')
})

router.post('/signup', async(req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.json({error: 'Please enter all the fields'})
    }
    const user = await User.findOne({email})
    console.log(user)
    if(user) {
        return res.json({error: 'User already exists'})
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hashPassword
    })

    await newUser.save();
    res.json({status:'ok'})
})

router.post('/signin', async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.json({error: 'Please enter all the fields'})
    }
    const user = await User.findOne({email});
    if(!user) {
        return res.json({error: 'User does not exist'})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.json({error: 'Invalid password'})
    }

    const token = jwt.sign({_id:user._id,name:user.name,email:user.email},process.env.JWT_SECRET)
    res.header('auth-token', token).json({status:'ok',token})
})


module.exports = router;