// backend/modules/users/userModels.js
// Use AWS SDK v3 DocumentClient across the codebase for consistency
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const { PutCommand, UpdateCommand, GetCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require("../../config/dynamo");

const TABLE_NAME = process.env.DYNAMO_TABLE || "HappenixUsers";
const EVENTS_TABLE = process.env.DYNAMO_EVENTS_TABLE || "HappenixEvents";

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

const getUserByEmail = async (email) => {
  const result = await ddbDocClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { email },
    })
  );
  return result.Item;
};

const getUserCreatedEvents = async (email) => {
  const result = await ddbDocClient.send(
    new QueryCommand({
      TableName: EVENTS_TABLE,
      IndexName: "organizerEmail-index", // Assuming you have a GSI on organizerEmail
      KeyConditionExpression: "organizerEmail = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    })
  );
  return result.Items || [];
};

module.exports = {
  createUser,
  updateUserVerified,
  getUserByEmail,
  getUserCreatedEvents,
};
