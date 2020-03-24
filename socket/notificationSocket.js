const socket = require("socket.io");
var socketioJwt = require("socketio-jwt");
const Notification = require("../model/notifications");
let sockets = {};

sockets.init = function(server) {
  let io = socket.listen(server).of("/socket/notifications");
  io.use(
    socketioJwt.authorize({
      secret: "emvuidi",
      handshake: true
    })
  );

  io.on("connection", socket => {
    console.log("connected " + socket.decoded_token.handle);
    const { handle, imageUrl } = socket.decoded_token;
    socket.join(socket.decoded_token.handle);
    socket.id = socket.decoded_token.handle;
    socket.on("like", async (recipient, screamId) => {
      console.log(recipient, screamId);
      if (recipient !== handle) {
        try {
          const Notis = new Notification({
            type: "like",
            read: false,
            recipient: recipient,
            sender: handle,
            userImage: imageUrl,
            screamId: screamId
          });
          const resData = await Notis.save();
          console.log(resData);
          io.to(recipient).emit("notification_like", resData);
        } catch (err) {
          console.log(err);
        }
      }
    });
    socket.on("comment", async (recipient, screamId) => {
      console.log(recipient, screamId);
      if (recipient !== handle) {
        try {
          const Notis = new Notification({
            type: "comment",
            read: false,
            recipient: recipient,
            sender: handle,
            userImage: imageUrl,
            screamId: screamId
          });
          Notis.notificationId = Notis._id;
          const resData = await Notis.save();

          console.log(resData);
          io.to(recipient).emit("notification_comment", resData);
        } catch (err) {
          console.log(err);
        }
      }
    });
  });
};
module.exports = sockets;
