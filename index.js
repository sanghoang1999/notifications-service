require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const notificationsSocket = require("./socket/notificationSocket");
const app = express();
app.use(cors());
const notisRouter = require("./router/api/notification");
const connectDB = require("./config/mongoDB");

connectDB();

app.use(express.json());
app.use("/notifications", notisRouter);
app.get("/cc", (req, res) => {
  res.send("emvuidi");
});
const PORT = process.env.PORT || 4600;
const server = app.listen(PORT, () => {
  console.log("emvuidi");
});
notificationsSocket.init(server);
