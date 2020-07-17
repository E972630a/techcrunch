const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validation");

router.post("/register", async (req, res) => {
  // Validating the data before makigna  user
  const { error } = registerValidation(req.body);
  // Parses error when doesnt hit requirement
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10); // Sets complexity of the hash
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // body parser
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    // Saves and posts users JSON information in postman
    const savedUser = await user.save();
    // only sends back user with the ID
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send("password is incorrect");
  }

  //   Checking if the email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email is not found");
  }

  //   Checking if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("password is incorrect");
  }

  //   create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = router;
