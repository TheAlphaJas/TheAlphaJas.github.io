---
problemName: "Playlist"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Sliding window keeping the last-seen position of every song, shrinking the window whenever a repeat appears."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Playlist.cpp"
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
    ll n;
    cin>>n;
    vector<ll> a(n);
    rep(i,0,n) {cin>>a[i];}
    map<ll,bool> seen;
    map<ll,ll> pos;
    ll ans=0;
    ll runans=0;
    rep(i,0,n) {
        if (seen[a[i]]) {runans=min(i-pos[a[i]], runans+1); pos[a[i]]=i;} else {runans++; seen[a[i]]=1; pos[a[i]]=i;}
        ans=max(ans,runans);
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
