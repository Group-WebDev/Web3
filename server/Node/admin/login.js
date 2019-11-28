const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const config = require("../config");
const account = require("../models/admin");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const login = (req, res) => {
  console.log(req.body)
  let test = async function() {
    const exist = await account.getByUsernameAndGetPassword(req.body.data.username);
    if (exist == null) {
      res.status(401).json({
        success: false,
        message:
          "Validation failed. Given username and password aren't matching."
      });
    } else {
      if (bcrypt.compareSync(req.body.data.password, exist.password)) {
        const admin = await account.getAccount(req.body.data.username)
        console.log(admin)
        jwt.sign(
          { 
            admin
           },
          config.secret,
          {
            expiresIn: 86400 // expires in 24 hours
          },
          (error, token) => {
            if (error) {
              res.json({
                error: error,
                data: null
              });
            }
            console.log("token")
            res.send({ auth: true, token: token, user: admin })
          }
        );
      }
      else {
        res.status(401).json({
          success: false,
          message:
            "Validation failed. Given username and password aren't matching."
        });
      }
    }
  };
  test();
};

module.exports = { login };