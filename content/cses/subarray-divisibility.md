---
problemName: "Subarray Divisibility"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Prefix sums modulo n, counting subarrays with remainder 0 via combinatorics on matching remainders."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Subarray_Divisibility.cpp"
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
    vector<ll> a(n);
    rep(i,0,n) {cin>>a[i];}
    vector<ll> pf(n);
    vector<ll> cnts(n,0);
    
    pf[0]=(a[0]%n+n)%n;
    cnts[pf[0]]++;
    rep(i,1,n-1) {
        pf[i] = ((pf[i-1]%n+n)%n + (a[i]%n+n)%n)%n;
        cnts[pf[i]]++;
    }   
    ll z=0;   
    rep(i,0,n) {
        ll tp = (cnts[i]*(cnts[i]-1))/2;
        z+=tp;
    }
    z+=cnts[0];
    cout<<z<<endl;
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
