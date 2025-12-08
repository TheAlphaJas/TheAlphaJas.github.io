---
problemName: "Haybale Stacking"
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
    int n,k,l,r;
    cin>>n>>k;
    vector<lli> a(n+1,0);
    rep(i,0,k) {
        cin>>l>>r;
        if (r+1<=n) {
        a[r+1]--; a[l]++;} else {a[l]++;}
    }      
    for(int i=1;i<=n;i++) {a[i]+=a[i-1];}
    sort(all(a));
    cout<<a[(n+1)/2];
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
