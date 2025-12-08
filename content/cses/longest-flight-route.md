---
problemName: "Longest Flight Route"
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
    ll int n,m,a,b;
    cin>>n>>m;
    vector<vector<pair<ll int,ll int>>> v(n+1, vector<pair<ll int,ll int>>());
    
    rep(i,0,m) {
        cin>>a>>b;
        v[a].pb({b,-1});
    }
    map<ll int,ll int> mp;
    priority_queue<pair<ll int,ll int>, vector<pair<ll int,ll int>>, greater<pair<ll int,ll int>>> pq;
    pq.push({0,1});
    vector<ll int> dist(n+1,INT64_MAX);
    dist[1] = 0;
    mp[1] = -1;
    while(!pq.empty()) {
        pair<ll int,ll int> cur = pq.top();
        pq.pop();
        ll int curcity = cur.second;
        ll int curdis = cur.first;
        // if (curcity == n) {break;}
        if (dist[curcity] < curdis) {continue;}
        for(auto x:v[curcity]) {
            ll int descity = x.first;
            ll int totaldist = curdis + x.second;
            if (totaldist < dist[descity]) {
                mp[descity] = curcity;
                // cout<<"alloting parent "<<curcity<<" to "<<descity<<endl;
                pq.push({totaldist, descity});
                dist[descity] = totaldist;
            }
        }
    }
    if (dist[n]==INT64_MAX) {cout<<"IMPOSSIBLE\n";} else {
    int c = n;
    vector<int> ans;
    while(1) {
        ans.pb(c);
        c = mp[c];
        if (c==1) {break;}
    }
    cout<<ans.size()+1<<endl;
    cout<<1<<" ";
    reverse(all(ans));
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
