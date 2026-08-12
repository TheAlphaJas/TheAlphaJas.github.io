---
problemName: "Problem 3 Load Balancing"
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

lli countmax(int x, int y, vector<lli> &X, vector<lli> &Y) {
    int n = X.size();
    lli lnl=0,lg=0,gl=0,gg=0;
    rep(i,0,n) {
        if (X[i]<x && Y[i]<y) {lnl++;}
        else if (X[i]<x && Y[i]>y) {lg++;}
        else if (X[i]>x && Y[i]<y) {gl++;}
        else if (X[i]>x && Y[i]>y) {gg++;}
    }
    return max({lnl,lg,gl,gg});
}

void solve() {
    lli n,b;
    cin>>n>>b;
    vector<lli> x(n), y(n);
    vector<lli> xs, ys;
    rep(i,0,n) {
        cin>>x[i]>>y[i];
        xs.pb(x[i]);
        ys.pb(y[i]);
    }      
    sort(all(xs));
    sort(all(ys));
    int nx = xs.size();
    int ny = ys.size();
    lli ans=INT_MAX;
    rep(i,0,nx+1) {
        rep(j,0,ny+1) {
            if (i==nx && j<ny) {
                ans = min(ans, countmax(xs[i-1]+1, ys[j]-1,x,y));
                
            } else if (i==nx && j==ny) {
                ans = min(ans, countmax(xs[i-1]+1, ys[j-1]+1,x,y));
            } else if (i<nx && j==ny) {
                ans = min(ans, countmax(xs[i]-1, ys[j-1]+1,x,y));
            } else {
            ans = min(ans, countmax(xs[i]-1, ys[j]-1,x,y));}
        }
    }
    cout<<ans<<endl;
    
}

int main() {
    //add quotes incase input output file
    freopen("balancing.in","r",stdin);
    freopen("balancing.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
