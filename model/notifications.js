const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  type: String,
  read: Boolean,
  recipient: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  sender: String,
  userImage: String,
  screamId: String
});

module.exports = mongoose.model("notification", NotificationSchema);
