const express = require('express');
const app = express();
// Require dotenv becuase it contains my Atlas project link
require('dotenv').config();

const mongoose = require('mongoose');
const db = mongoose.connection;

const PORT = process.env.PORT || 3000;

const jobsController = require('./controllers/jobs.js')
app.use('/jobs', jobsController)

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const PROJECT3_DB = process.env.PROJECT3_DB;
console.log(process.env);
console.log(process.env.PROJECT3_DB);

// middleware
//use public folder for static assets
app.use(express.static('public'));
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project


// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', (req,res) => {
  res.render('/')
})

//db connection
mongoose.connect(PROJECT3_DB, {useNewUrlParser: true})

mongoose.connection.once('open', () => {
  console.log('connected to monkey ...')
})

//listener
app.listen(PORT, () =>{
  console.log( 'Hello Mate! Welcome to port: ')
})
