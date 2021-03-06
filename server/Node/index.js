const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const login = require('./admin/login');
const verify = require('./admin/verifyToken');
const createAdmin = require('./admin/createAdmin');
// const subscribe = require('./subscriber/subscribe');
const create  = require('./events/create');
const retrieveAll = require('./events/retrieveAll');
const retrieveByTitle = require('./events/retrieveByTitle')
const remove = require('./events/delete');
const update = require('./events/update');
const retrieveSubscriber = require('./subscriber/retrieveSubscribers')
const sgMail = require('@sendgrid/mail');
const subscriber = require("./models/subscriber");
const bodyParser = require('body-parser')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://localhost:27017/Users', {
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

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain)
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


const checkToken = (req, res, next) => {
  console.log(req.headers)
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;
      next();
  } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
  }
}

app.get('/', checkToken, function (req, res) {
  verify.verifyToken(req, res);
})
app.post('/admin', (req, res) => {
  createAdmin.create(req, res);
})
app.post('/admin/login', function (req, res) {
  login.login(req, res);
})

app.post('/subscribe', function (req, res) {
  sgMail.setApiKey('');
    const msg = {
      to: 'johnpatrick.cabia-an@student.passerellesnumeriques.org',
      from: req.body.email,
      subject: 'Subscribers of Revolution',
      text: req.body.address,
      html: `<strong>Joined The Revolution<br>First Name: ${req.body.firstname},<br>Last Name ${req.body.lastname},<br>Middle Name: ${req.body.middlename}, <br> Address: ${req.body.address}</strong>`,
    };
  response = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    middlename: req.body.middlename,
    email: req.body.email,
    address: req.body.address
  }
  let test = async function () {

    const exist = await subscriber.getByUsername(req.body.email);
    if (exist == null) {
      let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
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

app.get('/subscribers/retrieveAll', function(req, res){
  retrieveSubscriber.retrieveSubscribers(req, res)
})

app.post('/event/create', (req, res) => {
  create.createEvent(req, res);
})
app.get('/event/retrieveAll', (req, res) => {
  retrieveAll.retrieve(req, res);
})
app.get('/event/retrievebytitle', (req, res) => {
  retrieveByTitle.retrieve(req, res);
})
app.delete('/event/delete', (req, res) => {
  remove.remove(req, res);
})
app.put('/event/update', (req, res) => {
  update.update(req, res);
})


app.listen(5000, function () {
  console.log("Connected to port : 3000!")
})
