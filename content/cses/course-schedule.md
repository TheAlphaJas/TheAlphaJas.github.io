---
problemName: "Course Schedule"
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

bool cdfs(int i, vector<int> &vis, vector<int> &cvis, vector<vector<int>> &v) {
    vis[i] = 1;
    cvis[i] = 1;
    // cout<<"d called "<<i<<endl;
    bool z=0;
    for(auto x:v[i]) {
        // cout<<"exp v "<<x<<endl;
        if (cvis[x]==1) {cvis[i]=0; return 1;}
        if (!vis[x]) {
            z=z|cdfs(x, vis, cvis, v);
        }
    }
    cvis[i] = 0;
    // cout<<"dfs at "<<i<<" , returning "<<z<<endl;
    return z;
}


void dfs(int i, vector<int> &ans, vector<vector<int>> &v, vector<int> &vis) {
    vis[i]=1;
    for(auto x:v[i]) {
        if (!vis[x]) {dfs(x, ans, v, vis);}
    }
    ans.pb(i);
}

void solve() {
    int n,m;
    cin>>n>>m;
    int a,b;
    vector<vector<int>> v(n+1, vector<int>());
    //a has to be completed before b
    rep(i,0,m) {
        cin>>a>>b;
        v[b].pb(a);
    }    

    vector<int> vis(n+1, 0);
    vector<int> ans;

    //cycle check
    bool z=0;
    vector<int> cvis(n+1,0);
    for(int i = 1;i<=n;i++) {
        if (!vis[i]) {
            // cout<<"cdfs at "<<i<<" : "<<cdfs(i, vis, cvis, v)<<endl;
            z = z|cdfs(i, vis, cvis, v);
        }
    }
    // cout<<z<<endl;
    if (z) {cout<<"IMPOSSIBLE\n";} else {
    vis.assign(n+1,0);
    for(int i=1;i<=n;i++) {
        if (!vis[i]) {dfs(i, ans, v, vis);}
    }
    // reverse(all(ans));
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
