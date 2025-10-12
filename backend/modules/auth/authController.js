const {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  userPool,
} = require("../../config/cognito");

// ===============================
// REGISTER USER
// ===============================
const register = (req, res) => {
  const { fullname, studentid, department, course, email, password, interests } = req.body;

  if (!fullname || !studentid || !email || !password) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  const attributeList = [
    new CognitoUserAttribute({ Name: "name", Value: fullname }),
    new CognitoUserAttribute({ Name: "email", Value: email }),
    new CognitoUserAttribute({ Name: "custom:department", Value: department || "" }),
    new CognitoUserAttribute({ Name: "custom:course", Value: course || "" }),
    new CognitoUserAttribute({ Name: "custom:interests", Value: interests || "" }),
  ];

  userPool.signUp(studentid, password, attributeList, null, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({
      user: result.user.getUsername(),
      message: "Registration successful! Check your email for OTP.",
    });
  });
};

// ===============================
// CONFIRM REGISTRATION
// ===============================
const confirm = (req, res) => {
  const { studentid, code } = req.body;

  if (!studentid || !code)
    return res.status(400).json({ error: "Student ID and code are required." });

  const cognitoUser = new CognitoUser({ Username: studentid, Pool: userPool });

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "User confirmed successfully!", result });
  });
};

// ===============================
// LOGIN (Email or StudentID)
// ===============================
const login = (req, res) => {
  const { studentid, email, password } = req.body;

  if (!password || (!studentid && !email)) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide email or student ID and password." });
  }

  const username = studentid || email;

  console.log(`🔹 Login attempt with ${email ? "email" : "studentid"}: ${username}`);

  const authDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) =>
      res.json({
        success: true,
        message: "Login successful",
        data: {
          token: result.getIdToken().getJwtToken(),
        },
      }),
    onFailure: (err) => {
      console.error("❌ Login failed:", err);
      res.status(400).json({ success: false, error: err.message });
    },
  });
};


// ===============================
// FORGOT PASSWORD (Step 1)
// ===============================
const forgotPassword = (req, res) => {
  const { studentid, email } = req.body;

  if (!studentid && !email)
    return res.status(400).json({ error: "Provide email or student ID." });

  const username = studentid || email;
  const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

  cognitoUser.forgotPassword({
    onSuccess: () => {
      res.json({
        message:
          "Password reset initiated. Check your email for the verification code.",
      });
    },
    onFailure: (err) => {
      res.status(400).json({ error: err.message });
    },
  });
};

// ===============================
// CONFIRM NEW PASSWORD (Step 2)
// ===============================
const confirmPassword = (req, res) => {
  const { studentid, email, code, newPassword } = req.body;

  if (!code || !newPassword || (!studentid && !email))
    return res.status(400).json({ error: "Missing required fields." });

  const username = studentid || email;
  const cognitoUser = new CognitoUser({ Username: username, Pool: userPool });

  cognitoUser.confirmPassword(code, newPassword, {
    onSuccess: () => {
      res.json({
        message: "Password reset successful! You can now log in with your new password.",
      });
    },
    onFailure: (err) => {
      res.status(400).json({ error: err.message });
    },
  });
};

// ===============================
// EXPORT ALL CONTROLLERS
// ===============================
module.exports = {
  register,
  confirm,
  login,
  forgotPassword,
  confirmPassword,
};
