import mongoose, { model, Schema } from "mongoose";

const solvedQuestionSchema = new mongoose.Schema({
  questionId: {
    required: true,
    type: Schema.Types.ObjectId,
    refPath: "question",
  },
  question: { required: true, type: String, enum: ["Quizzes", "Questions"] },
  answers: { type: Map, required: true, of: String },
});

const UserModel = new mongoose.Schema({
  password: { required: true, type: String },
  email: { required: true, type: String },
  firstName: { required: false, type: String },
  lastName: { required: false, type: String },
  solvedQuestions: { required: false, type: [solvedQuestionSchema] },
});

const User = model("User", UserModel, "Users");

export default User;
