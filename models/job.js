const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    position: String,
    company: String,
    applied: String,
    resume: Boolean,
    letter: Boolean,
    followedUp: String,
    salary: String,
    url: String,
    stage: String,
    status: String
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
