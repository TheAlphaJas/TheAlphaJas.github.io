---
problemName: "Nested Ranges Check"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Sort ranges by (start, -end) and sweep once forward and once backward to mark containment."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Nested_Ranges_Check.cpp"
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
    vector<pair<int,int>> v(n);
    map<pair<int,int>,int> idx;
    rep(i,0,n) {
        cin>>v[i].first>>v[i].second;
        v[i].second=-v[i].second;
        idx[v[i]]=i;
    }      
    sort(all(v));
    int mr=-v[0].second;
    map<pair<int,int>, int> issub;
    issub[v[0]]=0;
    rep(i,1,n-1) {
        if (-v[i].second <= mr) {issub[v[i]]=1;}
        mr = max(mr, -v[i].second);
    }
    map<pair<int,int>, int> isdom;
    // vector<bool> isdom(n,0);
    isdom[v[n-1]]=0;
    int smallestend=-v[n-1].second;
    for(int i = n-2;i>-1;i--) {
        if (-v[i].second >= smallestend) {isdom[v[i]]=1;}
        smallestend = min(smallestend, -v[i].second);
    }
    vector<int> a1(n), a2(n);
    rep(i,0,n) {a1[idx[v[i]]]=isdom[v[i]];}
    rep(i,0,n) {a2[idx[v[i]]]=issub[v[i]];}
    rep(i,0,n) {cout<<a1[i]<<" ";} cout<<endl;
    rep(i,0,n) {cout<<a2[i]<<" ";}
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
