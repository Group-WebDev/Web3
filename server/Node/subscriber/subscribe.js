const express = require("express");
const app = express();
const sgMail = require("@sendgrid/mail");
const bodyParser = require("body-parser");
const subscriber = require("../models/subscriber");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const subscribe = (req, res) => {
  sgMail.setApiKey('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');
  const msg = {
    to: "johnpatrick.cabia-an@student.passerellesnumeriques.org",
    from: req.body.email,
    subject: "Sending with Twilio SendGrid is Fun",
    text: req.body.address,
    html: `<strong> ${req.body.username} From ${req.body.address}Joined The Revolution</strong>`
  };

  let test = async function() {
    const exist = await subscriber.getByUsername(req.body.username);
    if (exist == null) {
      let data = {
        username: req.body.username,
        email: req.body.email,
        address: req.body.address
      };
      await subscriber.addSubscriber(data);
      let item = await subscriber.getLastSubscriber();
      res.send(item);
    } else {
      res.json({
        message: "Username already exist!"
      });
    }
  };
  sgMail.send(msg);
  test();
};

module.exports = { subscribe };
