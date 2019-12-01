const bodyParser = require('body-parser')
const event = require("../models/event");
const express = require('express')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var id = "TheoPatrickBurceEpinAndIrish";
var dates;
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

var currentDate = function() {
  var d = new Date();
  var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear();
  dates =
    day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year;
};

const createEvent = (req, res) => {
  d = req.body.data;
  currentDate();
  let test = async function() {
    let data = {
      title: d.title,
      dateCreated: dates,
      dateEvent: d.dateevent,
      url : req.file.filename,
      address: d.address,
      description: d.description,
      createdBy: id
    };
    await event.addEvent(data);
    let item = await event.getLastEvent();
    console.log(item);
    res.status(200).send(item);
  };
  test();
};

module.exports = {createEvent}