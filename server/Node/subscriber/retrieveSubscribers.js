const subscriber = require("../models/subscriber");

const retrieveSubscribers = (req, res)=>{
    let test = async function() {
        let subscribe = await subscriber.retrieveSubscriber();
        console.log("subscriber : ", subscribe);
        res.status(200).send(subscribe);
      };
      test();
    };
    
    module.exports = { retrieveSubscribers };
