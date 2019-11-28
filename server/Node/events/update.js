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
    let events = await event.updateEvent(
      req.params.id,
      req.body.data.title,
      req.body.data.description,
      req.body.data.dateEvent,
      req.body.data.address
    );
    let events = await event.retrieveEvents();
    res.status(200).send(events);
    console.log(events)
  };
  test();
};

module.exports = { update };
