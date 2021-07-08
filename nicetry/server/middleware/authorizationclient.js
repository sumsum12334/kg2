  
const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if not token
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const payload = jwt.verify(token, process.env.jwtSecret1);
    req.user = payload.user;
    next();
  } catch (err) {
    res.status(401).json("false");
    
    next();
  }
};