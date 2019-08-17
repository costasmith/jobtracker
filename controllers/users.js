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








////////////////////////////////////////////// try to store the job in the user
router.put('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        console.log(foundUser);
        console.log(req.body.job);
        foundUser.jobList.push(req.body.job)
        foundUser.save((err, savedUser) => {
            // res.json(foundUser)
        })
        console.log(foundUser);
        res.status(201).json({
            status: 201,
            message: 'job stored in user'
        })
})
})





router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            res.json(foundUser)
        }
    })
})

////////////////////////////////////////////// try to store the job in the user





module.exports = router
