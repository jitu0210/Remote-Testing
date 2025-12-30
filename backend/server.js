import express from "express";
import mqtt from "mqtt";
import cors from "cors";

const app = express();
const port = 3000;

const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");

const TOPIC_IN = "relay/bts/in";
const TOPIC_OUT = "relay/bts/out";

mqttClient.on("connect", () => {
  console.log("Remote server connected to MQTT");
});

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, curl, Electron)
    if (!origin) return callback(null, true);

    // allow Electron apps (file:// protocol)
    if (origin === "file://") return callback(null, true);

    // otherwise block
    return callback(new Error("CORS policy does not allow this origin"), false);
  }
}));

app.get("/data", (req,res) => {
    res.send("Hello from Backend")
})

// BTS IN
app.post("/bts/in", (req, res) => {
  mqttClient.publish(TOPIC_IN, "pulse");
  res.json({
    success: true,
    action: "BTS IN command sent",
    topic: TOPIC_IN,
  });
});

// BTS OUT
app.post("/bts/out", (req, res) => {
  mqttClient.publish(TOPIC_OUT, "pulse");
  res.json({
    success: true,
    action: "BTS OUT command sent",
    topic: TOPIC_OUT,
  });
});

app.listen(port, () => {
  console.log(`Remote API running at http://localhost:${port}`);
});