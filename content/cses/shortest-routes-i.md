---
problemName: "Shortest Routes I"
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
    ll int n,m;
    ll int a,b,c;
    cin>>n>>m;
    vector<pair<ll int, ll int>> adj[n+1];
    rep(i,0,m) {
        cin>>a>>b>>c;
        adj[a].pb({b,c});
    }      
    priority_queue<pair<ll int,ll int>, vector<pair<ll int,ll int>>, greater<pair<ll int,ll int>>> pq;
    pq.push({0,1});
    lli dist[n+1];
    for(int i = 1;i<=n;i++) {dist[i] = INT64_MAX;}
    dist[1] = 0;
    while(!pq.empty()) {
        pair<ll int,ll int> cur = pq.top();
        ll int curnode = cur.second;
        ll int curdis = cur.first;
        pq.pop();
        if (curdis > dist[curnode]) continue;
        for(auto x:adj[curnode]) {
            ll int destnode = x.first;
            ll int edist = x.second;
            if (dist[destnode] > curdis + edist) {
                dist[destnode] = curdis + edist;
                pq.push({curdis + edist, destnode});
            }
        }
    }    
    for(ll int i = 1;i<=n;i++) {
        cout<<dist[i]<<" ";
    }
    cout<<endl;
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
