// Ensure fetch is available for amazon-cognito-identity-js in Node
// and load environment variables from repo root
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

// Polyfill fetch for Node.js runtime used by amazon-cognito-identity-js
if (typeof global.fetch !== "function") {
  // node-fetch v2 for CommonJS compatibility
  global.fetch = require("node-fetch");
}

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
