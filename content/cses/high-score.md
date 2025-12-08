---
problemName: "High Score"
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
//just check if node a and b are connected or not.

// void bfs(int n, vector<vector<ll int>> &adj, int v, vector<int> &vis) {
//     vis[n] = v;
//     for(auto x:adj[n]) {
//         if (vis[x] == 0) {
//             dfs(x, adj, v, vis);
//         }
//     }
// }

void dijkstra(vector<vector<ll int>> &adj, int n, vector<lli> &dist) {
    priority_queue<pair<lli,lli>, vector<pair<lli,lli>>, greater<pair<ll,ll>>> pq;
    // vector<int> dist(n+1,INT_MAX);
    pq.push({0, n});
    dist[n] = 0;
    while(!pq.empty()) {
        pair<lli,lli> sn = pq.top();
        pq.pop();
        int curnode = sn.second;
        int curdis = sn.first;
        if (dist[curnode] < curdis) {continue;}
        for(auto x:adj[curnode]) {
            if (dist[curnode] + 1 < dist[x]) {
                dist[x] = 1 + dist[curnode];
                pq.push({dist[x], x});
            }
        }
    }
}

void solve() {
    ll int n,m,a,b,c;
    cin>>n>>m;
    vector<vector<ll>> adj(n+1), adjr(n+1);
    vector<tuple<ll int,ll int,ll int>> v;
    rep(i,0,m) {
        cin>>a>>b>>c;
        v.pb({a,b,c});
        adj[b].pb(a);
        adjr[a].pb(b);
    }       

    vector<ll int> dist1(n+1,INT64_MAX-10), dist2(n+1, INT64_MAX-10);
    int z=1;
    dijkstra(adj, n, dist1);
    dijkstra(adjr, 1, dist2);
    // for(int i = 1;i<=n;i++) {cout<<vis[i]<<" ";} cout<<endl;
    vector<ll int> dist(n+1,INT64_MIN+10);
    dist[1] = 0;
    rep(i,0,n+1) {
        rep(j,0,m) {
            ll int sn = get<0>(v[j]);
            ll int en = get<1>(v[j]);
            ll int x = get<2>(v[j]);
            if (!((dist[sn]==INT64_MIN + 10) && x < 0)) {
            dist[en] = max(dist[sn] + x, dist[en]);
            }
        }
    }
    bool fl=0;
    rep(j,0,m) {
            ll int sn = get<0>(v[j]);
            ll int en = get<1>(v[j]);
            ll int x = get<2>(v[j]);
            if (dist[en] < dist[sn] + x) {
                // cout<<"hi\n";
                // if (vis[en] == vis[n]) {
                // fl=1; break;
                // }
                if ((dist1[sn] != INT64_MAX-10||dist1[en]!=INT64_MAX-10) && (dist2[sn]!=INT64_MAX-10||dist2[en]!=INT64_MAX-10)) {fl=1; break;}
                //check if path exists from en to n
            }
            
            if (!((dist[sn]==INT64_MIN + 10) && x < 0)) {
            dist[en] = max(dist[sn] + x, dist[en]);
            }
            // dist[en] = max(dist[sn] + x, dist[en]);
    }
    if (fl) {cout<<"-1\n";} else {cout<<dist[n]<<endl;}
    cout<<INT64_MAX - dist[n]<<endl;
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
