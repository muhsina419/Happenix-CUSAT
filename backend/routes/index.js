const express = require("express");
const router = express.Router();

const authRoutes = require("../modules/auth/authRoutes");

// Mount auth routes
router.use("/auth", authRoutes);

module.exports = router;
