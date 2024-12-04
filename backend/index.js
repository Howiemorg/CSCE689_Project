import dotenv from "dotenv";
import express, { json } from "express";
const app = express();
import cors from "cors";
import getMongoDB from "./db/mongodb-connection.js";
dotenv.config();

app.use(json());
app.use(
  cors({
    origin: "*", // Replace with the origin you want to allow
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Adjust the HTTP methods you want to allow
  })
);

const port = 8000;
const conn = await getMongoDB();
conn.co;
// gets all the user table information
app.get("/test-db", async (req, res) => {
  getMongoDB();
});

// import users from "./routes/user_route.js";
import questions from "./routes/question_route.js";
import quizzes from "./routes/quiz_route.js";
import topics from "./routes/topics_route.js"

// app.use("/users", users);
app.use("/topics", topics);
app.use("/quizzes", quizzes);
app.use("/questions", questions);

app.listen(port, function () {
  console.log("Server is running on port " + port);
});