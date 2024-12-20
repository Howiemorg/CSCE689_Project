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
    let { limit, page } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    const startingAggregationWithPagination = [];

    if (page !== null && limit !== null) {
      startingAggregationWithPagination.push({ $skip: page * limit });
      startingAggregationWithPagination.push({ $limit: limit });
    }

    console.log(req.query);

    let docs = null;
    if (req.query.email) {
      const email = req.query.email;
      console.log(email);
      docs = await Quiz.aggregate([
        {
          $lookup: {
            from: "Users",
            let: { questionId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$email", email] },
                      {
                        $in: ["$$questionId", "$solvedQuestions.questionId"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "quizzesSolved",
          },
        },
        {
          $facet: {
            quizzes: [
              ...startingAggregationWithPagination,
              {
                $addFields: {
                  solved: { $gt: [{ $size: "$quizzesSolved" }, 0] },
                },
              },
              {
                $project: {
                  quizzesSolved: 0,
                },
              },
            ],
            maxPages: [{ $count: "value" }],
          },
        },
      ]);

      console.log(docs[0].quizzes);
    } else {
      docs = await Quiz.aggregate([
        {
          $match: { topic: req.params.topicId },
        },
        {
          $facet: {
            quizzes: startingAggregationWithPagination,
            maxPages: [{ $count: "value" }],
          },
        },
      ]);

      console.log(docs);
    }

    docs = docs[0];
    if (!docs.quizzes.length) {
      res.status(404).json({ error: "Couldn't find quizzes." });
      throw new HttpException(404, "Couldn't find quizzes");
    }

    docs.maxPages = docs.maxPages[0].value;

    if (limit !== null) docs.maxPages = Math.ceil(docs.maxPages / limit) - 1;

    res.json(docs);
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
    let { limit, page } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    const startingAggregationWithPagination = [];

    if (page !== null && limit !== null) {
      startingAggregationWithPagination.push({ $skip: page * limit });
      startingAggregationWithPagination.push({ $limit: limit });
    }

    console.log(req.query);

    let docs = null;
    if (req.query.email) {
      const email = req.query.email;
      console.log(email);
      docs = await Quiz.aggregate([
        {
          $match: {
            topic: req.params.topicId,
          },
        },
        {
          $lookup: {
            from: "Users",
            let: { questionId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$email", email] },
                      {
                        $in: ["$$questionId", "$solvedQuestions.questionId"],
                      },
                    ],
                  },
                },
              },
            ],
            as: "quizzesSolved",
          },
        },
        {
          $facet: {
            quizzes: [
              ...startingAggregationWithPagination,
              {
                $addFields: {
                  solved: { $gt: [{ $size: "$quizzesSolved" }, 0] },
                },
              },
              {
                $project: {
                  quizzesSolved: 0,
                },
              },
            ],
            maxPages: [{ $count: "value" }],
          },
        },
      ]);

      console.log(docs[0].quizzes);
    } else {
      docs = await Quiz.aggregate([
        {
          $match: { topic: req.params.topicId },
        },
        {
          $facet: {
            quizzes: startingAggregationWithPagination,
            maxPages: [{ $count: "value" }],
          },
        },
      ]);

      console.log(docs);
    }

    docs = docs[0];
    if (!docs.quizzes.length) {
      res.status(404).json({ error: "Couldn't find quizzes." });
      throw new HttpException(404, "Couldn't find quizzes");
    }

    docs.maxPages = docs.maxPages[0].value;

    if (limit !== null) docs.maxPages = Math.ceil(docs.maxPages / limit) - 1;

    res.json(docs);
  };
}

export default new QuizController();
