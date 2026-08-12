---
problemName: "Problem 3 Watching Mooloo"
contest: "USACO Bronze"
difficulty: "Bronze"
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

void solve() {
    ll int n,k;
    cin>>n>>k;
    ll int d[n];
    rep(i,0,n) {cin>>d[i];}
    //d+K
    ll int nd = 1;
    lli tstarts = 1;
    bool running=1;
    rep(i,1,n-1) {
        if (d[i]==d[i-1]+1) {nd++;} else {
            if (d[i] - d[i-1] - 1 > k) {
                tstarts++;
                nd++;
            } else {
                nd+=(d[i] - d[i-1]);
            }
        }
    }    
    cout<<k*tstarts + nd<<endl;  
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
