---
problemName: "Shortest Routes II"
problemNumber: ""
difficulty: "Hard"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols"
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
ulli adj[501][501];

void solve() {
    ull int n,m,q;
    cin>>n>>m>>q;
    ull int a,b,c;
    rep(i,0,501) {
        rep(j,0,501) {
            if (i!=j) {
            adj[i][j] = INT64_MAX; }
            else {adj[i][j] = 0;}
            
        }
    }

    rep(i,0,m) {
        cin>>a>>b>>c;
        adj[a][b]=min(c, adj[a][b]);
        adj[b][a]=adj[a][b];
    }    

    rep(j,1,500) {
        rep(i,1,500) {
            rep(k,1,500) {
                adj[i][k] = min(min(adj[i][k], adj[k][i]), min(adj[i][j], adj[j][i]) + min(adj[j][k], adj[k][j]));
                adj[k][i] = min(adj[i][k], adj[k][i]);
            }
        }
    }

    rep(i,0,q) {
        cin>>a>>b;
        ll int ans = min(adj[a][b], adj[b][a]);
        if (ans == INT64_MAX) {ans = -1;}
        cout<<ans<<endl;
    }
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
