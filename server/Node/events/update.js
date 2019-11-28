const bodyParser = require("body-parser");
const event = require("../models/event");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const update = (req, res) => {
  let test = async function() {
    var data = {
      title: req.body.newTitle,
      dateCreated: req.body.newdateCreated,
      dateEvent: req.body.newdateEvent,
      address: req.body.newaddress,
      description: req.body.newdescription,
      createdBy: req.body.newcreatedBy
    };
    let events = await event.updateEvent(data);
    console.log("events : ", events);
    res.status(200).send("event updated!");
  };
  test();
};

module.exports = { update };
