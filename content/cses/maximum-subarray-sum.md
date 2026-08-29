---
problemName: "Maximum Subarray Sum"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Kadane's algorithm: extend the running sum while it helps, and reset once it turns negative."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Maximum_Subarray_Sum.cpp"
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
    ll a[n];
    ll ans=INT_MIN;
    rep(i,0,n) {cin>>a[i]; ans=max(ans,a[i]);}
    lli cs=0;
    rep(i,0,n) {
        if (cs>0) {
            ans=max(ans,cs+a[i]);
            cs+=a[i];
        } else {
            cs=a[i];
            ans=max(ans,a[i]);
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
