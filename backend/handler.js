require("dotenv").config();
const serverless = require("serverless-http"); // Wrap Express for Lambda
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// ✅ Enable CORS for Amplify frontend and localhost
app.use(
  cors({
    origin: [
      /^http:\/\/localhost:\d+$/, // For local testing
      /^http:\/\/127\.0\.0\.1:\d+$/,
      "https://<YOUR_AMPLIFY_APP>.amplifyapp.com" // Replace with your Amplify domain
    ],
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

app.use(bodyParser.json());

// 🔹 Use modular routes
app.use("/api", routes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Happenix Backend is Running 🚀");
});

// Export handler for AWS Lambda
module.exports.handler = serverless(app);
