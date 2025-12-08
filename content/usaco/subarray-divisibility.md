---
problemName: "Subarray Divisibility"
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
    int n;
    cin>>n;
    vector<ll int> a(n), div(n,0);
    rep(i,0,n) {cin>>a[i];}   
    a[0] = a[0]%n;
    div[a[0]]++;
    rep(i,1,n-1) {a[i]+=a[i-1]; a[i]%=n; if(a[i]<0) {a[i]+=n;} div[a[i]%n]++;}
    lli ans=0;
    div[0]++;
    rep(i,0,n) {
        ulli z = div[i]*(div[i]-1);
        z=z/2;
        ans += z;
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
