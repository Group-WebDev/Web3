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
  let test = async function () {
    const adminExist = await account.getByUsername("admin");
    console.log("username", adminExist);
    if (adminExist == null) {
      var admin = {
        username: "admin",
        email: "johnpatrick.cabia-an@student.passerellesnumeriques.org",
        password: bcrypt.hashSync("G0-ec0@dm1n", 10)
      };
      await account.addPerson(admin);
      let item = await account.getLastAccount();
      console.log(item)
    } 
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
            console.log("token send")
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
