---
problemName: "Distinct Values Subarrays"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Sliding window tracking the most recent duplicate position, counting subarrays ending at i with all distinct values."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Distinct_Values_Subarrays.cpp"
---

## Solution

```cpp
#include <bits/stdc++.h>
using namespace std;
//author: von_Braun
#define ll long long
#define lli long long int
#define pb push_back
#define rep(var, start, num) for(ll var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

void solve() {
    ll n;
    cin>>n;
    vector<ll> a(n);
    rep(i,0,n) {cin>>a[i];}
    map<ll,ll> pos;
    map<ll,bool> seen;
    ll recent=-1;
    ll ans=0;
    rep(i,0,n) {
        if (seen[a[i]]) {recent=max(recent,pos[a[i]]);} else {seen[a[i]]=1;}
        pos[a[i]]=i;
        ans += (i-recent);
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
