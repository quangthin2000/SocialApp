const jwt = require("jsonwebtoken");

function verify(req, res) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
      req.user = user;
      return res.status(200).json({
          user:user
      })
    });
  } else {
    return res.json({
      status:456,
      error:"Bạn không có quyền truy cập"
    });
  }
}

module.exports = verify;
