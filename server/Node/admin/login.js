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
  let test = async function() {
    const exist = await account.getByUsernameAndGetPassword(req.body.username);
    if (exist == null) {
      res.status(401).json({
        success: false,
        message:
          "Validation failed. Given username and password aren't matching."
      });
    } else {
      if (bcrypt.compareSync(req.body.password, exist.password)) {
        const data = await account.getAccount(req.body.username)
        jwt.sign(
          { 
            data
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
            res.json({
              error: null,
              token: token
            });
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
