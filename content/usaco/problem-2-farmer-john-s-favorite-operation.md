---
problemName: "Problem 2 Farmer John's Favorite Operation"
contest: "USACO Silver"
difficulty: "Silver"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/USACO-Sols"
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

// int median(int *a, int n) {
//     if (n%2) {
//         return a[(n+1)/2];
//     } else {
//         return a[n/2]
//     }
// }

//pref 1 based pls

lli neg_rev_sum(lli x, lli m, vector<ll int> &a, vector<ll int> &pref, int ci) {
    int n = a.size();
    auto it = lower_bound(all(a), x - m/2); 
    if (it == a.begin()) {return 0;}
    it--;
    int idx = abs(distance(it, a.begin()));
    return pref[idx+1] - (idx + 1)*(x-m);

}

lli neg_sum(lli x, lli m, vector<ll int> &a, vector<ll int> &pref, int ci) {
    int n = a.size();
    auto it = lower_bound(all(a), x - m/2); 
    int idx = abs(distance(it, a.begin())); //first element in neg_sum range
    lli pfsum = pref[ci+1] - pref[idx-1+1];
    return (ci - idx + 1)*(x) - pfsum;
}

lli pos_sum(lli x, lli m, vector<ll int> &a, vector<ll int> &pref, int ci) {
    int n = a.size();
    auto it = upper_bound(all(a), x + m/2);
    it--;
    int idx = abs(distance(it, a.begin()));
    lli sufsum = pref[idx+1] - pref[ci - 1+1]; 
    // int idx = abs(distance(it, a.begin())); //first element in neg_sum range
    return sufsum - (idx - ci + 1)*x;
}

lli pos_rev_sum(lli x, lli m, vector<ll int> &a, vector<ll int> &pref, int ci) {
    int n = a.size();
    auto it = upper_bound(all(a), x + m/2);
    if (it == a.end()) {return 0;}
    int idx = abs(distance(it, a.begin()));
    lli sufsum = pref[n-1+1] - pref[idx-1+1]; 
    // int idx = abs(distance(it, a.begin())); //first element in neg_sum range
    // cout<<idx<<" "<<sufsum<<" "<<m<<" "<<x<<endl;
    // cout<<(n-1-idx+1)*(m-x)<<endl;
    return (n-1-idx+1)*(m+x) - sufsum;
}

lli compute(lli x, lli m, vector<ll int> &a, vector<ll int> &pref, int ci) {
    int n = a.size();
    //a has to be sorted
    //neg rev
    lli nrsum = neg_rev_sum(x,m,a,pref,ci); 
    lli nsum = neg_sum(x,m,a,pref,ci);
    lli psum = pos_sum(x,m,a,pref,ci);
    lli prsum = pos_rev_sum(x,m,a,pref,ci);
    // return nsum;
    // cout<<nrsum<<" "<<nsum<<" "<<psum<<" "<<prsum<<endl; 
    return nrsum + nsum + psum + prsum;
}

void solve() {
    ll int n,m;
    cin>>n>>m;
    vector<lli> a(n);
    rep(i,0,n) {cin>>a[i]; a[i] = a[i]%m;}
    // map<int,int> mp;
    sort(all(a));
    vector<int> uq;
    uq.pb(a[0]);
    int l=1;
    map<int,int> mpi;
    mpi[a[0]]=0;
    rep(i,1,n-1) {
        if (a[i]!=uq[l-1]) {mpi[a[i]]=i; uq.pb(a[i]); l++;}
    }
    // for(auto x:a) {cout<<x<<" ";} cout<<endl;
    vector<lli> pref(n+1,0);
    rep(i,1,n) {
        pref[i] = pref[i-1] + a[i-1];
    }
    // rep(i,0,n) {cout<<a[i]<<" ";} cout<<endl;
    lli gans = INT64_MAX;
    for(int i = 0;i<uq.size();i++) {
        // cout<<"current "<<a[i]<<endl;
        gans = min(gans, compute(uq[i], m, a, pref, mpi[uq[i]]));
    }
    
    // rep(i,0,n) {ans += min({abs(median - a[i]), abs(median - a[i] + m), abs(median - a[i] - m)});}
    
    cout<<gans<<endl;
}

int main() {
    //add quotes incase input output file
    //freopen(input.txt,r,stdin);
    //freopen(output.txt,w,stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
