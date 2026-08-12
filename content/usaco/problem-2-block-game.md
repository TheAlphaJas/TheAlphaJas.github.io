---
problemName: "Problem 2 Block Game"
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

void solve() {
    int n;
    cin>>n;
    vector<int> freq(26,0), temp1(26,0), temp2(26,0);
    string a,b;
    set<char> S;
    rep(i,0,n) {
        cin>>a>>b;
        for(auto x:a) {temp1[x-'a']++;}
        for(auto x:b) {temp2[x-'a']++;}
        rep(i,0,26) {
            freq[i]+=max(temp1[i], temp2[i]);
            temp1[i]=0; temp2[i]=0;
        }
    }
    rep(i,0,26) {cout<<freq[i]<<endl;}
}

int main() {
    //add quotes incase input output file
    freopen("blocks.in","r",stdin);
    freopen("blocks.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
