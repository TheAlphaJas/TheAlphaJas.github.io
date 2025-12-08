---
problemName: "Flight Discount"
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
    ll int n,m;
    ll int a,b,c;
    cin>>n>>m;
    // cout<<n<<endl;
    vector<vector<pair<ll int,ll int>>> adj(n+1, vector<pair<ll int,ll int>>());
    rep(i,0,m) {
        cin>>a>>b>>c;
        adj[a].pb({b,c});
    }      
    priority_queue<tuple<ll int,ll int,ll int>, vector<tuple<ll int,ll int,ll int>>, greater<tuple<ll int,ll int,ll int>>> pq; //cost, rem c, city
    pq.push({0,1,1});
    vector<vector<ll int>> costs(n+1, vector<lli>(2, INT64_MAX));
    costs[1][0] = 0; //node, rem c
    costs[1][1] = 0;
    while(!pq.empty()) {
        tuple<ll int,ll int,ll int> cur = pq.top();
        pq.pop();
        ll int curcost = get<0>(cur);
        ll int remc = get<1>(cur);
        ll int curcity = get<2>(cur);
        // skio condition - add
        if (curcost > costs[curcity][remc]) {continue;}
        if (curcity == n) {break;}
        // cout<<"pq "<<curcost<<" "<<remc<<" "<<curcity<<endl;
        for(auto x:adj[curcity]) {
            ll int destcity = x.first;
            ll int ecost = x.second;
            if (remc == 1) {
                if (costs[destcity][1] > curcost + ecost) {
                    //add this
                    costs[destcity][1] = curcost + ecost;
                    pq.push({costs[destcity][1], 1, destcity});
                }
                if (costs[destcity][0] > curcost + ecost/2) {
                    //add this
                    costs[destcity][0] = curcost + ecost/2;
                    pq.push({costs[destcity][0], 0, destcity});
                }
            } else {
                if (costs[destcity][0] > curcost + ecost) {
                    //add this
                    costs[destcity][0] = curcost + ecost;
                    pq.push({costs[destcity][0], 0, destcity});
                }
            }
        }
    }
    cout<<min(costs[n][0], costs[n][1])<<endl;
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
