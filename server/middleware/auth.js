const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; //Authorization: Bear dsadioe1n2eknkol1 => split: -> dsadioe1n2eknkol1
  //&&: ko có authhearder => authheader, có authheader => lấy cái sau dấu &&

  if (!token)
    return res
      .status(400)
      .json({ success: false, message: "Access token not found" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = verifyToken;
