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

#include <vector>
#include <string>
#include <iostream>
#include <sstream>
using namespace std; 
template <typename T> 
void printVector(vector<T> vec){ 
    int n = vec.size() - 1; cout << "["; 
    for(int i = 0; i <= n; ++i){ 
        // cout << i << " N: " << n << "\n"; 
        cout << vec[i] << (i == n ? ']' : ','); 
        } 
    }
vector<int> twoSum(vector<int> nums, int target){ 
    printVector(nums); 
    cout << target << "\n"; return nums; 
} 
int main() { 
    string input; 
    int pos = 1; int prevPos = 1; vector<int> nums; cin >> input; cout << input << "\n"; pos = 1; prevPos = 1; while ((pos = input.find(',')) != string::npos){ nums.push_back(stoi(input.substr(prevPos, pos-prevPos))); prevPos = pos + 1; } nums.push_back(stoi(input.substr(prevPos, input.length() - 1 - prevPos))); cin >> input; int target = stoi(input); printVector(twoSum(nums,target)); }