import React, { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
// import axios from "axios";
// import { classnames } from "../utils/general";
// import { languageOptions } from "../constants/languageOptions";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { defineTheme } from "../lib/defineTheme";
// import useKeyPress from "../hooks/useKeyPress";
// import Footer from "./Footer";
// import OutputWindow from "./OutputWindow";
// import CustomInput from "./CustomInput";
// import OutputDetails from "./OutputDetails";
// import ThemeDropdown from "./ThemeDropdown";
import { useLocation } from "react-router-dom";

const languageOptions = [
  { id: 97, name: "JavaScript", value: "javascript" },
  { id: 105, name: "C++", value: "cpp" },
  { id: 92, name: "Python", value: "python" },
];

const javascriptDefault = `// some comment`;

const Question = () => {
  const location = useLocation();
  const question = location.state || {};
  console.log(question);

  const [code, setCode] = useState(javascriptDefault);
  const [customInput, setCustomInput] = useState("");
  // const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState(languageOptions[0]);

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
    const response = await fetch(
      "https://ce.judge0.com/submissions/batch?base64_encoded=false",
      {
        body: JSON.stringify({ source_code: code,
          language_id: language.id
         }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const checkStatus = async (token) => {
    // We will come to the implementation later in the code
  };

  function handleThemeChange(th) {
    // We will come to the implementation later in the code
  }
  // useEffect(() => {
  //   defineTheme("oceanic-next").then((_) =>
  //     setTheme({ value: "oceanic-next", label: "Oceanic Next" })
  //   );
  // }, []);

  // const showSuccessToast = (msg) => {
  //   toast.success(msg || `Compiled Successfully!`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };
  // const showErrorToast = (msg) => {
  //   toast.error(msg || `Something went wrong! Please try again.`, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  console.log("Code:", code);

  return (
    <>
      {/* <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <div className="flex flex-row">
        <div className="px-4 py-2">
          <select
            value={language.value}
            onChange={(e) => {
              const index = e.target.selectedIndex
              console.log("index:", index)
              const newLanguage = e.target.value;
              localStorage.setItem(`${language}-${question.title}`, code);

              const savedCode = localStorage.getItem(
                `${newLanguage}-${question.title}`
              );
              setCode(savedCode ? savedCode : "// new comment");
              console.log(savedCode);
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
          {/* <OutputWindow outputDetails={outputDetails} /> */}
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
