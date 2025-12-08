---
problemName: "Cow Navigation"
contest: "USACO 2017 January Contest, Gold"
difficulty: "Gold"
keyIdea: "BFS with state representation including position, direction, and whether each cow has reached the goal"
language: "C++"
codeSnippet: |
  #include <bits/stdc++.h>
  using namespace std;
  
  struct State {
    int x1, y1, d1, x2, y2, d2;
    bool operator<(const State& other) const {
      return tie(x1, y1, d1, x2, y2, d2) < 
             tie(other.x1, other.y1, other.d1, other.x2, other.y2, other.d2);
    }
  };
  
  int main() {
    // BFS implementation
    queue<State> q;
    map<State, int> dist;
    // ... rest of implementation
  }
---

## Problem Summary

Two cows start at the bottom-left corner of an N×N grid and need to reach the top-right corner. The cows can move forward, turn left, or turn right. Find the minimum number of moves required.

## Key Insight

The state space includes:
- Position of both cows (x1, y1) and (x2, y2)
- Direction each cow is facing (d1, d2)
- Whether each cow has reached the goal

This creates a state space of O(N^4 × 4^2) which is manageable for N ≤ 20.

## Algorithm

Use BFS to explore all possible states. The key is to track whether each cow has reached the goal separately, so we don't need to keep moving a cow that has already arrived.

## Complexity

- Time: O(N^4 × 16) = O(N^4)
- Space: O(N^4 × 16)

