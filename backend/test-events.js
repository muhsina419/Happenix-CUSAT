// test-events.js
require("dotenv").config();
const { PutCommand, GetCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require("./config/dynamo");

const TABLE = process.env.DYNAMO_EVENTS_TABLE || "HappenixEvents";

(async () => {
  try {
    console.log("🟡 Testing DynamoDB Events table...");
    console.log("Table name:", TABLE);
    
    // Test item
    const testEvent = {
      id: "test-" + Date.now(),
      name: "Test Event",
      category: "Test",
      startDate: "2024-03-15",
      startTime: "09:00",
      endDate: "2024-03-15", 
      endTime: "17:00",
      location: "Test Location",
      description: "Test description",
      tickets: false,
      requireApproval: false,
      capacity: 100,
      eventLink: null,
      createdAt: new Date().toISOString(),
    };

    // Try to create
    console.log("🟡 Creating test event...");
    await ddbDocClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: testEvent,
      })
    );
    console.log("✅ Test event created successfully!");

    // Try to read
    console.log("🟡 Reading test event...");
    const { Item } = await ddbDocClient.send(
      new GetCommand({
        TableName: TABLE,
        Key: { id: testEvent.id },
      })
    );
    console.log("📦 Retrieved event:", Item);

  } catch (err) {
    console.error("❌ DynamoDB test failed:", err);
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
  }
})();
