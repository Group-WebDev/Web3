const express = require('express')
const app = express();
const path = require("path");
const account = require("./account");
const subscriber = require("./subscriber");
const event = require("./event");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');



var id = "5dccee7ec4a9d5a69e8c6191";

var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/accounts', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Now connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
console.log("we're connected")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', function (req, res) {
  let test = async function () {
    console.log(req.headers.username)
    const exist = await account.getAccount(req.headers.username, req.headers.password);
    if (exist == null) {
      res.json({
        message : 'Username not found or invalid password!'
      })
    }
    else {
      id = exist._id
      console.log(exist._id)
      res.send(exist)
    }
  }
  test();
})

app.post('/subscribe', function (req, res) {
  let test = async function () {
    const exist = await subscriber.getByUsername(req.headers.username);
    if (exist == null) {
      let data = {
        username: req.headers.username,
        email : req.headers.email,
        address: req.headers.address
      }
      await subscriber.addSubscriber(data);
      let item = await subscriber.getLastSubscriber();
      res.send(item)
    }
    else {
      res.json({
        message: 'Username already exist!'
      })
    }
  }
  test();
})

app.post('/addEvent', (req, res) => {
  let test = async function () {
      let data = {
        title: req.headers.title,
        dateCreated : req.headers.datecreated,
        dateEvent : req.headers.dateevent,
        address : req.headers.address,
        description : req.headers.description,
        createdBy : id
      }
      await event.addEvent(data);
      let item = await event.getLastEvent();
      res.send(item)
    }
  test();
})

app.post('/send',(req,res)=>{
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'irishs.rufo@gmail.com',
      pass: 'Rufoelisa897'
    }
  });
  
  var mailOptions = {
    from: 'irishs.rufo@gmail.com',
    to: 'irishs.rufo@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send("dili okeey!")
    } else {
      console.log('Email sent: ' + info.response);
      res.send("okeey keeyooh!")

    }
  });
})

'use strict';

// async..await is not allowed in global scope, must use a wrapper

app.listen(3000,function(){
  console.log("done!")
})

// app.listen(300, 8888, '127.0.0.1', function(){
//   console.log("listening to port 3000!")
// })

