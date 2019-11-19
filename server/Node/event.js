const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    title: {type:String},
    dateCreated: {type: String},
    dateEvent: {type: String},
    address: {type: String},
    description: {type: String},
    createdBy: {type: String},
 });

 Schema.statics.addEvent = async function (event){
    var Events = new this(event);
    var result =  await Events.save(event);
    return result;
 }
 
 Schema.statics.getLastEvent = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }

 Schema.statics.retrieveEvents = async function(){
   return await this.find()
 }

 Schema.statics.getEvent = async function(title) {
   return await this.findOne({"title" : title});
}

 Schema.statics.updateEvent = async function(newEvent) {
       var updateEvent = new this(newEvent);
   return await updateEvent.updateOne(newEvent);
}
 


 Schema.statics.deleteEvent = async function(title) {
   return await this.deleteOne({"title" : title});
}
 
 module.exports = mongoose.model('event', Schema);
