import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const schema = {
  description: "Coding Question",
  type: SchemaType.OBJECT,
  properties: {
    title: {
      type: SchemaType.STRING,
      description: "Title of the question",
      nullable: false,
    },
    functionName: {
      type: SchemaType.STRING,
      description: "The name of the solution function",
      nullable: false,
    },
    description: {
      type: SchemaType.STRING,
      description: "The question's description",
      nullable: false,
    },
    parameters: {
      type: SchemaType.ARRAY,
      description:
        "The question's inputs. They are the parameters that get passed into the solution function.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: {
            type: SchemaType.STRING,
            description: "Name of the parameter",
            nullable: false,
          },
          types: {
            type: SchemaType.OBJECT,
            properties: {
              cpp: {
                type: SchemaType.STRING,
                description: "The C++ type of the parameter",
                nullable: false,
              },
              python: {
                type: SchemaType.STRING,
                description: "The Python type of the parameter",
                nullable: false,
              },
              javascript: {
                type: SchemaType.STRING,
                description: "The JavaScript type of the parameter",
                nullable: false,
              },
            },
            required: ["cpp", "python", "javascript"],
          },
          tests: {
            type: SchemaType.ARRAY,
            description:
              "List of this input's test values for the question. The ith string represents the input value for the ith test.",
            items: {
              type: SchemaType.STRING,
            },
          },
        },
        required: ["name", "types", "tests"],
      },
    },
    output: {
      type: SchemaType.OBJECT,
      properties: {
        return_types: {
          type: SchemaType.OBJECT,
          properties: {
            cpp: {
              type: SchemaType.STRING,
              description: "The C++ return type of the solution function",
              nullable: false,
            },
            python: {
              type: SchemaType.STRING,
              description: "The Python return type of the solution function",
              nullable: false,
            },
            javascript: {
              type: SchemaType.STRING,
              description:
                "The JavaScript return type of the solution function",
              nullable: false,
            },
          },
          required: ["cpp", "python", "javascript"],
        },
        tests: {
          type: SchemaType.ARRAY,
          description:
            "List of the expected outputs for the question's tests. The ith string represents the expected output for the ith test.",
          items: {
            type: SchemaType.STRING,
          },
        },
      },
      required: ["return_types", "tests"],
    },
    examples: {
      type: SchemaType.ARRAY,
      description: "List of examples to help the user understand the question.",
      items: {
        type: SchemaType.OBJECT,
        properties: {
          input: {
            type: SchemaType.STRING,
            description: "The input/parameter for the example.",
            nullable: false,
          },
          output: {
            type: SchemaType.STRING,
            description: "The output/answer for the example.",
            nullable: false,
          },
          explanation: {
            type: SchemaType.STRING,
            description:
              "The explanation for why the input produces the output for the example. IMPORTANT TO GET RIGHT. Make sure you think about this, deeply.",
            nullable: false,
          },
        },
        required: ["input", "output", "explanation"],
      },
    },
    difficulty: {
      type: SchemaType.STRING,
      description:
        "The difficulty level of the question. Must be either easy, medium, or hard.",
      nullable: false,
    },
  },
  required: [
    "title",
    "functionName",
    "description",
    "parameters",
    "output",
    "examples",
    "difficulty",
  ],
};

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction:
    "You are an expert question generator who specializes in coding questions. Given coding question(s), you know how to generate similar ones.",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

const generateCodeQuestion = async (codingQuestions, navigate) => {
  const result =
    await model.generateContent(`Given these coding questions in JSON format, generate a new one similar to them following the same JSON format.
        """CODING QUESTIONS"""
        ${codingQuestions.map((codingQuestion) => {
          const { _id, question } = codingQuestion;
          return `${JSON.stringify(question)}\n`;
        })}
        """CODING QUESTIONS"""
        `);

  const question = JSON.parse(result.response.text());
  console.log(question);

  navigate(`/question/${question.title}`, { state: question });
};

export default generateCodeQuestion;
