const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

// ======================================== Create User
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password,
    bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser) => {
        res.status(201).json({
            status: 201,
            message: 'user created'
        })
    })
})

module.exports = router 
