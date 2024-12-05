// const twoSum = (nums, target) => {
//     console.log(nums);
//     return target + 5;
// }
// process.stdin.on("data", data => {
//     const preprocessed_data = data.toString().trim().split("\n")
//     const arr = preprocessed_data[0];
//     const nums = arr.substring(1, arr.length-1).split(",").map((val) => Number(val))
//     console.log(preprocessed_data[1])
//     const target = Number(preprocessed_data[1])
//     console.log(twoSum(nums,target))

// }
// );

function printArrayHelper(arr) {
    if (Array.isArray(arr)) {
        process.stdout.write("[");
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                printArrayHelper(arr[i]);
            } else {
                process.stdout.write(`${arr[i]}`);
            }
            if (i < arr.length - 1) {
                process.stdout.write(",");
            }
        }
        process.stdout.write("]");
    } else {
        process.stdout.write(`${arr}`);
    }
}

const nestedArray1 = [];
const nestedArray2 = [[1, 2], [3, 4], [5, 6]];
const nestedArray3 = [[[1], [2]], [[3, 4]]];

printArrayHelper(nestedArray1);
console.log(); 
printArrayHelper(nestedArray2);
console.log();
printArrayHelper(nestedArray3);
console.log(); 
