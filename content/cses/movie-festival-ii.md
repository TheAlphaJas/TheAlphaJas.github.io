---
problemName: "Movie Festival II"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Greedy interval scheduling generalized to k halls, tracked as a multiset of k free end times."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Movie_Festival_II.cpp"
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
    vector<pair<int,int>> v(n);
    rep(i,0,n) {
        cin>>v[i].second>>v[i].first;
    }
    sort(all(v));
    int cnt{0};
    multiset<int> S;
    rep(i,0,k) {S.insert(0);}
    rep(i,0,n){
        auto it = S.upper_bound(v[i].second);
        if (it!=S.begin()) {
            it--;
            S.erase(it);
            S.insert(v[i].first);
            cnt++;
        }
    }
    cout<<cnt;
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
