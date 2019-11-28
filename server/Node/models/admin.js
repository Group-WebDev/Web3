const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
 });

 Schema.statics.addPerson = async function (admin){
    var Admin = new this(admin);
    var result =  await Admin.save(admin);
    return result;
 }
 
 Schema.statics.getLastAccount = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }

 Schema.statics.getByUsernameAndGetPassword = async function(username) {
   return await this.findOne({"username" : username}, {_id:0, password:1});
}

 Schema.statics.getByUsername = async function(username) {
    return await this.findOne({"username" : username});
 }
 
 Schema.statics.getAccount = async function(username) {
    return await this.findOne({"username" : username});
 }

 module.exports = mongoose.model('admin', Schema);