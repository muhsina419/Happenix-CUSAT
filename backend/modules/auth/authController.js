const {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  userPool,
} = require("../../config/cognito");

// Register user
const register = (req, res) => {
  const { fullname, studentid, department, course, email, password, interests } = req.body;

  const attributeList = [
    new CognitoUserAttribute({ Name: "name", Value: fullname }),
    new CognitoUserAttribute({ Name: "email", Value: email }),
    new CognitoUserAttribute({ Name: "custom:department", Value: department }),
    new CognitoUserAttribute({ Name: "custom:course", Value: course }),
    new CognitoUserAttribute({ Name: "custom:interests", Value: interests }),
  ];

  userPool.signUp(studentid, password, attributeList, null, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({
      user: result.user.getUsername(),
      message: "Check your email for OTP",
    });
  });
};

// Confirm OTP
const confirm = (req, res) => {
  const { studentid, code } = req.body;
  const cognitoUser = new CognitoUser({ Username: studentid, Pool: userPool });

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: "User confirmed successfully!", result });
  });
};

// Login
const login = (req, res) => {
  const { studentid, password } = req.body;
  const authDetails = new AuthenticationDetails({
    Username: studentid,
    Password: password,
  });
  const cognitoUser = new CognitoUser({ Username: studentid, Pool: userPool });

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) =>
      res.json({
        message: "Login successful",
        token: result.getIdToken().getJwtToken(),
      }),
    onFailure: (err) => res.status(400).json({ error: err.message }),
  });
};

// Forgot password (step 1: send reset code)
const forgotPassword = (req, res) => {
  const { studentid } = req.body;

  const userData = { Username: studentid, Pool: userPool };
  const cognitoUser = new CognitoUser(userData);

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

// Confirm new password (step 2: reset with code)
const confirmPassword = (req, res) => {
  const { studentid, code, newPassword } = req.body;

  const userData = { Username: studentid, Pool: userPool };
  const cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmPassword(code, newPassword, {
    onSuccess: () => {
      res.json({
        message:
          "Password reset successful! You can now log in with your new password.",
      });
    },
    onFailure: (err) => {
      res.status(400).json({ error: err.message });
    },
  });
};

// ✅ Export all controllers
module.exports = {
  register,
  confirm,
  login,
  forgotPassword,
  confirmPassword,
};
