---
problemName: "Tasks and Deadlines"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Greedy: sort tasks by duration and process the shortest first to maximize total points from finish times."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Tasks_and_Deadlines.cpp"
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
    ll a[n], b[n];
    rep(i,0,n) {cin>>a[i]>>b[i];}
    sort(a,a+n);
    lli s=0;
    lli s2=0;
    rep(i,0,n) {s+=((n-i)*a[i]); s2+=b[i];}
    // cout<<s<<" "<<s2<<endl;
    cout<<s2-s;
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
