const pool = require("../db");


// Asks the database for all locations and returns them.
exports.getLocations = async (req, res) => {
  
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM locations;");
    

    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.sqlMessage });
  } finally {
    if (conn) conn.release();
  }

};

//Create a new location on the database.
exports.createLocation = async (req, res) => {
  const { name } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("INSERT INTO locations (name) VALUES (?)", [name]);



    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.sqlMessage });
  } finally {
    if (conn) conn.release();
  }
}
