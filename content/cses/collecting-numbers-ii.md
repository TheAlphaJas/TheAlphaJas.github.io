---
problemName: "Collecting Numbers II"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Maintain the round count from Collecting Numbers and update it incrementally after each swap by rechecking only the neighborhoods of the two swapped values."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Collecting_Numbers_II.cpp"
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
    vector<int> a(n);
    vector<int> pos(n+1,-1);
    rep(i,0,n) {cin>>a[i]; pos[a[i]]=i;}
    vector<pair<int,int>> changes(m);
    rep(i,0,m) {
        cin>>changes[i].first>>changes[i].second;
    }      
    int cnt=0;
    rep(i,2,n-1) {
        if (pos[i]<pos[i-1]) {cnt++;}
    }
    cnt++;
    // cout<<cnt<<endl;
    rep(i,0,m) {
        set<pair<int,int>> ct;
        ct.insert({a[changes[i].first-1]-1, a[changes[i].first-1]});
        ct.insert({a[changes[i].first-1], a[changes[i].first-1]+1});
        ct.insert({a[changes[i].second-1]-1, a[changes[i].second-1]});
        ct.insert({a[changes[i].second-1], a[changes[i].second-1]+1});
        int delta=0;
        for(auto &[x,y]:ct) {
            if (x>=1 && x<=n && y>=1 && y<=n) {
            delta-=(pos[y]<pos[x]);
            }
        }
        swap(pos[a[changes[i].first-1]], pos[a[changes[i].second-1]]);
        swap(a[changes[i].first-1], a[changes[i].second-1]);
        // rep(i,0,n) {cout<<a[i]<<" ";} cout<<endl;
        // rep(i,1,n) {cout<<pos[i]<<" ";} cout<<endl;
        for(auto &[x,y]:ct) {
            if (x>=1 && x<=n && y>=1 && y<=n) {
            delta+=(pos[y]<pos[x]);
            }
        }
        cnt+=delta;
        cout<<cnt<<endl;
        ct.clear();
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
