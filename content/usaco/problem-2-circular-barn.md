---
problemName: "Problem 2 Circular Barn"
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
    int a[n];
    lli s=0;
    rep(i,0,n) {cin>>a[i]; s+=a[i];}
    lli tans=0;
    rep(i,0,n) {tans+=i*a[i];}
    lli ans=tans;
    rep(i,1,n-1) {
        tans-=(s-a[i-1]);
        tans+=(n-1)*(a[i-1]);
        // cout<<tans<<endl;
        ans = min(ans,tans);
    }
    cout<<ans<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("cbarn.in","r",stdin);
    freopen("cbarn.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
