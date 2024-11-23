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
    input += code + "\\n";
    let functionCall = functionName + "(";
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      if (type.startsWith("List")) {
        type = type.substring(5, type.length - 1);
        input += `${key} = list(map(${type}, input().strip("[]").split(",")))\\n`;
      } else {
        input += `${key} = ${type}(input())\\n`;
      }
      functionCall += `${key}${index === numParameters ? ")" : ","}`;
    });
    input += `print(${functionCall})`;
    return input;
  } 
  else if (langauge === "cpp") 
  {
    input += "#include <bits/stdc++.h>\\nusing namespace std;\\n";

    input += `template <typename T>
void printVector(vector<T> vec){
    int n = vec.size() - 1;
    cout << "[";
    for(int i = 0; i <= n; ++i){
        // cout << i << " N: " << n << "\\n";
        cout << vec[i] << (i == n  ? ']' : ',');
    }
}`;

    input += code + "\\nint main() {\\nstring input;\\n";

    let functionCall = functionName + "(";
    parameterNames.forEach((key, index) => {
      let type = String(parameterNamesToTypes[key]);
      if (type.startsWith("vector")) {
        type = type.substring(7, type.length - 1);
        input += `vector<${type}> ${key};
    
    getline(cin, input);

    stringstream ss(input);
    string s;

    while (ss >> s){
        ${key}.push_back(sto${type[0]}(s));
    }\\n`;
      } else {
        input += `cin >> input;
    int target = sto${type[0]}(input);\\n`;
      }
      functionCall += `${key}${index === numParameters ? ")" : ","}`;
    });

    if (returnType.startsWith("vector")) {
      input += `printVector(${functionCall});`;
    } else {
      input += `cout << ${functionCall};`;
    }

    input += "\\n}";
    return input;
  }
  else if (langauge === "javascript") 
  {
    
  }
};

console.log(
  getInputAndRunFunctionCode(
    "python",
    "twoSum",
    {
      nums: "List[int]",
      target: "int",
    },
    "List[int]",
    "def two sum(nums, target)\\n"
  )
);

console.log(
  getInputAndRunFunctionCode(
    "cpp",
    "twoSum",
    {
      nums: "vector<int>",
      target: "int",
    },
    "vector<int>",
    `vector<int> twoSum(vector<int> nums, int target){
    printVector(nums);
    return {1,2};
}`
  )
);
