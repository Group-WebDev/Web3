const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type: String, required: true},
    password: {type: String, required: true}
 });

 Schema.statics.addPerson = async function (account){
    var Accounts = new this(account);
    var result =  await Accounts.save(account);
    return result;
 }
 
 Schema.statics.getLastAccount = async function() {
    return await this.find().sort({_id:-1}).limit(1);
 }
 
 Schema.statics.getByUsername = async function(username) {
    return await this.find({"username" : username});
 }
 
 Schema.statics.getAccount = async function(username, password) {
    return await this.find({"username" : username, "password": password});
 }

 module.exports = mongoose.model('account', Schema);