const {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  userPool,
} = require("../../config/cognito");
const { createUser, updateUserVerified, getUserByEmail } = require("../users/userModels");

// ===============================
// REGISTER USER
// ===============================

const register = async (req, res) => {
  const { fullname, email, password, confirmPassword, department } = req.body;

  if (!fullname || !email || !password || !confirmPassword || !department) {
    return res.status(400).json({ error: "Please fill all required fields." });
  }

  // ✅ Validate passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }
  

  const attributeList = [
    new CognitoUserAttribute({ Name: "name", Value: fullname }),
    new CognitoUserAttribute({ Name: "email", Value: email }),
    new CognitoUserAttribute({ Name: "custom:department", Value: department }),
  ];

  userPool.signUp(email, password, attributeList, null, async (err, result) => {
    if (err) return res.status(400).json({ error: err.message });

    try {
      // Save user details to DynamoDB
      const userData = {
        email,
        fullname,
        department,
        verified: false,
        createdAt: new Date().toISOString(),
      };
      await createUser(userData);
      console.log("✅ User saved to DynamoDB:", email);
    } catch (dbErr) {
      console.error("❌ DynamoDB save error:", dbErr);
    }

    res.json({
      user: result.user.getUsername(),
      message: "Registration successful! Please check your email for OTP.",
    });
  });
};

// ===============================
// CONFIRM REGISTRATION (OTP)
// ===============================
const confirm = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: "Email and verification code are required." });
  }

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  cognitoUser.confirmRegistration(code, true, async (err, result) => {
    if (err) return res.status(400).json({ error: err.message });

    try {
      await updateUserVerified(email);
      console.log("✅ User verified flag updated:", email);
    } catch (dbErr) {
      console.error("❌ DynamoDB update error:", dbErr);
    }

    res.json({ message: "User confirmed successfully!", result });
  });
};

// ===============================
// LOGIN
// ===============================
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: async (result) => {
      try {
        // Fetch user details from DynamoDB
        const userDetails = await getUserByEmail(email);
        return res.json({
          message: "Login successful",
          token: result.getIdToken().getJwtToken(),
          user: userDetails,
        });
      } catch (err) {
        console.error("❌ Error fetching user details:", err);
        return res.json({
          message: "Login successful",
          token: result.getIdToken().getJwtToken(),
          user: null,
        });
      }
    },
    onFailure: (err) => {
      // Provide clearer error information for the frontend to handle
      const code = err?.code || "AuthError";
      const message = err?.message || "Authentication failed";
      const status = code === "UserNotConfirmedException" ? 403 : 400;
      return res.status(status).json({ error: message, errorCode: code });
    },
    mfaRequired: (challengeName, challengeParameters) => {
      // Not used currently, but returning a clear response in case MFA is enabled later
      return res.status(401).json({ error: "MFA required", errorCode: "MFARequired" });
    },
    newPasswordRequired: () => {
      return res.status(403).json({ error: "New password required", errorCode: "NewPasswordRequired" });
    },
  });
};

// ===============================
// FORGOT PASSWORD
// ===============================
const forgotPassword = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  cognitoUser.forgotPassword({
    onSuccess: () =>
      res.json({ message: "Password reset code sent to your registered email." }),
    onFailure: (err) => res.status(400).json({ error: err.message }),
  });
};

// ===============================
// CONFIRM NEW PASSWORD
// ===============================
const confirmPassword = (req, res) => {
  const { email, code, newPassword } = req.body;

  if (!email || !code || !newPassword) {
    return res.status(400).json({ error: "Email, code, and new password are required." });
  }

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  cognitoUser.confirmPassword(code, newPassword, {
    onSuccess: () =>
      res.json({ message: "Password reset successful! You can now log in with your new password." }),
    onFailure: (err) => res.status(400).json({ error: err.message }),
  });
};

module.exports = {
  register,
  confirm,
  login,
  forgotPassword,
  confirmPassword,
};
