---
problemName: "Building Teams"
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

bool dfs(int n, int k, vector<vector<int>> &adj, vector<bool> &vis, vector<bool> &par) {
    vis[n] = 1;
    par[n] = k%2;
    bool z=0;
    for(auto x:adj[n]) {
        if (vis[x]) {
            if (par[x] == k) {return 1; }
            //1 means fucked
        } else {
            z=z|dfs(x, (k+1)%2, adj, vis, par);
        }
    }
    return z;
}

void solve() {
    int n,m, a,b;
    cin>>n>>m;
    vector<vector<int>> adj(n+1, vector<int>());
    rep(i,0,m) {
        cin>>a>>b;
        adj[a].pb(b);
        adj[b].pb(a);
    }
    vector<bool> vis(n+1,0), par(n+1,0);
    bool z=0;
    rep(i,1,n) {
        if (!vis[i]) {
            z=z|dfs(i, 0, adj, vis, par);
        }
    }
    if (z) {cout<<"IMPOSSIBLE\n";} else {
        rep(i,1,n) {
            cout<<par[i]+1<<" ";
        }
        cout<<endl;
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
