const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
<<<<<<< HEAD
    title: {type:String},
    dateCreated: {type: String},
    dateEvent: {type: String},
    address: {type: String},
    description: {type: String},
    createdBy: {type: String},
=======
    title: {type:String, required:true},
    dateCreated: {type: String, required: true},
    dateEvent: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    createdBy: {type: String, required: true},
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
 });

 Schema.statics.addEvent = async function (event){
    var Events = new this(event);
    var result =  await Events.save(event);
    return result;
 }
 
 Schema.statics.getLastEvent = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }

<<<<<<< HEAD
 Schema.statics.retrieveEvents = async function(){
   return await this.find()
 }

 Schema.statics.getEvent = async function(title) {
   return await this.findOne({"title" : title});
}

// collection.update({_id:"123"}, {$set: {author:"Jessica"}});
 Schema.statics.updateEvent = async function(title,newEvent) {
       var updateEvent = new this(newEvent);
return await updateEvent.updateOne({"title" : title},{$set: {newEvent}});
}

 Schema.statics.deleteEvent = async function(title) {
   return await this.deleteOne({"title" : title});
}
 
 module.exports = mongoose.model('event', Schema);
=======
 module.exports = mongoose.model('event', Schema);
>>>>>>> 47aa3d6ece35d4ae36d9227c1468941e1d929ecb
