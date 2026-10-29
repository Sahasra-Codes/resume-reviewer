import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});