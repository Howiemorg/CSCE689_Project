import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import React from "react";

const OutputWindow = ({ output, expected_output, inputs, prevTest, nextTest, testNumber }) => {
  const statusId = output?.status?.id;

  console.log("OUTPUT:", output)

  const outputText = output && (
    <div className=" mt-4">
      <div className="flex flex-row justify-between">
        <p>Runtime: {output.time * 1000} ms</p>
        <p>Memory: {output.memory / 1000} MB</p>
      </div>
      <div
        className={`${statusId === 3 ? "text-green-400" : "text-red-600"} mt-4`}
      >
        {statusId === 3 || statusId === 4 ? (
          <p>
            Output ({output.status.description}) {atob(output.stdout)}
          </p>
        ) : statusId === 6 ? (
          <p>{atob(output.compile_output)}</p>
        ) : statusId === 5 ? (
          <p>{atob(output.status.description)}</p>
        ) : (
          <p>{atob(output.stderr)}</p>
        )}
      </div>
    </div>
  );

  console.log(output);

  return (
    <div className="flex flex-col p-4 bg-black text-white rounded-lg">
      <div className=" justify-evenly flex flex-row">
        <ArrowLeftCircleIcon onClick={prevTest} className="w-8 h-8 cursor-pointer"  />
        Test {testNumber}
        <ArrowRightCircleIcon onClick={nextTest} className="w-8 h-8 cursor-pointer" />
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="">
          <p className="text-center">Inputs</p>
          {Object.keys(inputs).map((input) => {
            return (
              <p key={input}>
                {input}: {inputs[input]}
              </p>
            );
          })}
        </div>
        <p>Expected Output: {expected_output}</p>
      </div>
      {outputText}
    </div>
  );
};

export default OutputWindow;
