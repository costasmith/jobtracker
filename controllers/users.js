//==============================================================================
//  USERS.JS => CONTROLLER FOR USERS, INCLUDING JOBS STORED IN USERS
//==============================================================================

// ======================================== Dependencies
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');


//==============================================================================
//  USER CONTROLLER ROUTES
//==============================================================================
// ======================================== CREATE User
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


// ======================================== Push a CREATED job to user's jobList
router.put('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        console.log(foundUser);
        console.log(req.body.job);
        foundUser.jobList.push(req.body.job)
        foundUser.save((err, savedUser) => {
            // save the updated foundUser
        })
        console.log(foundUser);
        res.status(201).json({
            status: 201,
            message: 'job stored in user'
        })
})
})


// ======================================== READ jobs from user's jobList
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            // console.log('read this: ', foundUser.jobList);
            res.json(foundUser.jobList)
        }
    })
})


// ======================================== UPDATE a job from user's jobList
router.put('/:user/:id', (req, res) => {
    User.findById(req.params.user, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            // Find the index of the job in the user's jobList
            console.log('req.params: ', req.params);
            let idString = req.params.id.toString();
            console.log('idString: ', idString);

            let checkID = [];
            for (let i = 0; i < foundUser.jobList.length; i++) {
                checkID[i] = foundUser.jobList[i]._id.toString()
            }
            console.log('checkID: ', checkID);

            function isRightIndex (jobNo) {
                return (jobNo == idString)
            }
            let index = checkID.findIndex(isRightIndex)

            console.log(index);

            if (index !== -1) {
                // remove the original job from the jobList and add the updated job
                foundUser.jobList.splice(index, 1, req.body.job)
                foundUser.save((err, savedUser) => {
                    // save the updated foundUser
                })
                console.log('foundUser after replacement splice: ', foundUser);
                res.json(foundUser)
            } else {
                res.status(400).json({
                    status: 400,
                    message: 'unsuccessful attempt to update selected job'
                })
            }

        }
    })
})


// ======================================== DELETE a job from user's jobList
router.delete('/:user/:id', (req, res) => {
    User.findById(req.params.user, (err, foundUser) => {
        if (err) {
            console.log(err);
        } else {
            console.log('req.params: ', req.params);
            let idString = req.params.id.toString();
            console.log(idString);

            let checkID = [];
            for (let i = 0; i < foundUser.jobList.length; i++) {
                checkID[i] = foundUser.jobList[i]._id.toString()
            }
            console.log('checkID: ', checkID);

            function isRightIndex (jobNo) {
                return (jobNo == idString)
            }
            let index = checkID.findIndex(isRightIndex)

            console.log(index);

            if (index !== -1) {
                // foundUser.jobList.splice(0, 1)
                foundUser.jobList.splice(index, 1)
                foundUser.save((err, savedUser) => {
                    // save the updated foundUser
                })
                console.log('foundUser after delete splice: ', foundUser);
                // res.json(foundUser)
                res.status(201).json({
                    status: 201,
                    message: 'job deleted from jobList array'
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: 'unsuccessful attempt to delete selected job'
                })
            }

        }

    })
})


// export the users router
module.exports = router
