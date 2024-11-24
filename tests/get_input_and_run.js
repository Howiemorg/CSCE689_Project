const twoSum = (nums, target) => {
    console.log(nums);
    return target + 5;
}
process.stdin.on("data", data => {
    const preprocessed_data = data.toString().trim().split("\\n")
    const arr = preprocessed_data[0];
    const nums = arr.substring(1, arr.length-1).split(",").map((val) => Number(val))
    const target = Number(preprocessed_data[1])
    console.log(twoSum(nums,target))

}
);