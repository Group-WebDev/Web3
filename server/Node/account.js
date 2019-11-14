const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
 });

 Schema.statics.addPerson = async function (account){
    var Accounts = new this(account);
    var result =  await Accounts.save(account);
    return result;
 }
 
 Schema.statics.getLastAccount = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }
 
 Schema.statics.getByUsername = async function(username) {
    return await this.findOne({"username" : username});
 }
 
 Schema.statics.getAccount = async function(username, password) {
    return await this.findOne({"username" : username, "password": password});
 }

 module.exports = mongoose.model('account', Schema);