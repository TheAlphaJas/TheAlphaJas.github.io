---
problemName: "C Good Subarrays"
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

lli C2(ll int n) {
    lli s = n*(n-1);
    return s/2;
}

void solve() {
    int n;
    cin>>n;
    char a1[n];
    lli a[n];
    rep(i,0,n) {cin>>a1[i]; a[i] = a1[i]-'0';}
    map<lli,lli> mp;
    mp[a[0] - 1]++;
    set<int> S;
    S.insert(a[0] - 1);
    rep(i,1,n-1) {
        a[i]+=a[i-1];
        mp[a[i] - (i+1)]++;
        S.insert(a[i] - (i+1));
    }
    lli ans=0;
    for(auto x:S){
        ans += C2(mp[x]);
    }
    cout<<ans + mp[0]<<endl;
}

int main() {
    //add quotes incase input output file
    //freopen(input.txt,r,stdin);
    //freopen(output.txt,w,stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
