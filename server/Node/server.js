const express = require('express')
const app = express();
const path = require("path");
const account = require("./account");
const subscriber = require("./subscriber");
const bodyParser = require('body-parser');
var port = 3000;

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
// app.use(cors())
app.post('/login',(req,res)=>{
    var data = req.body
    console.log(data)
    let test = async function () {
        console.log(data.username)
        const exist = await account.getAccount(data.username, data.password);
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

app.listen(port,function(){
    console.log("listening to port " + port + "!")
})
