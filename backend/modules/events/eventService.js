const { PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require("../../config/dynamo");

const TABLE = process.env.DYNAMO_EVENTS_TABLE || "HappenixEvents";

async function createEvent(eventItem) {
  try {
    await ddbDocClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: eventItem,
        ConditionExpression: "attribute_not_exists(id)",
      })
    );
    console.log("✅ Event created in DynamoDB:", eventItem.id);
  } catch (err) {
    console.error("❌ DynamoDB create error:", err);
    throw err;
  }
}

async function searchEvents(query) {
  // Simple scan-and-filter; replace with GSI/queries in production
  const res = await ddbDocClient.send(new ScanCommand({ TableName: TABLE }));
  const items = (res.Items || []).filter((e) => {
    if (!query) return true;
    const haystack = `${e.name || ''} ${e.category || ''} ${e.location || ''}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });
  return items;
}

module.exports = { createEvent, searchEvents };


