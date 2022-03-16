const express = require("express");
const router = express.Router();
const User = require("../modals/Users");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

//Route 01 - Create a new user, using POST - /api/auth/createuser --- No Login required
router.post(
  "/createuser",
  [body("name", "Minimum length for name is - 3!").isLength({ min: 3 }), body("email", "Invalid Email!").isEmail(), body("password", "Minimum Length is - 8").isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });
    }
    try {
      // Generate salt and Hash of password using BcryptJS
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // User(req.body).save()  //------> 1st way to save user in DB
      let user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const jwtData = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(jwtData, jwtSecret);
      res.json({ success: true, msg: "Account Created Successfully :)", authToken });
    } catch (error) {
      return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
    }
  }
);

//Route 02 - Login using details, using POST - /api/auth/login --- No Login required
router.post("/login", [body("email", "Invalid Email!").isEmail(), body("password", "Password can not be blanked!").exists()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: "Invalid Details!", errors: errors.array() });
  }
  try {
    // Find req.email in database
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ success: false, msg: "This Email is not registered!" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ success: false, msg: "Invalid Email or Password!" });
    }

    const jwtData = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(jwtData, jwtSecret);
    res.json({ success: true, msg: "Login Successful :)", authToken });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});

//Route 03 - Get User details, using POST - /api/auth/getuser --- Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, msg: "This Email is not registered!" });
    }
    res.json({ success: true, msg: "User Fetched !", user });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
});
module.exports = router;
