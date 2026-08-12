---
problemName: "Problem 1 Cow Gymnastics"
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
    int k,n;
    cin>>k>>n;
    int a[k][n];
    map<pair<int,int>, int> mp;
    rep(i,0,k) {
        rep(j,0,n) {
            cin>>a[i][j];
            mp[{i, a[i][j]}]=j;
        }
    }      
    int cnt=0;
    rep(i,1,n) {
        rep(j,i,n+1-i) {
            set<bool> S;
            rep(z,0,k) {
                S.insert((mp[{z,i}]-mp[{z,j}]) > 0);
            }
            
            if (S.size()==1) {cnt++;}
        }
    }
    cout<<cnt-n<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("gymnastics.in","r",stdin);
    freopen("gymnastics.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
