const express = require('express');
const app = express();
// Require dotenv becuase it contains my Atlas project link
// require('dotenv').config();

const mongoose = require('mongoose');
const db = mongoose.connection;

const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const PROJECT3_DB = process.env.PROJECT3_DB;
console.log(process.env);

// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', (req,res) => {
  res.send('hiya')
})


//db connection
mongoose.connect(PROJECT3_DB, {useNewUrlParser: true})

mongoose.connection.once('open', () => {
  console.log('connected to monkey ...');
})

// middleware
//use public folder for static assets
app.use(express.static('public'));
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project



//listener
app.listen(PORT, () =>{
  console.log( 'Hello Mate! Welcom to port: ')
});
