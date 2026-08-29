---
problemName: "Subarray Sums I"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Prefix sums with a hashmap of counts to find subarrays summing to a fixed target."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Subarray_Sums_I.cpp"
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
    ll n, k;
    cin>>n>>k;
    vector<ll> a(n);
    rep(i,0,n) {cin>>a[i];}
    vector<ll> pf(n);
    pf[0]=a[0];
    rep(i,1,n-1) {
        pf[i]+=(pf[i-1]+a[i]);
    }
    map<ll,ll> mp;
    mp[pf[n-1]]++;
    lli z{0};
    for(int i = n-2;i>=0;i--) {
        z+=(mp[pf[i]+k]);
        mp[pf[i]]++;
    }
    z+=mp[k];
    cout<<z<<endl;
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
