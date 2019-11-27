const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    firstname: {type:String},
    lastname:{type:String},
    middlename:{type:String},
    email: {type: String, unique:true},
    address: {type: String}
 });

 Schema.statics.addSubscriber = async function (subscriber){
    var Subscriber = new this(subscriber);
    var result =  await Subscriber.save(subscriber);
    console.log(result);
    return result;
 }
 
 Schema.statics.getLastSubscriber = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }

 Schema.statics.retrieveSubscriber = async function(){
     return await this.find()
 }
 
 Schema.statics.getByUsername = async function(email) {
    return await this.findOne({"email" : email});
 }

 module.exports = mongoose.model('subscriber', Schema);