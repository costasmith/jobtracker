const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const db = mongoose.connection;





app.get('/', (req,res) => {
  res.send('hiya')
})


//db connection
mongoose.connect('mongodb://localhost:27017/jobtracker', {useNewUrlParser: true})
mongoose.connection.once('open', () => {
  console.log('connected to monkey ...');
})
//listener
app.listen(3000, () =>{
  console.log( 'Hello Mate! Welcom to port: ')
});
