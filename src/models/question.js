import { model, Schema } from "mongoose";

const questionSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
      enum: [
        "elementary-math",
        "algebra",
        "geometry",
        "functions",
        "probability",
      ],
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    options: {
      type: [String],
      required: true,
    },

    correctAnswer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Question = model("Question", questionSchema);
