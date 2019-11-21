const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
<<<<<<< HEAD
    username: {type:String, required:true, unique:true},
    email: {type: String, required: true},
    address: {type: String, required: true}
=======
    username: {type:String,  unique:true},
    email: {type: String},
    address: {type: String}
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
 });

 Schema.statics.addSubscriber = async function (subscriber){
    var Subscriber = new this(subscriber);
    var result =  await Subscriber.save(subscriber);
<<<<<<< HEAD
=======
    console.log(result);
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
    return result;
 }
 
 Schema.statics.getLastSubscriber = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }
 
 Schema.statics.getByUsername = async function(username) {
    return await this.findOne({"username" : username});
 }

 module.exports = mongoose.model('subscriber', Schema);