---
problemName: "Subarray Sums II"
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
    lli n,x;
    cin>>n>>x;
    lli a[n];
    rep(i,0,n) {cin>>a[i];}
    map<lli,lli> exists;
    lli ans=0;
    if (a[0] == x) {ans++;}
    rep(i,1,n-1) {a[i]+=a[i-1]; if (a[i] == x) {ans++;}}
    exists[a[0]]++;
    rep(i,1,n-1) {
        ans += (exists[a[i]-x]);
        exists[a[i]]++;
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
