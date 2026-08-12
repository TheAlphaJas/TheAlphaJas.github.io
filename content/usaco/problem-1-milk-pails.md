---
problemName: "Problem 1 Milk Pails"
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
#define rep(var, start, num) for(lli var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

void solve() {
    ll int x,y,m;
    cin>>x>>y>>m;
    lli ans=0;
    rep(i,0,m/x +1){
        rep(j,0,m/y + 1){
            if (x*i + y*j <= m) {
                ans = max(ans, x*i + j*y);
            }
        }
    }
    cout<<ans<<endl;      
}

int main() {
    //add quotes incase input output file
    freopen("pails.in","r",stdin);
    freopen("pails.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
