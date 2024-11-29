import React, { useEffect, useMemo, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import getStartFunctionCode from "../utils/getStartFunctionCode";
import getInputAndRunFunctionCode from "../utils/getInuptAndRunFunctionCode";
import { ArrowPathIcon } from "@heroicons/react/20/solid";

// import { defineTheme } from "../lib/defineTheme";
// import useKeyPress from "../hooks/useKeyPress";
// import CustomInput from "./CustomInput";
// import ThemeDropdown from "./ThemeDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import OutputWindow from "../components/OutputWindow";
import generateCodeQuestion from "../utils/LLM/generateCodeQuestions";

const languageOptions = [
  { id: 97, name: "JavaScript", value: "javascript" },
  { id: 105, name: "C++", value: "cpp" },
  { id: 92, name: "Python", value: "python" },
];

const Question = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const question = useMemo(() => location.state || {}, [location.state]);
  console.log(question);
  console.log(question.title);

  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);
  const [generating, setGenerating] = useState(false);
  console.log(generating);

  const [code, setCode] = useState(() => {
    console.log("DEFAULT");
    console.log(question);
    return getStartFunctionCode(
      "javascript",
      question.functionName,
      question.parameters.reduce((accumulation, val) => {
        accumulation[val.name] = val.types["javascript"];
        return accumulation;
      }, {}),
      question.output.return_types["javascript"]
    );
  });
  // const enterPress = useKeyPress("Enter");
  // const ctrlPress = useKeyPress("Control");

  // useEffect(() => {
  //   if (enterPress && ctrlPress) {
  //     console.log("enterPress", enterPress);
  //     console.log("ctrlPress", ctrlPress);
  //     handleCompile();
  //   }
  // }, [ctrlPress, enterPress]);

  useEffect(() => {
    setCode(
      getStartFunctionCode(
        "javascript",
        question.functionName,
        question.parameters.reduce((accumulation, val) => {
          accumulation[val.name] = val.types["javascript"];
          return accumulation;
        }, {}),
        question.output.return_types["javascript"]
      )
    );
  }, [question]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };
  const handleCompile = async () => {
    setProcessing(true);

    const languageValue = language.value;
    const judge0Code = getInputAndRunFunctionCode(
      languageValue,
      question.functionName,
      question.parameters.reduce((accumulation, val) => {
        accumulation[val.name] = val.types[languageValue];
        return accumulation;
      }, {}),
      question.output.return_types[languageValue],
      code
    );

    const expected_output = question.output.tests[0];
    const inputs = question.parameters.map((parameter) => parameter.tests[0]);

    const response = await fetch(
      `${process.env.REACT_APP_RAPID_API_URL}/submissions?base64_encoded=true&fields=*`,

      {
        method: "POST",
        body: JSON.stringify({
          source_code: btoa(judge0Code),
          language_id: language.id,
          stdin: btoa(
            `${inputs.reduce(
              (accumulation, curVal) => accumulation + curVal + "\n",
              ""
            )}`
          ),
          expected_output: btoa(`${expected_output}`),
        }),
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
          "Content-Type": "application/json",
        },
      }
    );

    const token = (await response.json()).token;
    console.log(token);
    checkStatus(token);
  };

  const checkStatus = async (token) => {
    const url = `${process.env.REACT_APP_RAPID_API_URL}/submissions/${token}?base64_encoded=true&fields=*`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
        "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
      },
    };

    try {
      let response = await fetch(url, options);
      response = await response.json();

      let statusId = response.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response);
        return;
      }
    } catch (error) {
      console.error(error);
    }

    setProcessing(false);
  };

  function handleThemeChange(th) {
    // We will come to the implementation later in the code
  }

  return (
    <>
      <div className="flex flex-col w-[70%] ml-5 mt-5">
        <div className="flex align-text-bottom justify-items-end text-xl font-bold">
          {question.title}
          {"    "}(
          <p
            className={`${
              question.difficulty === "Easy"
                ? "text-green-500"
                : question.difficulty === "Medium"
                ? "text-yellow-400"
                : question.difficulty === "Hard" && "text-red-700"
            }`}
          >
            {question.difficulty}
          </p>
          )
        </div>
        <p>{question.description}</p>
        <div>
          {question.examples.map((example) => (
            <>
              <p>Input: {example.input}</p>
              <p>Output: {example.output}</p>
              <p>Explanation: {example.explanation}</p>
            </>
          ))}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <select
            value={language.value}
            onChange={(e) => {
              const index = e.target.selectedIndex;
              console.log("index:", index);
              const newLanguage = e.target.value;
              localStorage.setItem(`${language.value}-${question.title}`, code);
              console.log(
                "JUST SAVED THIS:",
                localStorage.getItem(`${language.value}-${question.title}`)
              );

              const savedCode = localStorage.getItem(
                `${newLanguage}-${question.title}`
              );
              setCode(
                savedCode
                  ? savedCode
                  : getStartFunctionCode(
                      newLanguage,
                      question.functionName,
                      question.parameters.reduce((accumulation, val) => {
                        accumulation[val.name] = val.types[newLanguage];
                        return accumulation;
                      }, {}),
                      question.output.return_types[newLanguage]
                    )
              );
              setLanguage(languageOptions[index]);
            }}
          >
            {languageOptions.map((languageOption, index) => (
              <option value={languageOption.value} key={index}>
                {languageOption.name}
              </option>
            ))}
          </select>
        </div>
        <div className="px-4 py-2">
          {/* <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} /> */}
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditor
            code={code}
            onChange={onChange}
            language={language.value}
            theme={theme}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow
            output={outputDetails}
            expected_output={question.output.tests[0]}
            inputs={question.parameters.reduce((accumulation, parameter) => {
              return { ...accumulation, [parameter.name]: parameter.tests[0] };
            }, {})}
          />
          <div className="flex flex-col items-end mt-4 h-full">
            {/* <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            /> */}
            <button
              onClick={handleCompile}
              disabled={!code}
              className={`
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0"
                ${!code ? "opacity-50" : ""}
              `}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          <div className="self-center mt-10">
            <button
              className="p-2 border-black border-2 rounded-lg flex"
              onClick={async () => {
                setGenerating(true);
                await generateCodeQuestion([question], navigate);
                setGenerating(false);
              }}
              disabled={generating}
            >
              Generate Similar Question{" "}
              <p className={`ml-3 ${generating && "animate-spin"}`}>
                <ArrowPathIcon height={25} width={25} />
              </p>
            </button>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Question;
