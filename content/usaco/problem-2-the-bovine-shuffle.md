---
problemName: "Problem 2 The Bovine Shuffle"
contest: "USACO Bronze"
difficulty: "Bronze"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/USACO-Sols"
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
    int k;
    map<int,int> mp;
    rep(i,0,n) {
        cin>>k;
        mp[k-1]=i;
    }
    int a[n];
    rep(i,0,n) {cin>>a[i];}
    vector<int> ans(n);
    rep(i,0,n) {
    ans[mp[mp[mp[i]]]]=a[i]; }
    rep(i,0,n) {cout<<ans[i]<<endl;}
}

int main() {
    //add quotes incase input output file
    freopen("shuffle.in","r",stdin);
    freopen("shuffle.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
