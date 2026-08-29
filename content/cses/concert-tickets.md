---
problemName: "Concert Tickets"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Keep ticket prices in a multiset and use upper_bound to find the most expensive ticket within each customer’s budget."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Concert_Tickets.cpp"
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
    int n,m;
    cin>>n>>m;
    multiset<int> S;
    int k;
    rep(i,0,n) {cin>>k; S.insert(k);}
    rep(i,0,m) {
        cin>>k;
        auto it = S.upper_bound(k);
        if (it == S.begin()) {cout<<"-1\n";} else {
            it--;
            cout<<*it<<endl;
            S.erase(it);
        }
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
