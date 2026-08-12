---
problemName: "Problem 2 The Lazy Cow"
contest: "USACO Silver"
difficulty: "Silver"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/USACO-Sols"
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

lli computeksum(int i, int j, int k, vector<vector<lli>> &rowpref) {
    ll int n = rowpref.size();
    //forward, from ith row
    ll int ci=i;
    lli sum=0;
    // cout<<"n "<<n<<endl;
    while(1) {
        if (ci> i + k) {break;}
        if (ci >= n) {break;}
        ll int d = ci - i;
        ll int lj = j-(k-d)+1;
        ll int rj = j+(k-d)+1;
        lj = max(lj, 1LL);
        rj = min(rj, n);
        sum += (rowpref[ci][rj] - rowpref[ci][lj-1]);
        ci++;
    }
    //behind i
    ci=i-1;
    while(1) {
        if (ci< i - k) {break;}
        if (ci < 0) {break;}
        ll int d = i - ci;
        ll int lj = j-(k-d)+1;
        ll int rj = j+(k-d)+1;
        lj = max(lj, 1LL);
        rj = min(rj, n);
        sum += (rowpref[ci][rj] - rowpref[ci][lj-1]);
        ci--;
    }
    return sum;
}


void solve() {
    int n,k;
    cin>>n>>k;
    vector<vector<lli>> grid(n, vector<lli>(n, 0));
    rep(i,0,n) {
        rep(j,0,n) {
            cin>>grid[i][j];
        }
    }
    vector<vector<ll int>> rowpref(n, vector<lli>(n+1,0));
    vector<vector<ll int>> colpref(n+1, vector<lli>(n,0));
    //compute rowpref
    rep(i,0,n) {
        rep(j,1,n){
            rowpref[i][j] = rowpref[i][j-1] + grid[i][j-1];
        }
    }
    lli ans=INT64_MIN;
    rep(i,0,n) {
        rep(j,0,n) {
            ans = max(ans, computeksum(i, j, k, rowpref));
        }
    }
    cout<<ans<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("lazy.in","r",stdin);
    freopen("lazy.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
