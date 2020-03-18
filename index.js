require("dotenv").config();
const express = require("express");
const cors = require("cors");
const notificationsSocket = require("./socket/notificationSocket");
const app = express();
const notisRouter = require("./router/api/notification");
const connectDB = require("./config/mongoDB");

connectDB();

app.use(express.json());
app.use(cors());
app.use("/notifications", notisRouter);
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log("emvuidi");
});
notificationsSocket.init(server);
