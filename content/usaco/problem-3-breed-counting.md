---
problemName: "Problem 3 Breed Counting"
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

void solve() {
    int n,q;
    cin>>n>>q;
    vector<vector<lli>> a(n+1,vector<lli>(3,0));
    int temp;
    rep(i,0,n) {
        cin>>temp;
        a[i+1][temp-1]=1;
        a[i+1][0]+=a[i][0];
        a[i+1][1]+=a[i][1];
        a[i+1][2]+=a[i][2];
    }   
    int l,r;   
    rep(i,0,q) {
        cin>>l>>r;
        cout<<a[r][0]-a[l-1][0]<<" "<<a[r][1]-a[l-1][1]<<" "<<a[r][2]-a[l-1][2]<<endl;
    }
}

int main() {
    //add quotes incase input output file
    freopen("bcount.in","r",stdin);
    freopen("bcount.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
