const getStartFunctionCode = (
  langauge,
  functionName,
  parameterNamesToTypes,
  returnType
) => {
  let starterCode = "";
  console.log("PARAMS:",parameterNamesToTypes)
  console.log("LANGUAGE:",langauge)
  console.log("FUNCTION NAME:", functionName);
  console.log("RETURN TYPE:", returnType)
  const parameterNames = Object.keys(parameterNamesToTypes);
  const numParameters = parameterNames.length - 1;

  if (langauge === "python") {
    let functionCall = "def " + functionName + "(";
    parameterNames.forEach((key, index) => {
      functionCall += `${key}${index === numParameters ? ")" : ", "}`;
    });
    starterCode = functionCall + `:\n`;
    return starterCode;
  } else if (langauge === "cpp") {
    let functionCall = returnType + " " + functionName + "(";
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      functionCall += `${type + " " + key}${
        index === numParameters ? ")" : ", "
      }`;
    });

    starterCode = functionCall + `{\n\n}`;
    return starterCode;
  } else if (langauge === "javascript") {
    let functionCall = "const " + functionName + " = (";
    parameterNames.forEach((key, index) => {
        console.log(key)
      let type = String(parameterNamesToTypes[key]);
      functionCall += `${key}${index === numParameters ? ")" : ", "}`;
    });
    starterCode = functionCall + ` => {\n\n}`;
    return starterCode;
  }
};

// console.log(
//   getStartFunctionCode(
//     "python",
//     "twoSum",
//     {
//       nums: "List[int]",
//       target: "int",
//     },
//     "List[int]"
//   )
// );

// console.log(
//   getStartFunctionCode(
//     "cpp",
//     "twoSum",
//     {
//       nums: "vector<int>",
//       target: "int",
//     },
//     "vector<int>"
//   )
// );

// console.log(
//   getStartFunctionCode(
//     "javascript",
//     "twoSum",
//     {
//       nums: "number[]",
//       target: "number",
//     },
//     "number[]"
//   )
// );

export default getStartFunctionCode;