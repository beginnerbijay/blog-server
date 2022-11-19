const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = require("../model/user");

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const salt = await bycrypt.genSalt(10);
    user.password = await bycrypt.hash(user.password, salt);
    const token = jwt.sign({_id:user._id},process.env.PRIVATE_KEY,{expiresIn:"30 days"})
    user.token = token
    const client = await user.save();
    if (client) {
      res.send(client);
    } else {
      res.send("signup fail at server");
    }
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const client = await User.findOne({ name });
    if (client) {
      const valid = await bycrypt.compare(password, client.password);
      if (valid) {
        const token = jwt.sign({_id:client._id},process.env.PRIVATE_KEY,{expiresIn:"30 days"})
    client.token = token
        res.send(client);
      } else {
        res.send("not valid");
      }
    } else {
      res.send("user invalid");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
