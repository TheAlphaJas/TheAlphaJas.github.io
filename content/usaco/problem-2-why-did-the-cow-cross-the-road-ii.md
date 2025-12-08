---
problemName: "Problem 2 Why Did The Cow Cross The Road II"
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
    ll int n,k,b,x;
    cin>>n>>k>>b;
    vector<lli> a(n+1,0);
    rep(i,0,b) {
        cin>>x;
        a[x]=1;
    }
    rep(i,1,n) {a[i]+=a[i-1];}
    ll int ans = INT_MAX;
    for(int i=0;i+k<=n;i++) {
        ans = min(ans,a[i+k]-a[i]);
    }
    cout<<ans<<endl;
}
int main() {
    //add quotes incase input output file
    freopen("maxcross.in","r",stdin);
    freopen("maxcross.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
