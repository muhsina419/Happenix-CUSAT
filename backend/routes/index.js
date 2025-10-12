const express = require("express");
const router = express.Router();

try {
  const authRoutes = require("../modules/auth/authRoutes");
  console.log("✅ authRoutes loaded");
  router.use("/auth", authRoutes);
} catch (err) {
  console.error("❌ Error loading authRoutes:", err);
}

try {
  const userRoutes = require("../modules/users/userRoutes");
  console.log("✅ userRoutes loaded");
  router.use("/users", userRoutes);
} catch (err) {
  console.error("❌ Error loading userRoutes:", err);
}

module.exports = router;
