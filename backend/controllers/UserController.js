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

//   updateUser = async (req, res, next) => {
//     checkValidation(req, res);

//     await this.hashPassword(req);

//     const { confirmPassword, ...updates } = req.body;

//     const result = await User.findOneAndUpdate(
//       { _id: req.params.id },
//       updates,
//       { new: true }
//     );

//     if (!result) {
//       res.status(404).json({ message: "No users updated" });
//       throw new HttpException(404, "No users updated");
//     }

//     res.send({ message: "User updated", result });
//   };

//   deleteUser = async (req, res, next) => {
//     const result = await User.deleteOne({ _id: req.params.id });
//     if (!result) {
//       res.status(404).json({ message: "User not found" });
//       throw new HttpException(404, "User not found");
//     }
//     res.send("User has been deleted");
//   };

  userLogin = async (req, res, next) => {
    const { email, password: pass } = req.body;

    console.log(email)

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
}

export default new UserController();