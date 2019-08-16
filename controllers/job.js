//  dependencies
const express = require('express')
const router = express.Router()
const Job = require('../models/job.js')

 // routes

router.post('/', (req, res) => {
  Job.create(req.body, (error, createdJob) => {
    res.json(createdJob)
    console.log(createdJob);
  })
})


// export
module.exports = router 
