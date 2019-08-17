const express = require('express');
const app = express();
// Require dotenv becuase it contains my Atlas project link
require('dotenv').config();

const session = require('express-session');

const mongoose = require('mongoose');
const db = mongoose.connection;

const PORT = process.env.PORT || 3000;


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const PROJECT3_DB = process.env.PROJECT3_DB;
console.log(process.env);
console.log(process.env.PROJECT3_DB);

// ======================================== Middleware
//use public folder for static assets
app.use(express.static('public'));
app.use(express.json());//  middleware that parses JSON
app.use(session({
    secret: 'joeyjojojuniorshabadoo',
    resave: false,
    saveUninitialized: false
}));

// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

// app.get('/', (req,res) => {
//   res.render('/')
// })

// ======================================== Database
mongoose.connect(PROJECT3_DB, {useNewUrlParser: true})

mongoose.connection.once('open', () => {
  console.log('connected to monkey ...')
})

// ======================================== User Session Route
app.get('/app', (req, res) => {
    if(req.session.currentUser){
        res.json(req.session.currentUser);
    } else {
        res.status(401).json({
            status: 401,
            message: 'not logged in'
        })
    }
})

// ======================================== Controllers
const jobsController = require('./controllers/jobs.js')
app.use('/jobs', jobsController)

const userController = require('./controllers/users.js');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

// ======================================== Listener
app.listen(PORT, () =>{
  console.log( 'Hello Mate! Welcome to port: ')
})
