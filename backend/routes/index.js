const express = require("express");
const router = express.Router();

// =======================
// Auth Routes
// =======================
const authRoutes = require("../modules/auth/authRoutes");
if (!authRoutes) {
  console.error("❌ Failed to load authRoutes");
} else {
  console.log("✅ authRoutes loaded");
  router.use("/auth", authRoutes);
}

// =======================
// User Routes
// =======================
const userRoutes = require("../modules/users/userRoutes");
if (!userRoutes) {
  console.error("❌ Failed to load userRoutes");
} else {
  console.log("✅ userRoutes loaded");
  router.use("/users", userRoutes);
}

// =======================
// Event Routes
// =======================
const eventRoutes = require("../modules/events/eventRoutes");
if (!eventRoutes) {
  console.error("❌ Failed to load eventRoutes");
} else {
  console.log("✅ eventRoutes loaded");
  router.use("/events", eventRoutes);
}


module.exports = router;
