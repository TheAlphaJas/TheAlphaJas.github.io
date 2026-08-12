---
problemName: "Problem 2 Daisy Chains"
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
#define rep(var, start, num) for(lli var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

void solve() {
    lli n;
    cin>>n;
    vector<lli> a(n+2,0);
    map<lli,vector<lli>> mp;
    rep(i,1,n) {cin>>a[i]; mp[a[i]].pb(i); a[i]+=a[i-1];}
    // rep(i,1,n) {cout<<a[i]<<" ";} cout<<endl;
    int cnt=0;
    rep(i,1,n) {
        rep(j,i,n-i+1) {
            if (((a[j]-a[i-1])%(j-i+1))==0) {
                int z = ((a[j]-a[i-1])/(j-i+1));
                auto x = lower_bound(all(mp[z]), i);
                if (x == mp[z].end()) {continue;}
                if (*x <= j) {cnt++;}
                // if ((abs(distance(x,mp[z].begin()))<=j) && (abs(distance(x,mp[z].begin()))>=i)) {cnt++;}
                // if (mp[]>0) {cnt++;}
            }
        }
    }
    cout<<cnt<<endl;
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
