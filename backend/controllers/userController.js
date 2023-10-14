const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameIsBabithPoojary";

// this inserts the data of the user in the user_collection (collection) in the my_database (database)
const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  let setPassword = await bcrypt.hash(req.body.password, salt);
  try {
    let data = req.body;
    if (Object.keys(data) == 0) {
      return res.status(400).send({ status: false, msg: "no data provided" });
    }
    let saveData = await userModel.create({
      name: req.body.name,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      email_id: req.body.email_id,
      password: setPassword,
      profile_pic: req.body.profile_pic,
    });
    return res.status(201).send({ status: true, msg: "data insert success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "error" });
  }
};

module.exports = {
  createUser,
};
