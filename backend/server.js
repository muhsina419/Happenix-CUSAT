require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
app.use(bodyParser.json());

// 🔹 Use modular routes
app.use("/api", routes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Happenix Backend is Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
