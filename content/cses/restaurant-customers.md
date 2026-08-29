---
problemName: "Restaurant Customers"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Sort arrivals and departures separately, binary searching departures to count customers still present at each arrival."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Restaurant_Customers.cpp"
---

## Solution

```cpp
#include <bits/stdc++.h>
using namespace std;
//author: von_Braun
#define ll long long
#define lli long long int
#define pb push_back
#define rep(var, start, num) for(long var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

void solve() {
    int n;
    cin>>n;
    vector<int> arr(n), dep(n);
    rep(i,0,n) {cin>>arr[i]>>dep[i];}
    sort(all(arr)); sort(all(dep));
    long ans{0};
    long ndep{0};
    rep(i,0,n) {
        auto it = upper_bound(all(dep), arr[i]);
        if (it!=dep.begin()){it--; ndep=abs(distance(dep.begin(),it))+1;}
        ans = max(ans, i+1-ndep);
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
