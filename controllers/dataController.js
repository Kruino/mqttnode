const pool = require("../db");
const deviceController = require("./deviceController")


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
      "INSERT INTO Temperature (locationID, deviceID, temperature, humidity) VALUES (?, ?, ?, ?)",
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

async function GetTempsForLocation(req, res) {
    const LocationID = req.query.LocationID;
  let conn;
  try {
    conn = await pool.getConnection();

    var rows = await conn.query(
      "SELECT * FROM Temperature WHERE locationID = ?",
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
      "INSERT INTO LightLevel (locationID, deviceID, level) VALUES (?, ?, ?)",
      [LocationID, Device.id, LightLevel]
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
