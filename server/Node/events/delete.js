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

const remove = (req, res) => {
  let test = async function() {
    let events = await event.deleteEvent(req.params.id);
    console.log("events : ", events);
    res.status(200).send("events deleted!");
  };
  test();
};

module.exports = { remove };
