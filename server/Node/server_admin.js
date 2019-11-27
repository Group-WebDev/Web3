const express = require('express')
const app = express();
const path = require("path");
const event = require("./event.js");
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 3000

const mongoose = require('mongoose');

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



var admin = "admin";
var pass = "Irish4Rsdf#";

app.get('/admin/login',(req, res)=>{
    if(
        req.body.data.username == admin &&
        req.body.data.password == pass
    ){
        res.status(200).send('proceed')
    }
})

app.listen(port, function () {
  console.log("done!")
})
