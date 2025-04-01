const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//MongoDB setup
const mongoClient = new MongoClient(process.env.MONGODB_URI);
let db;
mongoClient.connect().then(() => {
    db = mongoClient.db("ThreadApp");
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.error("MongoDB Connection Error:", err);
  });

app.post("/api/upload", upload.single("image"), async (req, res) => {
  const imagePath = req.file.path;
  const imageBuffer = fs.readFileSync(imagePath);
  const base64Image = imageBuffer.toString("base64");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      {
        text: "Describe this clothing item with a title and a brief description of the item using the format:\nTitle: <title>\nDescription: <description>.",
      },
    ]);

    const rawText = result.response.text();
    let title = "Untitled";
    let description = "No description available.";

    const titleMatch = rawText.match(/Title:\s*(.+)/i);
    const descMatch = rawText.match(/Description:\s*([\s\S]+)/i);

    if (titleMatch) title = titleMatch[1].trim();
    if (descMatch) description = descMatch[1].trim();

    item = {
      title,
      description,
      imagePath: `/uploads/${req.file.filename}`,
      createdAt: new Date(),
    };
    await db.collection("ThreadApp").insertOne(item);
    res.json(item);
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to process image with Gemini AI" });
  }
});

app.post("/api/save", (req, res) => {
  const { title, description, image } = req.body;
  console.log("Saving item to DB (to be implemented):", { title, description, image });
  res.json({ message: "Item saved successfully" });
});

app.post("/api/generate-outfit", async (req, res) => {
    const { occasion, layering, style } = req.body;
  
    try {
      const items = await db.collection("ThreadApp").find().toArray();
  
      const prompt = `
  You are a virtual fashion stylist. Based on the user's preferences:
  - Occasion: ${occasion}
  - Layering: ${layering}
  - Style: ${style}
  
  They have the following closet items:
  ${items.map((item, i) => `Item ${i + 1}: Title: ${item.title}, Description: ${item.description}`).join("\n")}
  
  From these, pick:
  - one top
  - one bottom
  - one layer (optional)
  - one pair of shoes (optional)
  
  For each item you recommend, explain in 1–2 sentences *why* you chose it for the occasion, layering, and style — to help the user understand your logic.
  
  Return in JSON format exactly like this:
  {
    "top": { "title": "...", "reason": "..." },
    "bottom": { "title": "...", "reason": "..." },
    "layer": { "title": "...", "reason": "..." },
    "shoes": { "title": "...", "reason": "..." }
  }
  `;
  
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const raw = result.response.text();
  
      const jsonStart = raw.indexOf("{");
      const jsonEnd = raw.lastIndexOf("}");
      const jsonString = raw.substring(jsonStart, jsonEnd + 1);
  
      let parsed;
      try {
        parsed = JSON.parse(jsonString);
      } catch (parseErr) {
        console.error("JSON Parse Error:", parseErr);
        console.log("🧾 Raw Gemini response:", raw);
        return res.status(500).json({ error: "Failed to parse outfit JSON" });
      }
  
      // No need to attach image fields anymore
      res.json(parsed);
  
    } catch (err) {
      console.error("Gemini Outfit Generation Error:", err);
      res.status(500).json({ error: "Failed to generate outfit." });
    }
});
  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
