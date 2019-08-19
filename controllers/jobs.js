//==============================================================================
//  JOB.JS => CONTROLLER FOR JOBS
//==============================================================================

// ======================================== Dependencies
const express = require('express')
const router = express.Router()
const Jobs = require('../models/job.js')


//==============================================================================
//  JOB CONTROLLER ROUTES
//==============================================================================
// ======================================== Create Job
router.post('/', (req, res) => {
  Jobs.create(req.body, (error, createdJob) => {
    res.json(createdJob)
    console.log('created job: ', createdJob);
  })
})


  // ======================================== Update Job
router.put('/:id', (req, res) => {
  Jobs.findByIdAndUpdate(req.params.id, req.body, {new: true},
  (error, updatedJob) => {
    res.json(updatedJob)
    console.log('updated job: ', updatedJob);
  })
})


// export the jobs router
module.exports = router
