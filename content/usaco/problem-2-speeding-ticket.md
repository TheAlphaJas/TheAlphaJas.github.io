---
problemName: "Problem 2 Speeding Ticket"
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

int howmuchexceed(int i, vector<int> &psum_limit, vector<int> &psum_bessie, map<int,int> &mp_limit, map<int,int> &mp_bessie, vector<pair<int,int>> &limit, vector<pair<int,int>> &bessie) {
    auto f1 = upper_bound(all(psum_limit), i);
    f1--;
    auto f2 = upper_bound(all(psum_bessie), i);
    f2--;
    return (bessie[mp_bessie[*f2]].second - limit[mp_limit[*f1]].second);
}

void solve() {
    int n,m;
    cin>>n>>m;
    vector<pair<int,int>> limit(n), bessie(m);
    rep(i,0,n) {cin>>limit[i].first>>limit[i].second;}
    rep(i,0,m) {cin>>bessie[i].first>>bessie[i].second;}
    //proc limit
    int z=0;
    vector<int> psum_limit, psum_bessie;
    map<int,int> mp_limit, mp_bessie;
    rep(i,0,n) {
        psum_limit.pb(z);
        mp_limit[z]=i;
        z+=limit[i].first;
    }
    z=0;
    rep(i,0,m) {
        psum_bessie.pb(z);
        mp_bessie[z]=i;
        z+=bessie[i].first;
    }
    int ans= 0;
    rep(i,0,100) {
        // cout<<howmuchexceed(i, psum_limit, psum_bessie, mp_limit, mp_bessie, limit,bessie)<<endl;
        ans=max(ans, howmuchexceed(i, psum_limit, psum_bessie, mp_limit, mp_bessie, limit,bessie));
    }
    cout<<ans<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("speeding.in","r",stdin);
    freopen("speeding.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
