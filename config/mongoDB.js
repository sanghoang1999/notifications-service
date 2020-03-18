const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true
    });
    console.log("MongoDB Conneted...");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
