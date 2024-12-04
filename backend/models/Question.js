import mongoose, { model } from "mongoose";

const QuestionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  title: { type: String, required: true },
  functionName: { type: String, required: true },
  description: { type: String, required: true },
  parameters: [
    {
      name: { type: String, required: true },
      types: {
        cpp: { type: String, required: true },
        python: { type: String, required: true },
        javascript: { type: String, required: true },
      },
      tests: { type: [String], required: true },
    },
  ],
  output: {
    return_types: {
      cpp: { type: String, required: true },
      python: { type: String, required: true },
      javascript: { type: String, required: true },
    },
    tests: { type: [String], required: true },
  },
  examples: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true },
      explanation: { type: String, required: true },
    },
  ],
  difficulty: { type: String, required: true },
});

const Question = model('Questions', QuestionSchema, "Questions");

export default Question