#include <iostream>
#include <vector>
#include <type_traits>
using namespace std;

// Primary template
template <typename T>
void printVectorHelperFunction(const vector<T>& vec) {
    cout << "[";
    for (size_t i = 0; i < vec.size(); ++i) {
        if constexpr (std::is_same_v<T, std::vector<typename T::value_type>>) {
            printVectorHelperFunction(vec[i]);
        } else {
            cout << vec[i];
        }
        if (i != vec.size() - 1) {
            cout << ", ";
        }
    }
    cout << "]\n";
}

int main() {
    vector<int> vec1 = {1, 2, 3};
    vector<vector<int>> vec2 = {{1, 2}, {3, 4}, {5, 6}};
    vector<vector<vector<int>>> vec3 = {{{1}, {2}}, {{3, 4}}};

    printVectorHelperFunction(vec1);
    printVectorHelperFunction(vec2);
    printVectorHelperFunction(vec3);

    return 0;
}
