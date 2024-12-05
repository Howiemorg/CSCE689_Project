import { config } from "dotenv";
import HttpException from "../utils/HttpException.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

config();

class UserController {
  getCurrentUser = async (req, res, next) => {
    const { password, ...userWithoutPassword } = req.currentUser;
    res.send(userWithoutPassword);
  };

  createUser = async (req, res, next) => {
    await this.hashPassword(req);

    const doc = new User(req.body);

    if (!doc) {
      res.status(500).json({ error: "Error creating user." });
      throw new HttpException(500, "User not created!");
    }

    await doc.save();

    res.status(201).send(doc);
  };

  userLogin = async (req, res, next) => {
    const { email, password: pass } = req.body;

    console.log(email);

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      throw new HttpException(404, "User not found!");
    }

    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      res.status(401).json({ message: "Incorrect password!" });
      throw new HttpException(401, "Incorrect password!");
    }

    const secretKey = process.env.JWT_SECRET_KEY || "";
    const token = jwt.sign({ user_id: user._id.toString() }, secretKey, {
      expiresIn: "168h",
    });

    const JSONuser = user.toJSON();
    const { password, ...userWithoutPassword } = JSONuser;

    res.send({ ...userWithoutPassword, token });
  };

  hashPassword = async (req) => {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }
  };

  questionSolved = async (req, res, next) => {
    const { email, ...newSolvedQuestion } = req.body;

    const update = {
      $push: {
        solvedQuestions: newSolvedQuestion,
      },
    };

    console.log(email)
    console.log(newSolvedQuestion)

    let doc = await User.findOneAndUpdate({ email }, update, {
      new: true, runValidators: true
    });

    console.log("DOC:", doc)

    if (!doc) {
      res.status(500).json({ error: "Error adding solved question." });
      throw new HttpException(500, "Error adding solved question.");
    }

    res.json(doc);
  };
}

export default new UserController();
