const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const JobSchema = mongoose.model('Job').schema;

const userSchema = Schema({
    username: String,
    password: String,
    jobList: [JobSchema],
    job: JobSchema          //  Try to pass a job to put for pushing into array
});

const User = mongoose.model('User', userSchema);

module.exports = User;
