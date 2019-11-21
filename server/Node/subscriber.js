const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    username: {type:String, unique:true},
    email: {type: String},
    address: {type: String},
    event:{type:String}
 });

 Schema.statics.addSubscriber = async function (subscriber){
    var Subscriber = new this(subscriber);
    var result =  await Subscriber.save(subscriber);
    return result;
 }
 
 Schema.statics.getLastSubscriber = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }
 
 Schema.statics.getByUsername = async function(username) {
    return await this.findOne({"username" : username});
 }

 Schema.statics.deleteSubscriber = async function(username){
     return await this.deleteOne({"username" : username})
 }

 Schema.statics.listOfSubscribers = async function(){
     return await this.find();
 }

 module.exports = mongoose.model('subscriber', Schema);