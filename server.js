// dependencies
const express = require('express')
const app = express();
const port = 3000
const mongoose = require('mongoose')
const db = mongoose.connection


// database connection
const PROJECT3_DB = process.env.PROJECT3_DB


app.get('/', (req,res) => {
  res.send('hiya')
})


// connect to Mongo 
mongoose.connect(PROJECT3_DB, {useNewUrlParser: true})
mongoose.connection.once('open', () => {
  console.log('connected to monkey ...')
})

//listener
app.listen(3000, () =>{
  console.log( 'Hello Mate! Welcom to port: ')
})
