const pool = require("../db");
const { createHash } = require("crypto");
const jwt = require("jsonwebtoken");

async function getDevice(conn, deviceID) {
  const hash = createHash("sha256", process.env.HASH_STRING).update(deviceID).digest("base64");
   const rows = await conn.query(
      "SELECT * FROM devices WHERE deviceID = ?",
      [hash]
    );

  return rows[0];
}

async function checkDevice(deviceID) {
  let conn;
  try {
    conn = await pool.getConnection();

  const hash = createHash("sha256", process.env.HASH_STRING).update(deviceID).digest("base64");

    const rows = await conn.query(
      "SELECT * FROM devices WHERE deviceID = ?",
      [hash]
    );
    if (rows.length === 0) return false;
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}

async function unverifyDevice(req, res) {
  let conn;
  try {
    const { DeviceID } = req.body;

    conn = await pool.getConnection();

    const hash = createHash("sha256", process.env.HASH_STRING).update(DeviceID).digest("base64");

    const result = await conn.query(
      "UPDATE devices SET verified = 0 WHERE deviceID = ?",
      [hash]
    );

    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.sqlMessage});
  } finally {
    if (conn) conn.release();
  }
}

async function verifyDevice(req, res) {
  let conn;
  try {
    const { DeviceID } = req.body;

    conn = await pool.getConnection();

    const hash = createHash("sha256", process.env.HASH_STRING).update(DeviceID).digest("base64");

    const rows = await conn.query(
      "SELECT * FROM devices WHERE deviceID = ?",
      [hash]
    );
    if (rows.length === 0) return res.status(401).send({ error: "Device Not allowed" });

    var row = rows[0];
    const token = jwt.sign({ id: row.id, DeviceID: row.deviceID }, process.env.SECRET_KEY, { expiresIn: "25h" });
    res.send({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "DB error" });
  } finally {
    if (conn) conn.release();
  }
}


async function addDevice(req, res) {
  const { DeviceID, LocationID } = req.body;
  if (!DeviceID) return res.status(400).send({ error: "DeviceID missing" });

  let conn;
  try {
    conn = await pool.getConnection();

    const hash = createHash("sha256", process.env.HASH_STRING).update(DeviceID).digest("base64");
    await conn.query(`INSERT INTO devices (deviceID, verified) 
       VALUES (?, 1)
       ON DUPLICATE KEY UPDATE verified = 1`, [hash, LocationID]);
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.sqlMessage });
  } finally {
    if (conn) conn.release();
  }
}


async function UpdateDeviceLocation(req, res) {
    const { DeviceID, LocationID } = req.body;
  let conn;
  try {
    console.log(req.body);
    conn = await pool.getConnection();

    const Device =  await getDevice(conn, DeviceID);
    if (Device == null){
        res.status(404).send( { error: "Device not found"});
        return;
    }

    await conn.query(
      "UPDATE devices SET locationID = ? WHERE id = ?",
      [LocationID, Device.id]
    );

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}


module.exports = {
  getDevice,
  checkDevice,
  unverifyDevice,
  verifyDevice,
  addDevice,
  UpdateDeviceLocation
};
