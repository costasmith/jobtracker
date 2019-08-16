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

// index route
router.get('/', (req, res) => {
  Jobs.find({}, (error, foundJobs) => {
    res.json(foundJobs)
  })
})

// edit/update route
router.put('/:id', (req, res) => {
  Jobs.findByIdAndUpdate(req.params.id, req.body, {new: true},
  (error, updatedJob) => {
    res.json(updatedJob)
  })
})

// export
module.exports = router
