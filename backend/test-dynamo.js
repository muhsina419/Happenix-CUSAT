// test-dynamo.js
require("dotenv").config();
const { GetCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require("./config/dynamo");

(async () => {
  try {
    // 1️⃣ Write a sample record
    const testUser = {
      email: "dynamosetup@example.com",
      fullname: "Test User",
      department: "CSE",
      verified: false,
      createdAt: new Date().toISOString(),
    };

    console.log("🟡 Adding test item to DynamoDB...");
    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.DYNAMO_TABLE,
        Item: testUser,
      })
    );
    console.log("✅ Test item inserted successfully!");

    // 2️⃣ Fetch the same record
    const { Item } = await ddbDocClient.send(
      new GetCommand({
        TableName: process.env.DYNAMO_TABLE,
        Key: { email: testUser.email },
      })
    );

    console.log("📦 Retrieved item:", Item);
  } catch (err) {
    console.error("❌ DynamoDB test failed:", err);
  }
})();
