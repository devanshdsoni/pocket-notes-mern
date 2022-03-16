const jwt = require("jsonwebtoken");
const User = require("../modals/Users");

const jwtSecret = process.env.JWT_SECRET;

const fetchuser = async (req, res, next) => {
  try {
    const authToken = req.header("auth-token");
    if (!authToken) {
      res.status(401).json({ success: false, msg: "Unauthorized aceess!" });
    }
    jwtData = jwt.verify(authToken, jwtSecret);

    const user = await User.findById(jwtData.user.id);
    if (!user) {
      return res.status(401).json({ success: false, msg: "User not exists" });
    }
    req.user = jwtData.user; // Set req parameter to jwtData
    next();
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error!", error });
  }
};

module.exports = fetchuser;
