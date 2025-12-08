---
problemName: "Flight Routes"
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

void solve() {
    int n,m,k,a,b,c;
    cin>>n>>m>>k;
    vector<vector<pair<int,int>>> adj(n+1, vector<pair<int,int>>());
    rep(i,0,m) {
        cin>>a>>b>>c;
        adj[a].pb({b,c});
    }
    // cout<<"hi\n";
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    pq.push({0,1}); //city, cost
    vector<lli> dist(n+1,INT64_MAX);
    dist[1] = 0;
    int z=0;
    vector<int> ans;
    while(!pq.empty()) {
        pair<int,int> cur = pq.top();
        pq.pop();
        int curcity = cur.second;
        int curcost = cur.first;
        // cout<<"from "<<curcity<<" "<<curcost<<endl;
        if (curcity == n) {ans.push_back(curcost); dist[n]=INT64_MAX; }
        if (ans.size() == k) {break;}
        if (curcost > dist[curcity]) {continue;}
        for(auto x:adj[curcity]) {
            // cout<<"seeing "<<x.first<<" "<<x.second<<endl;
            // pq.push({dist[x.first], x.first});
            if (dist[x.first] >= curcost + x.second) {
                dist[x.first] = curcost + x.second;
                // cout<<"added "<<x.first<<" at "<<dist[x.first]<<endl;
                pq.push({dist[x.first], x.first});
            }
        }
        // cout<<"hu\n";
    }
    for(auto x:ans) {cout<<x<<" ";} cout<<endl;      
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
