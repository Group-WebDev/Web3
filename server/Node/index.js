const express = require('express')
const app = express();
const path = require("path");
const account = require("./models/admin");
const subscriber = require("./models/subscriber");
const event = require("./models/event");
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
const mongoose = require('mongoose');
const config = require('./config')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/accounts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected")
});
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res, next) {
  let token = req.headers.token
  console.log(req.headers.token)
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
        res.status(200).json({
          message : "Auth token is valid"
        })
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
})


app.get('/login', function (req, res) {
  let test = async function () {
    console.log(req.headers.username)
    const exist = await account.getByUsernameAndGetPassword(req.headers.username);
    if (exist == null) {
      res.status(401).json({
        message: "Validation failed. Given username and password aren't matching."
      })
    } else {
      if (bcrypt.compareSync(password, exist[0].password)) {
        var token = jwt.sign({
          exist
        }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        })
        res.status(200).json({
          success: true,
          token: token,
        })
      }
      else {
        res.status(401).json({
          message: "Validation failed. Given username and password aren't matching."
        })
      }
    }
  }
  test();
})

app.post('/register', function (req, res) {
  const hash = bcrypt.hashSync(req.headers.password, saltRounds);
  let test = async function () {
    const exist = await account.getByUsername(req.headers.username);
    console.log("username", exist)
    if (exist == null) {
      let data = {
        username: req.headers.username,
        email: req.headers.email,
        password: hash
      }
      await account.addPerson(data);
      let item = await account.getLastAccount();
      res.status(200).send(item)
    } else {
      res.status(401).json({
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

    } else {
      res.json({
        message: 'Username already exist!'
      })
    }
  }
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
    }
    await event.addEvent(data);
    let item = await event.getLastEvent();
    res.send(item)
  }
  test();
})

app.listen(3000, function () {
  console.log("Connected to port : 3000!")
})
