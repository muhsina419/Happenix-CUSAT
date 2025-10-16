// backend/modules/users/userModels.js
// Use AWS SDK v3 DocumentClient across the codebase for consistency
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require("../../config/dynamo");

const TABLE_NAME = process.env.DYNAMO_TABLE || "HappenixUsers";

const createUser = async (userData) => {
  await ddbDocClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: userData,
      // Condition ensures we don't overwrite an existing user with same email
      ConditionExpression: "attribute_not_exists(email)",
    })
  );
};

const updateUserVerified = async (email) => {
  await ddbDocClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { email },
      UpdateExpression: "SET verified = :v",
      ExpressionAttributeValues: { ":v": true },
    })
  );
};

module.exports = {
  createUser,
  updateUserVerified,
};
