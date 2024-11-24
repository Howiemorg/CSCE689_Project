import React, { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import getStartFunctionCode from "../utils/getStartFunctionCode";
import getInputAndRunFunctionCode from "../utils/getInuptAndRunFunctionCode";

// import { defineTheme } from "../lib/defineTheme";
// import useKeyPress from "../hooks/useKeyPress";
// import Footer from "./Footer";
// import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
// import OutputDetails from "./OutputDetails";
// import ThemeDropdown from "./ThemeDropdown";
import { useLocation } from "react-router-dom";
import OutputWindow from "../components/OutputWindow";

const languageOptions = [
  { id: 97, name: "JavaScript", value: "javascript" },
  { id: 105, name: "C++", value: "cpp" },
  { id: 92, name: "Python", value: "python" },
];

const Question = () => {
  const location = useLocation();
  const question = location.state || {};

  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);

  const [code, setCode] = useState(() => {
    console.log("DEFAULT");
    console.log(question);
    return getStartFunctionCode(
      "javascript",
      question.functionName,
      question.parameters.reduce((accumulation, val) => {
        accumulation[val.name] = val.types[language.value];
        return accumulation;
      }, {}),
      question.return_types[language.value]
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
      question.return_types[languageValue],
      code
    );

    const response = await fetch(
      `${process.env.REACT_APP_RAPID_API_URL}/submissions?base64_encoded=true&fields=*`,

      {
        method: "POST",
        body: JSON.stringify({
          source_code: btoa(judge0Code),
          language_id: language.id,
          stdin: btoa("[0,2,1]\n3"),
          expected_output: btoa(`[0, 2, 1]\n3\n[0, 2, 1]`),
        }),
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
          "Content-Type": "application/json",
        },
      }
    );

    const token = (await response.json()).token;

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
      const response = await fetch(url, options);
      const result = await response.text();
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        // showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        console.log(result);
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
  // useEffect(() => {
  //   defineTheme("oceanic-next").then((_) =>
  //     setTheme({ value: "oceanic-next", label: "Oceanic Next" })
  //   );
  // }, []);

  return (
    <>
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
                      question.return_types[newLanguage]
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
            inputs={question.parameters.reduce((accumulation, val) => {
              accumulation[val.name] = val.tests[0];
              return accumulation;
            }, {})}
            expected_output={}
          />
          <div className="flex flex-col items-end">
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
          {/* {outputDetails && <OutputDetails outputDetails={outputDetails} />} */}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Question;
