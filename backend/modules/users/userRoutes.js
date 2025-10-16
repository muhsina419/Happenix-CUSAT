const express = require("express");
const router = express.Router();
const userController = require("./userController");

// Example endpoints

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

module.exports = router; // ✅ make sure you're exporting just the router

exports.getAllUsers = (req, res) => {
  res.json({ message: "All users route works 🚀" });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  res.json({ message: `User with ID ${id} found ✅` });
};
