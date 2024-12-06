const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const getInputAndRunFunctionCode = (
  langauge,
  functionName,
  parameterNamesToTypes,
  returnType,
  code
) => {
  let input = "";
  const parameterNames = Object.keys(parameterNamesToTypes);
  const numParameters = parameterNames.length - 1;

  if (langauge === "python") {
    input += code + "\n";
    let functionCall = functionName + "(";
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      if (type.startsWith("List")) {
        type = type.substring(5, type.length - 1);
        input += `${key} = list(map(${type}, input().strip("[]").split(",")))\n`;
      } else {
        input += `${key} = ${type}(input())\n`;
      }
      functionCall += `${key}${index === numParameters ? ")" : ","}`;
    });
    input += `print(${functionCall})`;
    return input;
  } else if (langauge === "cpp") {
    input += `#include <bits/stdc++.h>\nusing namespace std;
    \ntemplate <typename T>
 void printVectorHelperFunction(vector<T> vec){
    int n = vec.size() - 1;
    cout << "[";
    if(n == -1){
      cout << "]\\n";
    }else{
      for(int i = 0; i <= n; ++i){
        if constexpr (is_same_v<T, vector<typename T::value_type>>) {
            printVectorHelperFunction(vec[i]);
        } else {
            // Print the element directly
            cout << vec[i];
        }
        cout << (i == n ? "]" : ","); 
      }
    }
  }\n`;

    input +=
      code +
      `\nint main() {
    string input;
    int pos = 1;
    int prevPos = 1;
    `;

    let functionCall = functionName + "(";
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      if (type.startsWith("vector")) {
        type = type.substring(7, type.length - 1);
        input += `vector<${type}> ${key};
    
    cin >> input;

    pos = 1;
    prevPos = 1;
    while ((pos = input.find(',', prevPos)) != string::npos){
        ${key}.push_back(${
          type !== "string" ? "sto" + type[0] : ""
        }(input.substr(prevPos, pos-prevPos)));
        prevPos = pos + 1;
    }
    ${key}.push_back(${
          type !== "string" ? "sto" + type[0] : ""
        }(input.substr(prevPos, input.length() - 1 - prevPos)));\n`;
      } else {
        input += `cin >> input;
    int target = ${type !== "string" ? "sto" + type[0] : ""}(input);\n`;
      }
      functionCall += `${key}${index === numParameters ? ")" : ","}`;
    });

    if (returnType.startsWith("vector")) {
      input += `${returnType} ret = ${functionCall};
      printVectorHelperFunction(ret);`;
    } else {
      input += `\tcout << ${functionCall};`;
    }

    input += "\n}";
    return input;
  } else if (langauge === "javascript") {
    input +=
      code +
      `\n
      const printArrayHelper = (arr) => {
        if (Array.isArray(arr)) {
            process.stdout.write("[");
            for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                    printArrayHelper(arr[i]);
                } else {
                    process.stdout.write(\`\${arr[i]}\`);
                }
                if (i < arr.length - 1) {
                    process.stdout.write(",");
                }
            }
            process.stdout.write("]");
        }
    }\n\nprocess.stdin.on("data", data => {\nconst preprocessed_data = data.toString().trim().split("\\n")\n`;
    let functionCall = functionName + "(";
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      if (type.endsWith("[]")) {
        type = type.substring(0, type.length - 2);
        input += `const arrrrrrrrr = preprocessed_data[${index}];\nconst ${key} = arrrrrrrrr.substring(1, arrrrrrrrr.length-1).split(",").map((val) => {\n\treturn ${capitalize(
          type
        )}(val)})\n`;
      } else {
        input += `const ${key} = ${capitalize(
          type
        )}(preprocessed_data[${index}])\n`;
      }
      functionCall += `${key}${index === numParameters ? ")" : ","}`;
    });
    if (returnType.endsWith("[]")) {
      input += `ret = ${functionCall};
      printArrayHelper(ret)`;
    } else {
      input += `console.log(${functionCall});`;
    }
    input += `\n});`;
    return input;
  }
};

// console.log(
//   getInputAndRunFunctionCode(
//     "python",
//     "twoSum",
//     {
//       nums: "List[int]",
//       target: "int",
//     },
//     "List[int]",
//     "def two sum(nums, target)\\n"
//   )
// );

// console.log(
//   getInputAndRunFunctionCode(
//     "cpp",
//     "twoSum",
//     {
//       nums: "vector<int>",
//       target: "int",
//     },
//     "vector<int>",
//     `vector<int> twoSum(vector<int> nums, int target){
//     printVector(nums);
//     return {1,2};
// }`
//   )
// );

// console.log(
//   getInputAndRunFunctionCode(
//     "javascript",
//     "twoSum",
//     {
//       nums: "number[]",
//       target: "number",
//     },
//     "number[]",
//     `const twoSum = (nums, target) => {
//     console.log(nums);
//     return target + 5;
// }`
//   )
// );

export default getInputAndRunFunctionCode;
