---
problemName: "Towers"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Patience-sorting greedy: place each cube on the smallest existing tower it still fits on, else start a new tower."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Towers.cpp"
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

void solve() {
    int n;
    cin>>n;
    vector<int> a(n);
    rep(i,0,n) {cin>>a[i];}
    multiset<int> S;
    S.insert(a[0]);
    ll ans=0;
    rep(i,1,n-1) {
        auto it = S.upper_bound(a[i]);
        if (it==S.end()) {S.insert(a[i]);} else {
            S.erase(it);
            S.insert(a[i]);
        }
        ans=max(ans,(ll)S.size());
    }      
    cout<<ans;
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
