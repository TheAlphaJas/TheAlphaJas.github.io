---
problemName: "H Queries For Number Of Palindromes"
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

void solve() {
    string s;
    cin>>s;
    map<vector<char>,vector<int>> mp;
    int n = s.size();
    vector<char> t;
    mp[t].pb(0);
    rep(i,1,n) {
        if (t[t.size()-1] == s[i-1]) {
            t.pop_back();
        } else {
            t.pb(s[i-1]);
        }
        mp[t].pb(i);
    }
    int l,r,q;
    cin>>q;
    rep(i,0,q) {
        cin>>l>>r;
    }
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
