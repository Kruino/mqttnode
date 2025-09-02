require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const mqtt = require("mqtt");
const jwt = require("jsonwebtoken");
const deviceController = require("./controllers/deviceController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/data", require("./routes/data"));
app.use("/device", require("./routes/device"));
app.use("/", require("./routes/user"));
app.use("/locations", require("./routes/location"));

// Create HTTP server for WS + Express
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  // Extract token from query string
  const params = new URLSearchParams(req.url.replace(/^\/\?/, ""));
  const token = params.get("token");

  if (!token) {
    ws.close(1008, "Token missing");
    return;
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    ws.user = user;
    console.log("WS authenticated:", user.username);

    ws.on("message", (msg) => {
      try{

        var json = JSON.parse(msg);
        
        mqttClient.publish(json.Topic, JSON.stringify(json.Msg));
      console.log("Message from client:", msg, "User:", ws.user.username);
      }catch(ex){
        console.log(ex);
      }
  
    });

    ws.on("close", () => {
      console.log("WS client disconnected:", ws.user?.username);
    });
  } catch (err) {
    console.error("Invalid token:", err.message);
    ws.close(1008, "Invalid token");
  }
});

// MQTT setup
const mqttSettings = {
  clientId: "server-client",
  username: "mosquitto",
  password: "mosquitto123",
  keepalive: 1,
  clean: false,
  reconnectPeriod: 1000,
};

const mqttClient = mqtt.connect("mqtt://192.168.1.131:1883", mqttSettings);

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");
  mqttClient.subscribe("#", { qos: 1 });
});

mqttClient.on("message", async (topic, message) => {
  const msgStr = message.toString();

  try {
    const data = JSON.parse(msgStr);
    const deviceID = data.DeviceID;
    if (!deviceID) return;

   
    let allowed = await deviceController.checkDevice(deviceID);
    if(topic === "device/Update"){
      allowed = true;
    }
    
    if (allowed) {


      // Forward to all authenticated WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN && client.user) {
          client.send(JSON.stringify({ topic, message: data }));
        }
      });
    } 
  } catch (err) {
    console.error("Failed to parse MQTT message:", err);
  }
});

mqttClient.on("error", (err) => console.error("MQTT ERROR:", err));

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
