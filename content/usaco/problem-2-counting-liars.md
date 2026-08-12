---
problemName: "Problem 2 Counting Liars"
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
    vector<int> gs, ls;
    int n,k;
    char x;
    cin>>n;
    rep(i,0,n) {
        cin>>x>>k;
        if (x=='G') {gs.pb(k);} else {ls.pb(k);}
    }
    sort(all(gs));
    sort(all(ls));
    int ng = gs.size();
    int nl = ls.size();
    // cout<<ng<<" "<<nl<<endl;
    lli ans = INT_MAX;
    rep(i,0,ng) {
        rep(j,0,nl) {
            if (gs[i]<=ls[j]) { ans=min(ans,(lli)(ng-1-i+j));}
        }
    }
    if (ans!=INT_MAX) {
    cout<<ans<<endl;} else {cout<<min(nl,ng)<<endl;}
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
