---
problemName: "Problem 3 Milk Measurement"
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

string logcowstats(map<char,int> &mp, int cmax, string &p, int &ans) {
    string g;
    for(auto x:mp) {
        // cout<<"in mp "<<x.first<<" "<<x.second<<endl;
        if (x.second == cmax) {g+=x.first;}
    }
    if (g!=p) {ans++;}
    cout<<g<<endl;
    return g;
}

void solve() {
    int n;
    cin>>n;
    vector<pair<int,pair<char, int>>> v;
    int a,b;
    string s;
    rep(i,0,n) {
        cin>>a>>s>>b;
        v.pb({a,{s[0], b}});
        cout<<"B "<<b<<endl;
    }
    string g="BEM";
    sort(all(v));
    map<char,int> mp;
    set<int> max;
    int ans=0;
    int cmax=0;
    rep(i,0,n) {
        mp[v[i].second.first]+=v[i].second.second;
        // cout<<v[i].second.first<<" "<<mp[v[i].second.first]<<endl;
        cmax=INT_MIN;
        for(auto x:mp) {if(x.second  > cmax) {cmax = x.second;}}
        // cmax = max({cmax, mp[v[i].second.first]});
        // g=logcowstats(mp, cmax, g, ans);
        // cout<<"cmax "<<cmax<<endl;
        // if (mp[v[i].second.first] >= cmax) {
        //     cmax = mp[v[i].second.first];  
            
        // }
        g=logcowstats(mp, cmax, g, ans);
    }
    cout<<ans<<endl;
}

int main() {
    //add quotes incase input output file
    // freopen("measurement.in","r",stdin);
    // freopen("measurement.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
