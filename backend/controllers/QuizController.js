import Quiz from "../models/Quiz.js";
import HttpException from "../utils/HttpException.js";

class QuizController {
  getQuiz = async (req, res, next) => {
    const quiz = await Quiz.findOne(req.query);

    if (!quiz) {
      res.status(404).json({ error: "Couldn't find quiz." });
      throw new HttpException(404, "Couldn't find quiz");
    }

    res.json(quiz);
  };

  getQuizzes = async (req, res, next) => {
    const quizzes = await Quiz.find({});

    if (!quizzes.length) {
      res.status(404).json({ error: "Couldn't find quizzes." });
      throw new HttpException(404, "Couldn't find quizzes");
    }

    res.json(quizzes);
  };

  createQuiz = async (req, res, next) => {
    const newQuiz = new Quiz(req.body);

    const quiz = await newQuiz.save();

    if (!quiz) {
      res.status(500).json({ error: "Error creating quiz." });
      throw new HttpException(500, "Error creating quiz");
    }

    res.status(201).json(quiz);
  };

  getQuizByTopic = async (req, res, next) => {
    const quizzes = await Quiz.find({
      topic: req.params.topicId,
    });

    if (!quizzes.length) {
      res.status(404).json({ error: "Couldn't find quizzes." });
      throw new HttpException(404, "Couldn't find quizzes");
    }

    console.log(quizzes);

    res.json({ quizzes: quizzes });
  };
}

export default new QuizController();
