const account = require("../models/admin");
const bcrypt = require("bcryptjs");

const create = (req, res) => {
  let test = async function() {
    const exist = await account.getByUsername("admin");
    console.log("username", exist);
    if (exist == null) {
      var admin = {
        username: "admin",
        email: "johnpatrick.cabia-an@student.passerellesnumeriques.org",
        password: bcrypt.hashSync("G0-ec0@dm1n", 10)
      };
      await account.addPerson(admin);
      let item = await account.getLastAccount();
      res.status(200).send(item);
    } else {
      res.status(401).json({
        message: "Username already exist!"
      });
    }
  };

  test();
};

module.exports = { create };