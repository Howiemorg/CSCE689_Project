import React from "react";

const OutputWindow = ({ output, expected_output, inputs }) => {
  const statusId = output?.status?.id;

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
