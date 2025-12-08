---
problemName: "Message Route"
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
    map<int,int> par;
    queue<int> q;
    q.push(1);
    bool fl=0;
    vector<bool> vis(n+1,0);
    while(!q.empty()) {
        int cur = q.front();
        if (cur == n) {fl=1; break;}
        q.pop();
        for(auto x:adj[cur]) {
            if (!vis[x]) {q.push(x); par[x]=cur; vis[x]=1;}
        }
    }
    if (fl) {
        vector<int> ans;
        int c = n;
        while(1) {
            ans.pb(c);
            c = par[c];
            if (c==1) {break;}
        }
        ans.pb(1);
        reverse(all(ans));
        cout<<ans.size()<<endl;
        for(auto x:ans) {cout<<x<<" ";}
        cout<<endl;
    } else {
        cout<<"IMPOSSIBLE\n";
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
