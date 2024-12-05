import mongoose, { model } from "mongoose";

const UserModel = new mongoose.Schema({
  password: { required: true, type: String },
  email: { required: true, type: String },
  firstName: { required: false, type: String },
  lastName: { required: false, type: String },
});

const User = model("User", UserModel, "Users");

export default User;