const mongo = require('mongodb')
var mongoose = require('mongoose');
const MongoClient = mongo.MongoClient
const uri = "mongodb+srv://webdev:<password>@cluster0-p8mfa.mongodb.net/test?retryWrites=true&w=majority"
var client;
var mongoClient = new MongoClient(uri, { reconnectTries : 
Number.MAX_VALUE, autoReconnect : true, useNewUrlParser : true }) 
mongoClient.connect((err, db) => { // returns db connection
  const collection = client.db("User").collection("accounts");
  if (err != null) {
    console.log(err)
    return
  }
  client = db
})

var userSchema = new mongoose.Schema({
    event:{type:String,required:true,},
    address:{type:String, required:true},
    description:{type:String, required:true},
    category:{type:String, required:true},
    file:{type:Blob,required:true}
})
var User = mongoose.model('User', userSchema)
module.exports = User