require("dotenv").config();
const {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} = require("amazon-cognito-identity-js");

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

module.exports = { userPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute };
