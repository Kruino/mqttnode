// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).send({ error: "Token missing" });

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
