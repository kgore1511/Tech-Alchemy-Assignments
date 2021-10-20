const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/userModel");
const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email already exists" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password should be atleast 6 characters long" });

      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      await newUser.save();
      const accessToken = createAccessToken({ id: newUser._id });

      res.cookie("accesstoken", accessToken, {
        httpOnly: true,
        path: "/user/access_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accessToken });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) res.status(400).json({ msg: "user doesn't exists" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });
      const accesstoken = createAccessToken({ id: user._id });
      res.cookie("accesstoken", accesstoken, {
        httpOnly: true,
        path: "/user/access_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ accesstoken: accesstoken });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    res.cookie("accesstoken", "", {
      httpOnly: true,
      path: "/user/access_token",
      maxAge: 1,
    });
    res.send("Logout");
  },
};

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
module.exports = userController;
