const express = require("express");
const router = express.Router();
const Notification = require("../../model/notifications");
router.get("/", async (req, res) => {
  console.log(req.headers);
  try {
    const resData = await Notification.find({
      recipient: req.headers.handle
    }).sort({ _id: -1 });
    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/test", async (req, res) => {
  await Notification.deleteMany({});
  return res.send("emvuidi");
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
router.delete("/:screamId/:handle", async (req, res) => {
  try {
    console.log(req.params.screamId, req.params.handle);
    const resData = await Notification.findOneAndDelete({
      screamId: req.params.screamId,
      sender: req.params.handle
    });
    console.log(resData);
    res.json(resData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
