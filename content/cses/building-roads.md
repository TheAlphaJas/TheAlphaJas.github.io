---
problemName: "Building Roads"
problemNumber: ""
difficulty: "Hard"
topic: "Graphs"
topics:
  - "Graphs"
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

void dfs(int i, vector<vector<int>> &adj, vector<bool> &vis) {
    vis[i]=1;
    for(auto x:adj[i]) {
        if (!vis[x]) {dfs(x, adj, vis);}
    }
}

void solve() {
    int n,m;
    cin>>n>>m;
    int a,b;
    vector<vector<int>> adj(n+1, vector<int>());
    rep(i,0,m) {
        cin>>a>>b;
        adj[a].pb(b);
        adj[b].pb(a);
    }      
    vector<int> as;
    vector<bool> vis(n+1,0);
    for(int i = 1;i<=n;i++) {
        if (!vis[i]) {
            as.pb(i);
            dfs(i, adj, vis);
        }
    }
    cout<<as.size()-1<<endl;
    for(int i=0;i<as.size()-1;i++) {
        cout<<as[i]<<" "<<as[i+1]<<endl;
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
