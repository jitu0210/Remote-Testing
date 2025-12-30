import { useState } from "react";

const BASE_URL = "https://remote-testing.onrender.com";

export default function App() {
  const [status, setStatus] = useState("Idle");

  const sendCommand = (endpoint, label) => {
    setStatus(`${label} command sent`);

    fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
    }).catch(() => {
      setStatus("Command sent");
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-700 rounded-xl p-5 bg-neutral-950">
          <h1 className="text-2xl font-bold mb-3">Remote BTS Relay Control</h1>

          <p className="text-sm text-gray-400 mb-4">
            Distributed control using Modbus TCP & MQTT
          </p>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">System Workflow</h2>
            <pre className="text-xs bg-black border border-gray-700 rounded-lg p-3 text-gray-300">
              {`Frontend (React - localhost)
        |
        | REST API
        v
Backend (Express - Render Cloud)
        |
        | MQTT (HiveMQ)
        v
Raspberry Pi
        |
        | Modbus TCP (Ethernet)
        v
Relay (BTS IN / BTS OUT)`}
            </pre>
          </div>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>
              • Relay is connected to Raspberry Pi using
              <span className="text-white"> Modbus TCP over Ethernet</span>.
            </li>
            <li>
              • Raspberry Pi subscribes to MQTT topics and controls relay.
            </li>
            <li>
              • Backend server is deployed on
              <span className="text-white"> Render Cloud</span>.
            </li>
            <li>
              • Frontend runs locally and triggers commands via REST APIs.
            </li>
          </ul>
          <div className="mt-4 border border-yellow-500 bg-yellow-500/10 rounded-lg p-3 text-yellow-400 text-xs">
            ⚠️ This system is for <strong>testing purposes only</strong>.
          </div>
        </div>
        <div className="border border-gray-700 rounded-xl p-6 bg-neutral-950 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-6">BTS Command Panel</h2>

          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
              onClick={() => sendCommand("/bts/in", "BTS IN")}
              className="py-3 rounded-lg border border-white bg-white text-black font-semibold hover:bg-gray-200 transition active:scale-95"
            >
              BTS IN
            </button>

            <button
              onClick={() => sendCommand("/bts/out", "BTS OUT")}
              className="py-3 rounded-lg border border-white bg-black text-white font-semibold hover:bg-neutral-800 transition active:scale-95"
            >
              BTS OUT
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Status: <span className="text-white">{status}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
