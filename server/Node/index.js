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
  console.log("we're connected!")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/admin/login', function (req, res) {
  let test = async function () {
    console.log(req.body.username)
    const exist = await account.getAccount(req.body.username, req.body.password);
    if (exist == null) {
      res.json({
        message: 'Username not found or invalid password!'
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

// CREATE/ADD NEW EVENT
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
    }
    await event.addEvent(data);
    let item = await event.getLastEvent();
    res.send(item)
  }

  test();
})
// EVENTS API
// DISPLAY ALL SAVED EVENTS.
app.get('/event/retrieveAll', (req, res) => {
  let test = async function () {
    let events = await event.retrieveEvents();
    console.log("events : ", events)
    res.status(200).send(events);
  }
  test();
})

// DISPLAY ONLY THE DESIRED EVENT BY USING ITS TITLE
app.get('/event/retrievebytitle', (req, res) => {
  console.log("title : ",req.headers.title)
  let test = async function () {
    let events = await event.getEvent(req.headers.title);
    console.log("events : ", events)
    res.status(200).send(events);
  }
  test();
})

// DELETE AN SPECIFIC EVENT BY USING ITS TITLE
app.delete('/event/delete', (req, res) => {
  let test = async function () {
    let events = await event.deleteEvent(req.body.title);
    console.log("events : ", events)
    res.status(200).send("events deleted!");
  }
  test();
})

app.put('/event/update', (req, res) => {
    let test = async function () {
        var data = {
            newTitle : req.body.newTitle,
            newdateCreated: req.body.newdateCreated,
            newdateEvent: req.body.newdateEvent,
            newaddress: req.body.newaddress,
            newdescription: req.body.newdescription,
            newcreatedBy: req.body.newcreatedBy
        }
      let events = await event.updateEvent(data);
      console.log("events : ", events)
      res.status(200).send("event updated!");
    }
    test();
  })

// SUBSCRIBERS API

// ADD NEW SUBSCRIBER
app.post('/subscribe', function (req, res) {
  let test = async function () {
    const exist = await subscriber.getByUsername(req.headers.username);
    if (exist == null) {
      let data = {
        username: req.headers.username,
        email: req.headers.email,
        address: req.headers.address,
        event : req.headers.event
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

// DELETE SUBSCRIBER
app.delete('/subscriber/delete', (req, res) => {
  let test = async function () {
    let subscribers= await subscriber.deleteSubscriber(req.body.username);
    res.status(200).send("subscriber deleted!");
    console.log("subscribers : ", subscribers)

  }
  test();
})

// DISPLAY ALL SUBSCRIBERS
app.get('/subscribers/list',(req,res)=>{
  let test = async function(){
    let subscribers  = await subscriber.listOfSubscribers()
    console.log(subscribers)
    res.status(200).send(subscribers)
  }
  test();
})


app.listen(3000, function () {
  console.log("done!")
})


