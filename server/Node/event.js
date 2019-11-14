const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    title: {type:String, required:true},
    dateCreated: {type: String, required: true},
    dateEvent: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String, required: true},
    createdBy: {type: String, required: true},
 });

 Schema.statics.addEvent = async function (event){
    var Events = new this(event);
    var result =  await Events.save(event);
    return result;
 }
 
 Schema.statics.getLastEvent = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }

 module.exports = mongoose.model('event', Schema);
