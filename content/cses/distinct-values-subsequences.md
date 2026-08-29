---
problemName: "Distinct Values Subsequences"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Count value frequencies, then multiply (count + 1) across all values and subtract 1 for the empty subsequence."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Distinct_Values_Subsequences.cpp"
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
ll MOD=1e9 + 7;
void solve() {
    int n,k;
    cin>>n;
    map<ll,ll> mp;
    rep(i,0,n) {cin>>k; mp[k]++;}
    ll ans=1;
    for(auto x:mp) {
        ans=(ans%MOD*(x.second + 1)%MOD)%MOD;
    }      
    ans--;
    ans=ans%MOD;
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
