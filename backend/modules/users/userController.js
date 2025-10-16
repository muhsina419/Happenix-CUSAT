// backend/modules/users/userController.js
const getUsers = (req, res) => {
  res.json({ message: "Get all users" });
};

const getUserById = (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
};

module.exports = { getUsers, getUserById };
