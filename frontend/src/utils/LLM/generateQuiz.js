import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const schema = {
  description: "Coding Quiz",
  type: SchemaType.OBJECT,
  properties: {
    topic: {
      type: SchemaType.STRING,
      description: "The topic of the quiz",
    },
    title: {
      type: SchemaType.STRING,
      description: "Title of the quiz",
      nullable: false,
    },
    questions: {
      type: SchemaType.ARRAY,
      description: "The quiz's questions",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          question: {
            type: SchemaType.STRING,
            description: "The question itself. What is asked to the user",
            nullable: false,
          },
          choices: {
            type: SchemaType.ARRAY,
            description: "The answer choices presented to the user",
            items: {
              type: SchemaType.STRING,
            },
          },
          answer: {
            type: SchemaType.STRING,
            description: "The correct answer choice from the list of choices.",
            nullable: false,
          },
        },
        required: ["question", "choices", "answer"],
      },
    },
    difficulty: {
      type: SchemaType.STRING,
      description:
        "The difficulty level of the quiz. Must be either easy, medium, or hard.",
      nullable: false,
    },
  },
  required: ["title", "questions", "difficulty"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are an expert quiz generator who specializes in data structures and algorithms. Given quiz(zes), you know how to generate similar ones.",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const generateCodeQuiz = async (codingQuizzes, navigate) => {
  try {
    const result =
      await model.generateContent(`Given these coding quizzes in JSON format, generate a new one similar to them following the same JSON format.
        """CODING QUIZZES QUESTIONS"""
        ${codingQuizzes.map((quiz) => `${JSON.stringify(quiz)}\n`)}
        """CODING QUIZZES"""
        `);

    const quiz = JSON.parse(result.response.text());
    console.log(quiz);

    navigate(`/quiz/${quiz.title}`, { state: quiz });
  } catch (e) {
    return "Failed generating quiz."
  }
};

export default generateCodeQuiz;
