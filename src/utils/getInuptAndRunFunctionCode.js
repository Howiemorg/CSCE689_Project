const getInputAndRunFunctionCode = (
  langauge,
  functionName,
  parameterNamesToTypes
) => {
  let input = "";
  const parameterNames = Object.keys(parameterNamesToTypes);
  const numParameters = parameterNames.length - 1;

  if (langauge === "python") {
    let functionCall = functionName + "("
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      if (type.startsWith("List")) {
        type = type.substring(5, type.length - 1);
        input += `${key} = list(map(${type}, input().strip("[]").split(",")))\\n`;
      } else {
        input += `${key} = ${type}(input())\\n`;
      }
      functionCall += `${key}${index === numParameters ? ")" : ","}`
    })
    input += `print(${functionCall})`
    return input;
  } else if (langauge === "cpp") {
    let functionCall = functionName + "("
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      if (type.startsWith("List")) {
        type = type.substring(5, type.length - 1);
        input += `${key} = list(map(${type}, input().strip("[]").split(",")))\\n`;
      } else {
        input += `${key} = ${type}(input())\\n`;
      }
      functionCall += `${key}${index === numParameters ? ")" : ","}`
    })
    input += `print(${functionCall})`
    return input;
  } else if (langauge === "javascript") {
  }
};

console.log(getInputAndRunFunctionCode("python", "twoSum", {nums: "List[int]", target: "int"}))