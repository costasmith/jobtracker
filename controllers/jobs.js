//  dependencies
const express = require('express')
const router = express.Router()
const Jobs = require('../models/job.js')

 // Routes

// ======================================== Create Job
router.post('/', (req, res) => {
  Jobs.create(req.body, (error, createdJob) => {
    res.json(createdJob)
    console.log(createdJob);
  })
})


// ======================================== Read Jobs
// index route
router.get('/', (req, res) => {
    Jobs.find({}, (error, foundJobs) => {
        res.json(foundJobs)
    })
})

// router.get('/', (req, res) => {
//   Jobs.find({}, (error, foundJobs) => {
//     res.json(foundJobs)
//   })
// })


  // ======================================== Update Job
router.put('/:id', (req, res) => {
  Jobs.findByIdAndUpdate(req.params.id, req.body, {new: true},
  (error, updatedJob) => {
    res.json(updatedJob)
  })
})

  // ======================================== Delete Job
router.delete('/:id', (req, res) => {
    Jobs.findByIdAndRemove(req.params.id, (error, deletedJob) => {
        res.json(deletedJob)
    })
})


// export
module.exports = router
