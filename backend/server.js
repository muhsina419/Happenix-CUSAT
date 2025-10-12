require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");

const app = express();

// ✅ Enable CORS for frontend (Vite default: 5173)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());

// 🔹 Use modular routes
app.use("/api", routes);

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Happenix Backend is Running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
