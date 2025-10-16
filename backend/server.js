require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// ✅ Enable CORS for localhost origins and handle preflight
app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin"
    ],
    optionsSuccessStatus: 200,
  })
);

// Preflight will be handled by the CORS middleware above

app.use(bodyParser.json());

// 🔹 Use modular routes
app.use("/api", routes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Happenix Backend is Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

