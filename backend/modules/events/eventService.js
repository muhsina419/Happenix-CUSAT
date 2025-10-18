const { PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const ddbDocClient = require("../../config/dynamo");
const s3 = require("../../config/s3");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");

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
const BUCKET = process.env.S3_BUCKET_NAME;

async function getPresignedUrl(contentType) {
  if (!BUCKET) throw new Error("Missing S3_BUCKET_NAME env");
  const key = `posters/${uuidv4()}`;
  const command = new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType });
  const url = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });
  return { url, key, contentType };
}

module.exports.getPresignedUrl = getPresignedUrl;


