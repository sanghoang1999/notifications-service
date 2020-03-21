const express = require("express");
const router = express.Router();
const Notification = require("../../model/notifications");
router.get("/", async (req, res) => {
  try {
    const resData = await Notification.find({
      recipient: req.headers.handle,
      read: false
    }).sort({ createAt: -1 });
    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const notiIds = req.body;
    const resData = await Notification.updateMany(
      { _id: { $in: notiIds } },
      { $set: { read: true } }
    );
    res.json({ msg: "Update successfully" });
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
