---
problemName: "Array Division"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Binary search on the maximum subarray sum, greedily checking whether that limit needs at most k subarrays."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Array_Division.cpp"
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

bool checkpossible(vector<ll> &arr, ll s, ll k) {
    vector<ll> tmp;
    int n = arr.size();
    ll rs=arr[0];
    int mi{-1};
    while(1) {
        rs=arr[mi+1];
        mi++;
        bool fl=0;
        rep(i,mi+1,n-mi-1) {
            if (rs+arr[i] <= s) {rs+=arr[i]; mi++;} else {fl=1; tmp.pb(rs); rs=0; break;}
        }
        if (fl==0) {tmp.pb(rs); break;}
        if (mi==n-1) {break;}
    }
    sort(all(tmp));
    // cout<<"tmp for check of "<<s<<endl;
    // for(auto &x:tmp) {cout<<x<<" ";} cout<<endl; 
    if (tmp[0]==0) {return 0;}
    if (tmp[tmp.size()-1] > s) {return 0;}
    if (tmp.size()>k) {return 0;}
    return 1;
}

void solve() {
    int n,k;
    cin>>n>>k;
    vector<ll> arr(n);
    ll s{0};
    rep(i,0,n) {cin>>arr[i]; s+=arr[i];}
    ll l=0;
    ll r = s;
    while(r-l > 1) {
        ll m = (l+r)/2;
        // cout<<l<<" "<<r<<" "<<m<<endl;
        if (checkpossible(arr,m, k)) {
            r=m;
        } else {
            l=m+1;
        }
    }
    if (checkpossible(arr, l, k)) {cout<<l;} else {cout<<r<<endl;}
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
