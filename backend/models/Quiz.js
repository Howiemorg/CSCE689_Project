import mongoose, { model } from "mongoose";

const QuizSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [
    {
      question: { type: String, required: true },
      choices: { type: [String], required: true },
      answer: { type: String, required: true },
    },
  ],
});

const Quiz = model("Quizzes", QuizSchema, "Quizzes");

export default Quiz;
