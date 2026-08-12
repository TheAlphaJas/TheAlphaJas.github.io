---
problemName: "A Maximum Distance"
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
    int x[n], y[n];
    rep(i,0,n) {cin>>x[i];}
    rep(i,0,n) {cin>>y[i];}
    lli ans=0;
    rep(i,0,n) {
        rep(j,0,n) {
            ans = max(ans, (lli)pow(x[i]-x[j],2)+(lli)pow(y[i]-y[j], 2));
        }
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
    // cin >> tc;/
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
