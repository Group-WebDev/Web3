const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
  title: { type: String, required: true },
  dateCreated: { type: String, required: true },
  dateEvent: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String, required: true }
});

Schema.statics.addEvent = async function(event) {
  var Events = new this(event);
  var result = await Events.save(event);
  return result;
};

Schema.statics.getLastEvent = async function() {
  return await this.findOne()
    .sort({ _id: -1 })
    .limit(1);
};

Schema.statics.retrieveEvents = async function() {
  return await this.find();
};

Schema.statics.getEvent = async function(title) {
  return await this.findOne({ title: title });
};

Schema.statics.updateEvent = async function(
  id,
  title,
  description,
  dateEvent,
  address
) {
  return await updateEvent.updateOne({ "_id": id }, { $set: { "title" : title, "description" : description, "dateEvent" : dateEvent, "address" : address } });
};

Schema.statics.deleteEvent = async function(id) {
  return await this.deleteOne({ _id: id });
};

module.exports = mongoose.model("event", Schema);