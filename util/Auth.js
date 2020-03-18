const jwt = require("jsonwebtoken");
const axios = require("axios");
module.exports = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const token = req.headers.authorization.split("Bearer ")[1];
    try {
      req.user = {};
      const decoded = jwt.verify(token, process.env.jwtSecret);
      axios.defaults.headers.handle = decoded.handle;
      axios.defaults.headers.imageur = decoded.imageurl;
      return next();
    } catch (error) {
      console.log(error);
      if ((error.code = "auth/id-token-expired")) {
        return res.status("500").json({ errors: { msg: "Token expired" } });
      }
      return res.status("500").json("Server Error");
    }
  } else {
    return res.status(403).json({ errors: "Unauthorized" });
  }
};
