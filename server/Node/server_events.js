const express = require('express')
const app = express();
const path = require("path");
const account = require("./account");
const subscriber = require("./subscriber");
const event = require("./event");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

var port=3001;

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


app.listen(port, function () {
  console.log("done!")
})
