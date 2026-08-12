---
problemName: "Problem 2 Rectangular Pasture"
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

lli huh(int x, int y, vector<pair<int,int>> &v, int idx, map<int,vector<int>> &mp, vector<int> &Vx) {
    lli rv=0;
    int n = v.size();
    set<int> Ys;
    cout<<"huh called "<<x<<" "<<y<<endl;
    int nVx = Vx.size();
    for(int i = idx; i<nVx;i++) {
        auto z = lower_bound(all(mp[Vx[i]]), y);
        cout<<"for Vx[i] "<<Vx[i]<<" , found "<<abs(distance(z, mp[Vx[i]].end()))<<endl;
        rv+=abs(distance(z, mp[Vx[i]].end()));
    }
    return rv; 
}

void solve() {
    int n,x,y;
    cin>>n;
    vector<pair<int,int>> v;
    map<pair<int,int>,int> px;
    set<int> Sx;
    rep(i,0,n) {
        cin>>x>>y;
        Sx.insert(x);
        v.pb({x,y});
        px[{x,y}]=x;
    }      
    vector<int> Vx;
    for(auto x:Sx) {Vx.pb(x);}
    sort(all(v));
    map<int,vector<int>> mp;
    for(auto x:v) {
        mp[x.first].pb(x.second);
    }
    lli ans=0;
    rep(i,0,n) {
        ans+=huh(v[i].first, v[i].second, v, px[v[i]], mp, Vx);
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
