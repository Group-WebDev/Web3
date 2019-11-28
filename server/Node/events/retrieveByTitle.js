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

const retrieve = (req, res) => {
  let test = async function() {
    let events = await event.getEvent(req.body.title);
    res.status(200).send(events);
  };
  test();
};

module.exports = { retrieve };
