const pool = require("../db");
const deviceController = require("./deviceController")

// uploads temperature to the database
async function UploadTemp(req, res) {
    const { Temperature, Humidity, DeviceID, LocationID } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();

    const Device =  await deviceController.getDevice(conn, DeviceID);
    if (Device == null){
        res.status(404).send( { error: "Device not found"});
        return;
    }

    await conn.query(
      "INSERT INTO temperature (locationID, deviceID, temp, humidity) VALUES (?, ?, ?, ?)",
      [LocationID, Device.id, Temperature, Humidity]
    );

    res.send({ success: true });
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}
// returns all temperature for a specific location
async function GetTempsForLocation(req, res) {
    const LocationID = req.query.LocationID;
  let conn;
  try {
    conn = await pool.getConnection();

    var rows = await conn.query(
      "SELECT * FROM temperature WHERE locationID = ?",
      [LocationID]
    );

    res.send(rows);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
}


// uploads Light level to the database
async function UploadLight(req, res) {
    const { LightLevel, DeviceID, LocationID } = req.body;
  let conn;
  try {
    conn = await pool.getConnection();

    const Device =  await deviceController.getDevice(conn, DeviceID);
    if (Device == null){
        res.status(404).send( { error: "Device not found"});
        return;
    }

    await conn.query(
      "INSERT INTO light (level, locationID, deviceID) VALUES (?, ?, ?)",
      [LightLevel, LocationID, Device.id]
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
  GetTempsForLocation,
  UploadTemp,
  UploadLight,

};
