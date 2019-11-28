const event = require("../models/event");

const retrieve = (req, res) => {
  let test = async function() {
    let events = await event.retrieveEvents();
    res.status(200).send(events);
  };
  test();
};

module.exports = { retrieve };
