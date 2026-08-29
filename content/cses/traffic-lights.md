---
problemName: "Traffic Lights"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Maintain a multiset of light positions and a parallel multiset of gap lengths, updating both as each new light is added."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Traffic_Lights.cpp"
---

## Solution

```cpp
#include <bits/stdc++.h>
using namespace std;
//author: von_Braun
#define ll long long
#define lli long long int
#define pb push_back
#define rep(var, start, num) for(ll var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

void solve() {
    ll n,m,k;
    cin>>n>>m;
    vector<ll> a(m);
    rep(i,0,m) {cin>>a[i];}
    multiset<ll> tlights;
    tlights.insert(0);
    tlights.insert(n);
    multiset<ll> dists;
    dists.insert(n);
    rep(i,0,m) {
        k= a[i];
        auto it1 = tlights.upper_bound(k);
        auto it2 = tlights.upper_bound(k);
        it2--;
        dists.erase(dists.find(*it1 - *it2));
        tlights.insert(k);
        dists.insert(*it1 - k); dists.insert(k - *it2);
        auto bruh = dists.end();
        bruh--;
        cout<<*bruh<<" ";
    }
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
