---
problemName: "Problem 3 Cow Tipping"
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
    int n;
    cin>>n;
    char x;
    vector<vector<int>> v(n, vector<int>(n));
    rep(i,0,n) {
        rep(j,0,n) {
            cin>>x;
            v[i][j] = x-'0';
            // cin>>v[i][j];
        }
    }         
    int cnt=0;
    int ans=0;
    for(int i = n-1;i>=0;i--) {
        for(int j = n-1;j>=0;j--) {
            if (v[i][j] == 1-cnt) {cnt=1-cnt; ans++;}
        }
    }
    cout<<ans<<endl;
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
