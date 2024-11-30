import React, { useEffect, useRef, useState } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useParams } from "react-router-dom";

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are knowledgeable in data structures and algorithms and coding questions. Your job is to recommend study material for the user. This can be links to articles, book, etc.",
});

let chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Your job is to recommend study material for the user. This can be links to articles, book, etc.\nIMPORTANT: You must respond to any queries not related to data structures and algorithms or coding questions with "That question is outside my knowledge. Please make sure all queries are related to DSA."\n`,
        },
      ],
    },
  ],
});

const StudyMaterial = () => {
  const [systemHistory, setSystemHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const windowRef = useRef(null);
  const { topicId } = useParams();

  useEffect(() => {
    const getInitialMaterial = async () => {
      setGenerating(true);

      const response = await chat.sendMessage(
        `Please generate study material covering the ${topicId} topic.`
      );

      const text = response.response.text();

      setSystemHistory((prevHistory) => [...prevHistory, text]);

      setGenerating(false);
    };

    getInitialMaterial();
  }, [topicId]);

  const sendQuery = async (event) => {
    if (event.key !== "Enter" || generating || event.shiftKey) {
      return;
    }

    event.preventDefault();

    setPrompt("");
    setGenerating(true);
    if (windowRef.current) {
      windowRef.current.scrollTop = windowRef.current.scrollHeight;
    }

    const response = await chat.sendMessage(prompt);

    const text = response.response.text();

    setSystemHistory((prevHistory) => [...prevHistory, text]);

    if (windowRef.current) {
      windowRef.current.scrollTop = windowRef.current.scrollHeight;
    }
    setGenerating(false);
  };

  return (
    <div className="flex flex-row mt-8 h-full">
      <div
        className="overflow-y-auto p-4 h-[450px] w-3/5 m-auto"
        ref={windowRef}
      >
        {systemHistory.map((system, index) => {
          return (
            <>
              <div className="mr-[10%] my-5">
                <p className="inline-block text-white py-2 px-6 bg-black rounded-3xl whitespace-pre-wrap break">
                  {system ? system : "Generating..."}
                </p>
              </div>
            </>
          );
        })}
        {generating && (
          <div className="mr-[10%] my-5">
            <p className="inline-block text-white py-2 px-6 bg-black rounded-3xl whitespace-pre-wrap break">
              Generating...
            </p>
          </div>
        )}
      </div>

      <div className="overflow-none border-2 p-4 border-gray-600 h-48 rounded-lg w-1/5 mr-20">
        <textarea
          type="text"
          className=" placeholder:text-gray-900 h-full w-full text-wrap outline-none resize-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={sendQuery}
          placeholder={"Enter your query here..."}
        />
      </div>
    </div>
  );
};

export default StudyMaterial;
