import React from "react";

const OutputWindow = ({ output, test }) => {
  const statusId = output?.status?.id;

  const outputText = (
    <div className={`${statusId === 3 ? "text-green-400" : "text-red-600"}`}>
      {}
    </div>
  );

  const { inputs, expected_output } = test;

  return (
    <div className="flex">
      <div className="flex flex-row">
        <div className="">
          <p className="text-center">Inputs</p>
          {Object.keys(inputs).forEach((input) => (
            <p>
              {input}: {inputs[input]}
            </p>
          ))}
        </div>
        <p>Expected Output: {expected_output}</p>
      </div>
    </div>
  );
};

export default OutputWindow;
