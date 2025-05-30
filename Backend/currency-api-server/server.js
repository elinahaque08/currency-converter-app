const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Rate = require("./models/Rate");

const app = express();
// app.use(cors());
app.use(cors({
    origin: "http://127.0.0.1:8080"
  }));
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/currencydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Get exchange rate
app.get("/api/rate/:from/:to", async (req, res) => {
  const { from, to } = req.params;

  try {
    const rate = await Rate.findOne({ from, to });
    if (!rate) {
      return res.status(404).json({ error: "Rate not found" });
    }
    res.json({ rate: rate.rate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add or update exchange rate
app.post("/api/rate", async (req, res) => {
  const { from, to, rate } = req.body;

  try {
    const existing = await Rate.findOne({ from, to });
    if (existing) {
      existing.rate = rate;
      existing.lastUpdated = Date.now();
      await existing.save();
      return res.json({ message: "Rate updated" });
    }

    const newRate = new Rate({ from, to, rate });
    await newRate.save();
    res.json({ message: "Rate created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save rate" });
  }
});

const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
