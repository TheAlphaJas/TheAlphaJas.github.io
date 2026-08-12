---
problemName: "Problem 1 Mixing Milk"
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

void dooperation(vector<int> &c, vector<int> &m, int i) {
    int cur=i%3;
    int nxt=(i+1)%3;
    int z = min(c[nxt] - (m[nxt]),m[cur]);
    // cout<<cur<<" "<<nxt<<endl;
    // cout<<z<<endl;
    m[cur]-=z;
    m[nxt]+=z;
}

void solve() {
    vector<int> c(3), m(3);
    rep(i,0,3) {
        cin>>c[i]>>m[i];
    }      
    rep(i,0,100) {
        dooperation(c,m,i);
    }
    cout<<m[0]<<endl<<m[1]<<endl<<m[2]<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("mixmilk.in","r",stdin);
    freopen("mixmilk.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
