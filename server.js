const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 5000;

// Enable CORS so frontend can access the backend
app.use(cors());

app.get("/quiz", async (req, res) => {
  try {
    console.log("Fetching quiz data from API...");

    const response = await fetch("https://api.jsonserve.com/Uw5CrX");
    if (!response.ok)
      throw new Error(`API request failed with status ${response.status}`);

    let data = await response.json();
    // console.log("API Response:", data);

    // Ensure valid quiz structure
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error("API did not return valid quiz questions.");
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching quiz data:", error.message);
    res.status(500).json({ error: "Failed to fetch quiz data from API" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
