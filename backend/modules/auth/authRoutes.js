const express = require("express");
const router = express.Router();
const { register, confirmUser, login } = require("./authController");

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/confirm
router.post("/confirm", confirmUser);

// POST /api/auth/login
router.post("/login", login);

module.exports = router; // ✅ Export the router object, not an object wrapper
