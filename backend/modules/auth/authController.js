const { CognitoUser, AuthenticationDetails, CognitoUserAttribute, userPool } = require("../../config/cognito");

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
    res.json({ user: result.user.getUsername(), message: "Check your email for OTP" });
  });
};

// Confirm OTP
const confirmUser = (req, res) => {
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
  const authDetails = new AuthenticationDetails({ Username: studentid, Password: password });
  const cognitoUser = new CognitoUser({ Username: studentid, Pool: userPool });

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) => res.json({ message: "Login successful", token: result.getIdToken().getJwtToken() }),
    onFailure: (err) => res.status(400).json({ error: err.message }),
  });
};

module.exports = { register, confirmUser, login };
