---
problemName: "Sum of Four Values"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Fix the first two values, then two-pointer over the sorted remainder to complete the target sum."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Sum_of_Four_Values.cpp"
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
    ll n,x;
    cin>>n>>x;
    // vector<ll> a(n);
    vector<pair<ll,ll>> a(n);
    map<ll,ll> mp;
    bool fl=0;
    map<ll,ll> pos;
    rep(i,0,n) {cin>>a[i].first; a[i].second=i;}
    sort(all(a));
    auto twosum = [&](ll si, ll ts){
        int l = si;
        int r = n-1;
        while(l<r) {
            if (a[l].first + a[r].first < ts) {l++;}
            else if (a[l].first + a[r].first > ts) {r--;} 
            else {cout<<a[l].second+1<<" "<<a[r].second+1<<" "; return 1;}
        }
        return 0;
    };
    rep(i,0,n) {
        rep(j,i+1,n-1-i) {
            if (x-a[i].first-a[j].first < a[j].first) {break;}
            fl = twosum(j+1, x-a[i].first-a[j].first);
            if (fl) {cout<<a[i].second+1<<" "<<a[j].second+1<<endl; break;}
        }
        if (fl) {break;}
    }
    if (!fl) {cout<<"IMPOSSIBLE\n";}
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
