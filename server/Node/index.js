const express = require('express')
const app = express();
const path = require("path");
const account = require("./account");
const subscriber = require("./subscriber");
const event = require("./event");
<<<<<<< HEAD
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');



var id = "5dccee7ec4a9d5a69e8c6191";
=======
const bodyParser = require('body-parser')
var cors = require('cors')

const sgMail = require('@sendgrid/mail');
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb

var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

<<<<<<< HEAD
mongoose.connect('mongodb://localhost:27017/accounts', { useNewUrlParser: true, useUnifiedTopology: true })
=======
mongoose.connect('mongodb://localhost:27017/accounts', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
<<<<<<< HEAD
  console.log("we're connected!")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/admin/login', function (req, res) {
  let test = async function () {
    console.log(req.body.username)
    const exist = await account.getAccount(req.body.username, req.body.password);
=======
  console.log("we're connected")
});
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/login', function (req, res) {
  let test = async function () {
    console.log(req.headers.username)
    const exist = await account.getAccount(req.headers.username, req.headers.password);
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
    if (exist == null) {
      res.json({
        message: 'Username not found or invalid password!'
      })
<<<<<<< HEAD
    }
    else {
      id = exist._id
      console.log(exist._id)
=======
    } else {
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
      res.send(exist)
    }
  }
  test();
})

<<<<<<< HEAD
app.post('/subscribe', function (req, res) {
  let test = async function () {
=======




app.post('/register', function (req, res) {
  let test = async function () {
    // console.log(req.headers.username)
    const exist = await account.getByUsername(req.headers.username);
    console.log("username", exist)
    if (exist == null) {
      let data = {
        username: req.headers.username,
        email: req.headers.email,
        password: req.headers.password
      }
      await account.addPerson(data);
      let item = await account.getLastAccount();
      res.send(item)
    } else {
      res.json({
        message: 'Username already exist!'
      })
    }
  }
  test();
})

app.post('/subscribe', function (req, res) {
  sgMail.setApiKey();
    const msg = {
      to: 'johnpatrick.cabia-an@student.passerellesnumeriques.org',
      from: req.body.email,
      subject: 'Sending with Twilio SendGrid is Fun',
      text: req.body.address,
      html: `<strong> ${req.body.username} From ${req.body.address}Joined The Revolution</strong>`,
    };
    
  let test = async function () {

>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
    const exist = await subscriber.getByUsername(req.body.username);
    if (exist == null) {
      let data = {
        username: req.body.username,
        email: req.body.email,
        address: req.body.address
      }
      await subscriber.addSubscriber(data);
      let item = await subscriber.getLastSubscriber();
      res.send(item)
<<<<<<< HEAD
    }
    else {
=======

    } else {
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
      res.json({
        message: 'Username already exist!'
      })
    }
  }
<<<<<<< HEAD
  test();
})

app.post('/event/create', (req, res) => {
  console.log(req.body)
  let test = async function () {
    let data = {
      title: req.body.title,
      dateCreated: req.body.datecreated,
      dateEvent: req.body.dateevent,
      address: req.body.address,
      description: req.body.description,
      createdBy: id
=======
  sgMail.send(msg);
  test();
  
})

app.post('/addEvent', (req, res) => {
  let test = async function () {
    let data = {
      title: req.headers.title,
      dateCreated: req.headers.datecreated,
      dateEvent: req.headers.dateevent,
      address: req.headers.address,
      description: req.headers.description,
      createdBy: req.headers.createdby
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
    }
    await event.addEvent(data);
    let item = await event.getLastEvent();
    res.send(item)
  }
  test();
})

<<<<<<< HEAD
app.get('/event/retrieveAll', (req, res) => {
  // await event.retrieveEvent;
  let test = async function () {
    let events = await event.retrieveEvents();
    console.log("events : ", events)
    res.status(200).send(events);
  }
  test();
})

app.get('/event/retrievebytitle', (req, res) => {
  console.log("title : ",req.headers.title)
  // await event.retrieveEvent;
  let test = async function () {
    let events = await event.getEvent(req.headers.title);
    console.log("events : ", events)
    res.status(200).send(events);
  }
  test();
})


// app.put('/event/update', (req, res) => {
//   console.log("title : ",req.headers.title)
  
//   // await event.retrieveEvent;
//   let test = async function () {
//     let events = await event.getEvent(req.headers.title);
//     console.log("events : ", events)
//     res.status(200).send(events);
//   }
//   test();
// })

app.delete('/event/delete', (req, res) => {
  let test = async function () {
    let events = await event.deleteEvent(req.body.title);
    console.log("events : ", events)
    res.status(200).send("events deleted!");
  }
  test();
})

app.post('/send', (req, res) => {
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

  transporter.sendMail(mailOptions, function (error, info) {
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

app.listen(3000, function () {
  console.log("done!")
})

// app.listen(300, 8888, '127.0.0.1', function(){
//   console.log("listening to port 3000!")
// })

=======
app.listen(3000, function () {
  console.log("Connected to port : 3000!")
})
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
