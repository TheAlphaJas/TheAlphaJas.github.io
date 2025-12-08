---
problemName: "Round Trip"
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

int finalnode = -1;

bool dfs(int n, vector<vector<int>> &adj, vector<bool> &vis, int cnt, vector<int> &visc, vector<int> &parent) {
    vis[n]=1;
    bool z=0;
    visc[n] = cnt;
    for(auto x:adj[n]) {
        if (vis[x]==1) {
            if (cnt - visc[x] >=2) {
                parent[x] = n;
                finalnode = x;
                return 1;
            }
        } else {
            parent[x]=n;
            z = z|dfs(x, adj, vis, cnt+1, visc, parent);
            if (z==1) {return 1;}
        }
    }
    return z;
}

void solve() {
    int n,m;
    cin>>n>>m;
    vector<vector<int>> adj(n+1, vector<int>());
    int a,b;
    rep(i,0,m) {
        cin>>a>>b;
        adj[a].pb(b);
        adj[b].pb(a);
    }      
    vector<bool> vis(n+1, 0);
    vector<int> parent(n+1, -1);
    vector<int> visc(n+1, INT_MAX);
    bool fl=0;
    for(int i =0;i<n;i++) {
        if (vis[i] == 0) {
        fl = dfs(i, adj, vis, 0, visc, parent);
        if (fl) {break;}
        }
    }
    if (fl==0) {cout<<"IMPOSSIBLE\n";} else {
        vector<int> ans;
        int f = finalnode;
        while(1) {
            ans.push_back(f);
            f = parent[f];
            if (f==finalnode) {
                ans.push_back(f);
                break;
            }
        }
        reverse(all(ans));
        cout<<ans.size()<<endl;
        for(auto x:ans) {cout<<x<<" ";}
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
