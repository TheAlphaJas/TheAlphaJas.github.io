---
problemName: "Problem 2 Subsequences Summing To Sevens"
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
#define rep(var, start, num) for(int var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

void solve() {
    int n;
    cin>>n;
    long long int a[n];
    rep(i,0,n) {cin>>a[i];}
    a[0]=a[0]%7;
    rep(i,1,n-1) {a[i]+=a[i-1]; a[i]%=7;}
    pair<int,int> p[7];
    rep(i,0,7) {
        p[i].first = INT_MAX;
        p[i].second = INT_MIN;
        rep(j,0,n) {
            if (a[j] == i) {
                p[i].first = min(p[i].first,j);
                p[i].second = max(p[i].second,j);
            }
        }
    }
    int ans=0;
    ans = max(ans,p[0].second+1);
    rep(i,1,6) {
        ans = max(ans,p[i].second - p[i].first);
    }
    cout<<ans<<endl;
}
int main() {
    //add quotes incase input output file
    freopen("div7.in","r",stdin);
    freopen("div7.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
