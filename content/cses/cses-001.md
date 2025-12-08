---
problemName: "Weird Algorithm"
problemNumber: "1068"
difficulty: "Easy"
keyIdea: "Simple simulation following the algorithm rules"
language: "C++"
codeSnippet: |
  #include <bits/stdc++.h>
  using namespace std;
  
  int main() {
    long long n;
    cin >> n;
    
    while (n != 1) {
      cout << n << " ";
      if (n % 2 == 0) {
        n /= 2;
      } else {
        n = n * 3 + 1;
      }
    }
    cout << 1 << endl;
    return 0;
  }
---

## Problem Summary

Given a positive integer n, apply the following algorithm:
- If n is even, divide it by 2
- If n is odd, multiply it by 3 and add 1
- Repeat until n becomes 1

Print the sequence of numbers.

## Key Insight

This is the Collatz conjecture. The problem guarantees that the algorithm will eventually reach 1 for any positive integer n.

## Algorithm

Simply simulate the algorithm step by step. Use `long long` to avoid integer overflow for large values of n.

## Complexity

- Time: O(k) where k is the number of steps (unpredictable but guaranteed to terminate)
- Space: O(1)

