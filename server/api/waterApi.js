const express = require("express");
const waterCollection = require("../models/waterModel");
const {
  fetchWaterStorageCapacity,
  updateWaterStorageCurrentCapacity,
} = require("./sharedUtils");
const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello, Welcome to Water API" });
});

router.post("/updateWaterStorageCapacity", async (req, res) => {
  const { quantity } = req.body;
  if (quantity > 100000) {
    res
      .status(400)
      .json({ success: false, error: "Water more than storage capacity" });
  } else {
    try {
      let model = {
        totalCapacity: req.body.quantity,
        currentCapacity: req.body.quantity,
      };

      const data = await updateWaterStorageCurrentCapacity(model);
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  }
});

router.post("/getWaterTotalStorageCapacity", async (req, res) => {
  try {
    const recentWaterTotalCapacity = await fetchWaterStorageCapacity();

    if (!recentWaterTotalCapacity) {
      res.status(500).json({
        success: false,
        error: "No Records Found",
      });
    } else {
      res.status(200).json({
        success: true,
        data: recentWaterTotalCapacity,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;
