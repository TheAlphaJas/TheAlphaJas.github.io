---
problemName: "Game Routes"
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
lli MOD = 1e9 + 7;

lli nways(int i, vector<vector<int>> &adj, vector<ll int> &dp) {
    if (i==1) {return 1;}
    if (dp[i]!=-1) {return dp[i];}
    lli ans = 0;
    for(auto x:adj[i]) {
        ans = (ans%MOD + nways(x,adj,dp)%MOD)%MOD;
    }
    return dp[i] = ans;
}

void solve() {
    int n,m,a,b;
    cin>>n>>m;
    vector<vector<int>> adj(n+1, vector<int>());
    rep(i,0,m) {
        cin>>a>>b;
        adj[b].pb(a);
    }
    vector<lli> dp(n+1,-1);      
    cout<<nways(n, adj, dp);

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
