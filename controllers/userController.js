const pool = require("../db");
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hash = createHash("sha256", process.env.HASH_STRING).update(password).digest("base64");

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hash]);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.sqlMessage });
  } finally {
    if (conn) conn.release();
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send({ error: "Missing fields" });

  const hash = createHash("sha256", process.env.HASH_STRING).update(password).digest("base64");

  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, hash]
    );
    if (rows.length === 0) return res.status(401).send({ error: "Invalid username or password" });

    const user = rows[0];

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.send({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "DB error" });
  } finally {
    if (conn) conn.release();
  }
};
