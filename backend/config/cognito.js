const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
global.fetch = require("node-fetch"); // Required for Node environment

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
  CognitoUser: AmazonCognitoIdentity.CognitoUser,
  AuthenticationDetails: AmazonCognitoIdentity.AuthenticationDetails,
  CognitoUserAttribute: AmazonCognitoIdentity.CognitoUserAttribute,
  userPool,
};
