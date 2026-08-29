---
problemName: "Maximum Subarray Sum II"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Prefix sums plus a sliding multiset of window-start prefix sums to bound the subarray length between a and b."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Maximum_Subarray_Sum_II.cpp"
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
    int n,a,b;
    cin>>n>>a>>b;
    vector<ll> arr(n+1), pf(n+1,0);
    multiset<ll> pfs;
    ll ans{INT64_MIN};
    rep(i,1,n) {cin>>arr[i]; pf[i]=(pf[i-1]+arr[i]);}
    rep(i,1,n) {
        if (i>=a) {
            pfs.insert(pf[i-a]);
            ans=max(ans, pf[i]-(*pfs.begin()));
        } 
        if (i>=b) {
            pfs.erase(pfs.find(pf[i-b]));
        }
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
