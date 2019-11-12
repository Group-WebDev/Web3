const express = require('express')
const app = express();
const path = require("path");
const account = require("./account");
const subscriber = require("./subscriber");
const bodyParser = require('body-parser')

var mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/accounts', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

var db = mongoose.connection;

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected")
});

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
      res.send(exist)
    }
  }
  test();
})

app.post('/register', function (req, res) {
  let test = async function () {
    console.log(req.headers.username)
    const exist = await account.getByUsername(req.headers.username);
    if (exist == null) {
      let data = {
        username: req.headers.username,
        email : req.headers.email,
        password: req.headers.password
      }
      await account.addPerson(data);
      let item = await account.getLastAccount();
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


app.listen(3001, function () {
  console.log("Connected to port : 3000!")
})