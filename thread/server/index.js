const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const upload = multer({ dest: "uploads/" });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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

    res.json({
      title,
      description,
      imagePath: `/uploads/${req.file.filename}`,
    });
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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
