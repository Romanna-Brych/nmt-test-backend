import "dotenv/config";
import mongoose from "mongoose";

import { Question } from "./models/Question.js";
import { questions } from "./data/questions.js";

const seedQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    await Question.deleteMany({});
    await Question.insertMany(questions);

    console.log(`${questions.length} questions added successfully`);
  } catch (error) {
    console.error("Failed to seed questions:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

seedQuestions();
