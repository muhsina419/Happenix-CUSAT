const express = require("express");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { createEvent, searchEvents } = require("./eventService");

const router = express.Router();

// Configure multer to keep file in memory (you can switch to disk if needed)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Shared create handler
async function handleCreate(req, res) {
  try {
    const {
      name,
      category,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      description,
      tickets, // 'yes' | 'no'
      requireApproval, // 'true' | 'false'
      capacity, // number as string
      eventLink, // optional
    } = req.body;

    if (!name || !category || !startDate || !startTime || !endDate || !endTime || !location || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Skip poster storage for now - DynamoDB has 400KB item limit
    // const posterFile = req.file ? {
    //   originalName: req.file.originalname,
    //   mimeType: req.file.mimetype,
    //   bufferBase64: req.file.buffer.toString("base64"),
    // } : null;
    const posterFile = null;

    const eventItem = {
      id: uuidv4(),
      name,
      category,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      description,
      tickets: String(tickets).toLowerCase() === "yes",
      requireApproval: String(requireApproval).toLowerCase() === "true",
      capacity: capacity ? Number(capacity) : 0,
      eventLink: eventLink && eventLink !== "none" ? eventLink : null,
      poster: posterFile, // storing as base64 for demo; replace with S3 in production
      createdAt: new Date().toISOString(),
    };

    await createEvent(eventItem);
    return res.json({ message: "Event created", id: eventItem.id });
  } catch (err) {
    console.error("Create event error:", err);
    return res.status(500).json({ error: "Failed to create event" });
  }
}

// POST /api/events  (multipart/form-data)
router.post("/", upload.single("poster"), handleCreate);

// POST /api/create-event  (multipart/form-data)
router.post("/create-event", upload.single("poster"), handleCreate);

// GET /api/events/test - Simple test endpoint
router.get("/test", (req, res) => {
  res.json({ message: "Events API is working!", timestamp: new Date().toISOString() });
});

// GET /api/events?query=...
router.get("/", async (req, res) => {
  try {
    const query = (req.query.query || "").trim();
    const items = await searchEvents(query);
    return res.json({ items });
  } catch (err) {
    console.error("Search events error:", err);
    return res.status(500).json({ error: "Failed to search events" });
  }
});

module.exports = router;


