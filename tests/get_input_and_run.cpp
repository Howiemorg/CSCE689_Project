// #include <bits/stdc++.h>
// using namespace std;

// template <typename T>
// void printVector(vector<T> vec){
//     int n = vec.size() - 1;
//     cout << "[";
//     for(int i = 0; i <= n; ++i){
//         // cout << i << " N: " << n << "\n";
//         cout << vec[i] << (i == n  ? ']' : ',');
//     }
// }

// vector<int> twoSum(vector<int> nums, int target){
//     printVector(nums);
//     cout << "\n" << target <<"\nhi";
//     return {1,2};
// }

// int main() {
//     vector<int> nums;
//     // cout << "hello\n";

//     string input;
//     getline(cin, input);

//     // cout << "First string: " << input << "\n"; 
//     stringstream ss(input);
//     string s;

//     while (ss >> s){
//         nums.push_back(stoi(s));
//     }

//     cin >> input;
//     int target = stoi(input);

//     printVector(twoSum(nums, target));

//     return 0;
// }

#include <bits/stdc++.h>
using namespace std;
template <typename T>
void printVector(vector<T> vec){
    int n = vec.size() - 1;
    cout << "[";
    for(int i = 0; i <= n; ++i){
        // cout << i << " N: " << n << "\n";
        cout << vec[i] << (i == n  ? ']' : ',');
    }
}vector<int> twoSum(vector<int> nums, int target){
    printVector(nums);
    return {1,2};
}
int main() {
    string input;
    vector<int> nums;
    
    getline(cin, input);

    stringstream ss(input);
    string s;

    while (ss >> s){
        nums.push_back(stoi(s));
    }
    cin >> input;
    int target = stoi(input);
    printVector(twoSum(nums,target));
}