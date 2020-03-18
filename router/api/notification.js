const express = require("express");
const router = express.Router();
const Auth = require("../../util/Auth");
const Notification = require("../../model/notifications");
router.get("/", async (req, res) => {
  try {
    const resData = await Notification.find({
      recipient: "khue"
    }).sort({ createAt: -1 });
    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.put("/:notis_id", async (req, res) => {
  try {
    const resData = await Notification.findOneAndUpdate(
      { _id: req.params.notis_id },
      { $set: { read: true } },
      { new: true }
    );
    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.delete("/:notis_id", async (req, res) => {
  try {
    const resData = await Notification.findOneAndDelete({
      _id: req.params.notis_id
    });
    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
