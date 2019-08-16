//  dependencies
const express = require('express')
const router = express.Router()
const Jobs = require('../models/jobs.js')

 // Routes

// create
router.post('/', (req, res) => {
  Jobs.create(req.body, (error, createdJob) => {
    res.json(createdJob)
    console.log(createdJob);
  })
})


// export
module.exports = router
