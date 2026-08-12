---
problemName: "Maximum Subarray Sum"
contest: "USACO Silver"
difficulty: "Silver"
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
    vector<lli> a(n);
    ll int minel = INT_MAX;
    rep(i,0,n) {cin>>a[i]; minel = min(minel, a[i]);}
    vector<lli> pref(n+1,0);
    ll int mine = 0;
    lli ans = a[0];
    pref[1] = a[0];
    mine = min(mine, a[0]);
    rep(i,2,n-1) {
        pref[i] = pref[i-1] + a[i-1];
        ans = max(ans, pref[i] - mine);
        mine = min(mine, pref[i]);
    }
    cout<<ans<<endl;
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
