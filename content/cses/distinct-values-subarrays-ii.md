---
problemName: "Distinct Values Subarrays II"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Sliding window capped at k distinct values, growing and shrinking the window while summing valid subarray lengths."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Distinct_Values_Subarrays_II.cpp"
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
    ll n,k;
    cin>>n>>k;
    vector<ll> a(n);
    rep(i,0,n) {cin>>a[i];}
    map<ll,ll> mp;
    ll uc=0;
    ll l = 0, r=0;
    mp[a[0]]++; uc=1;
    rep(i,1,n-1) {
        if (mp[a[i]]==0) {if (uc==k) {r=i-1; break;} else {uc++;}}
        r++; mp[a[i]]++;
    }

    ll z{0};
    if (r!=n-1) {z+=(r-l+1);}
    // cout<<l<<" "<<r<<endl;
    // increase till last k
    while(l<=r) {
        if (r==n-1) {break;}
        mp[a[l]]--;
        if (mp[a[l]]==0) {uc--;}
        //increase l by one.
        l++;
        for(int j = r+1;j<n;j++) {
            if (mp[a[j]]==0) {if (uc==k) {break;} else {uc++;}}
            r++; mp[a[j]]++;
        }
        //increase r till max k
        // cout<<l<<" "<<r<<endl;
        if (r==n-1) {break;}
        z += (r-l+1);
        // cout<<"Z "<<z<<endl;
        //else ans += length
        //back to start
    }
    // add last arr term
    // cout<<(((r-l+1)*(r-l+2))/2)<<endl;
    z += (((r-l+1)*(r-l+2))/2);
    cout<<z;
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
