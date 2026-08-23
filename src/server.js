import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { Question } from "./models/question.js";

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const allowedTopics = [
  "elementary-math",
  "algebra",
  "geometry",
  "functions",
  "probability",
];

app.get("/questions", async (req, res) => {
  const { topic, limit = "5" } = req.query;

  const parsedLimit = Number(limit);

  if (!topic || !allowedTopics.includes(topic)) {
    return res.status(400).json({
      message: "Invalid topic",
    });
  }

  if (![5, 10].includes(parsedLimit)) {
    return res.status(400).json({
      message: "Limit must be 5 or 10",
    });
  }

  const questions = await Question.aggregate([
    {
      $match: { topic },
    },
    {
      $sample: { size: parsedLimit },
    },
  ]);

  res.status(200).json(questions);
});

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// err
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
