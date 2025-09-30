const express = require("express");
const router = express.Router();
const {
  register,
  confirm,
  login,
  forgotPassword,
  confirmPassword,
} = require("./authController");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/confirm
router.post("/confirm", confirm);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// POST /api/auth/confirm-password
router.post("/confirm-password", confirmPassword);

module.exports = router; // ✅ export the router
