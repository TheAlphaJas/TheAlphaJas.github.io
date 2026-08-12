---
problemName: "Problem 1 Censoring Bronze"
contest: "USACO Bronze"
difficulty: "Bronze"
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

void checkandremove(vector<char> &v, string &b) {
    if (v.size()<b.size()) {return;}
    int n  = b.size();
    bool z=0;
    int vs=v.size();
    rep(i,0,n) {
        z|=(b[n-1-i]!=v[vs-1-i]);
        // cout<<z<<" "<<(b[n-1-i]!=v[n-1-i])<<endl;
    }
    if (!z) {
        rep(i,0,n) {v.pop_back();}
    }
}

void solve() {
    string a,b;
    cin>>a>>b;
    vector<char> v;
    for(auto x:a) {
        v.pb(x);
        checkandremove(v, b);
    }      
    for(auto x:v) {cout<<x;} cout<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("censor.in","r",stdin);
    freopen("censor.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
