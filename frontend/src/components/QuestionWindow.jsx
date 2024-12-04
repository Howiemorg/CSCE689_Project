import React, { useRef, useState } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are an expert in data structures and algorithms. This means you are also great at coding questions.",
});

let chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Your goal is to help answer any questions about data structures and algorithms someone may have. That person could be a beginner or knowledgeable in this field.\nIMPORTANT: You must respond to any queries not related to data structures and algorithms or coding questions with "That question is outside my knowledge. Please make sure all queries are related to DSA."\n`,
        },
      ],
    },
  ],
});

const QuestionWindow = () => {
  const [userHistory, setUserHistory] = useState([]);
  const [systemHistory, setSystemHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const windowRef = useRef(null);

  const sendQuery = async (event) => {
    if (event.key !== "Enter" || generating || event.shiftKey) {
      return;
    }

    event.preventDefault();

    setUserHistory((prevHistory) => [...prevHistory, prompt]);
    setPrompt("");
    setGenerating(true);
    if (windowRef.current) {
      windowRef.current.scrollTop = windowRef.current.scrollHeight;
    }

    const response = await chat.sendMessage(prompt);

    const text = response.response.text();
    console.log(response);
    console.log(text);

    setSystemHistory((prevHistory) => [...prevHistory, text]);

    if (windowRef.current) {
      windowRef.current.scrollTop = windowRef.current.scrollHeight;
    }
    setGenerating(false);
  };

  return (
    <div className="flex flex-row h-full">
      <button
        className="py-2 px-6 h-18 md:h-12 self-center hover:bg-black hover:text-white hover:border-white border-black text-black bg-white border-2 rounded-md"
        onClick={() => {
          setUserHistory([]);
          setSystemHistory([]);
          chat = model.startChat({
            history: [
              {
                role: "user",
                parts: [
                  {
                    text: `Your goal is to help answer any questions about data structures and algorithms someone may have. That person could be a beginner or knowledgeable in this field.\nIMPORTANT: You must respond to any queries not related to data structures and algorithms or coding questions with "That question is outside my knowledge. Please make sure all queries are related to DSA."\n`,
                  },
                ],
              },
            ],
          });
        }}
      >
        Clear Chat
      </button>
      <div
        className="overflow-y-auto border-2 p-4 border-gray-600 h-full rounded-lg w-3/5 m-auto"
        ref={windowRef}
      >
        {userHistory.map((user, index) => {
          const system =
            index < systemHistory.length ? systemHistory[index] : null;
          console.log(system);

          return (
            <>
              <div className="ml-[10%] text-right">
                <p className="inline-block text-black text-right py-2 px-6 bg-gray-400 rounded-3xl">
                  {user}
                </p>
              </div>
              <div className="mr-[10%] my-5">
                <p className="inline-block text-white py-2 px-6 bg-gray-600 rounded-3xl whitespace-pre-wrap break">
                  {system ? system : "Generating..."}
                </p>
              </div>
            </>
          );
        })}
      </div>

      <div className="overflow-none border-2 p-4 border-gray-600 h-full rounded-lg w-1/5 m-auto">
        <textarea
          type="text"
          className="bg-black text-white h-full w-full text-wrap outline-none resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={sendQuery}
          placeholder={"Please enter your question here..."}
        />
      </div>
    </div>
  );
};

export default QuestionWindow;
