const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// ======================================== Create Session
router.post('/', (req, res) => {
    User.findOne({username:req.body.username}, (err, foundUser) => {
        console.log(foundUser);
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser;
            console.log('the passwords match');
            res.status(201).json({
                status: 201,
                message: 'session created'
            })
        } else {
            console.log('hit the else statement');
            res.status(401).json({
                status: 401,
                message: 'login failed'
            })
        }
    })
})

// ======================================== Delete Session
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.status(200).json({
            status: 200,
            message: 'logout complete'
        })
    })
})

module.exports = router;
