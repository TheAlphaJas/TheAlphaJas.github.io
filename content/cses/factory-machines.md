---
problemName: "Factory Machines"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Binary search on time, checking whether all machines together can produce enough units by that time."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Factory_Machines.cpp"
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
    ull n,m;
    cin>>n>>m;
    vector<ull> a(n);
    rep(i,0,n) {cin>>a[i];}
    ull l = 0;
    ull r = INT64_MAX;
    auto checkbruh = [&](ull time){
        ull s=0;
        rep(i,0,n) {s+=(time/a[i]);}
        return (s>=m);
    };
    while(l!=r) {
        if (r-l==1) {break;}
        ull m = (l+r)/2;
        if (checkbruh(m)) {
            r=m;
        } else {
            l=m+1;
        }
    }      
    if (checkbruh(l)) {cout<<l;} else {cout<<r;}
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
