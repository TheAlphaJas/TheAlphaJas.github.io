---
problemName: "Problem 2 Bovine Genomics"
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
    int n,k;
    cin>>n>>k;
    vector<vector<char>> sp(n,vector<char>(k)), pl(n,vector<char>(k));
    rep(i,0,n) {
        rep(j,0,k) {
            cin>>sp[i][j];
        }
    }
    rep(i,0,n) {
        rep(j,0,k) {
            cin>>pl[i][j];
        }
    }
    int cnt=0;
    rep(i,0,k) {
        rep(j,i+1,k-1-i) {
            rep(z,j+1,k-1-j) {
                //i,j,z
                set<tuple<int,int,int>> S;
                rep(o,0,n) {
                    S.insert({sp[o][i], sp[o][j], sp[o][z]});
                }
                bool bruh=0;
                rep(o,0,n) {
                    if (S.count({pl[o][i], pl[o][j], pl[o][z]})) {bruh=1; break;}
                }
                if (!bruh) {cnt++;}
            }
        }
    }
    cout<<cnt<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("cownomics.in","r",stdin);
    freopen("cownomics.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
