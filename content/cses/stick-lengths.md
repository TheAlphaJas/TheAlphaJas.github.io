---
problemName: "Stick Lengths"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Sort the sticks and align every stick to the median, which minimizes total absolute distance."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Stick_Lengths.cpp"
---

## Solution

```cpp
#include <bits/stdc++.h>
using namespace std;
//author: von_Braun
#define ll long long
#define lli long long int
#define pb push_back
#define rep(var, start, num) for(ulli var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

long long compcost(vector<int> &a, int x) {
    ll cost=0;
    int n = a.size();
    rep(i,0,n) {
        cost+=abs(a[i]-x);
    }
    return cost;
}

void solve() {
    int n;
    cin>>n;
    vector<int> a(n);
    rep(i,0,n) {cin>>a[i];}
    sort(all(a));
    if (n%2) {
        cout<<compcost(a, a[n/2])<<endl;
    } else {
        cout<<min(compcost(a, a[n/2]), compcost(a, a[n/2-1]))<<endl;
    }
}

int main() {
    //add quotes incase input output file
    //freopen(input.txt,r,stdin);
    //freopen(output.txt,w,stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
