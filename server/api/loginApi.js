const express = require("express");
const router = express.Router();
const logincollection = require("../models/loginModel");
const constants = require("../lib/constants");

// Define API routes

router.post("/authenticateUser", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({ success: false, error: "Invalid credentials" });
  } else {
    try {
      const user = await logincollection.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      res.status(200).json({
        success: true,
        data: {
          jwtToken: constants.jwtToken,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
});

module.exports = router;
