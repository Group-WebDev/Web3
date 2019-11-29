const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    title: {type:String, required : true},
    dateCreated: {type: String, required : true},
    dateEvent: {type: String, required : true},
    address: {type: String, required : true},
    description: {type: String, required : true},
    createdBy: {type: String, required : true},
    image :{type: String, required: false}
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
   return await this.find().sort({"_id":-1})
 }

 Schema.statics.getEvent = async function(id) {
   return await this.findOne({"_id" : id});
}


// collection.update({_id:"123"}, {$set: {author:"Jessica"}});
// data.title,data.description,data.dateEvent,data.address
 Schema.statics.updateEvent = async function(id,title,description,dateEvent,address) {
      //  var updateEvent = new this(newEvent);
return await this.updateOne({"_id" : id},{$set: {title: title, description:description,
   dateEvent:dateEvent,address: address}});
}

 Schema.statics.deleteEvent = async function(id) {
   return await this.deleteOne({"_id" : id});
}
 
 module.exports = mongoose.model('event', Schema);
