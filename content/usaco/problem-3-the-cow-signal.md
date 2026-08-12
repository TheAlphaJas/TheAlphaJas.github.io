---
problemName: "Problem 3 The Cow Signal"
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
    int n,m,k;
    cin>>n>>m>>k;
    vector<vector<char>> arr(n, vector<char>(m));
    rep(i,0,n) {
        rep(j,0,m) {
            cin>>arr[i][j];
        }
    }      
    rep(i,0,n) {
        rep(b,0,k) {
        rep(j,0,m) {
            rep(l,0,k) {
                cout<<arr[i][j];
            }
        }
        cout<<endl;
    }
    }
}

int main() {
    //add quotes incase input output file
    freopen("cowsignal.in","r",stdin);
    freopen("cowsignal.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
