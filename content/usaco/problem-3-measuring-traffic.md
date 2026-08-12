---
problemName: "Problem 3 Measuring Traffic"
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
    vector<tuple<string,int,int>> v;
    string s; int a,b;
    rep(i,0,n) {
        cin>>s>>a>>b;
        v.pb({s,a,b});
    }

    int lnone=-1;
    rep(i,0,n) {if (get<0>(v[n-1-i]) == "none") {lnone=n-1-i; break;}}
    // cout<<"lnone "<<lnone<<endl;
    int rolmin = get<1>(v[lnone]);
    int rolmax = get<2>(v[lnone]);
    // cout<<rolmin<<" "<<rolmax<<endl;
    for(int i = lnone;i>-1;i--) {
        // cout<<rolmin<<" "<<rolmax<<endl;
        string s = get<0>(v[i]);
        if (s == "none") {
            rolmin = max(rolmin, get<1>(v[i]));
            rolmax = min(rolmax, get<2>(v[i]));
        } else if (s == "off") {
            rolmin+=get<1>(v[i]);
            rolmax+=get<2>(v[i]);
        } else {
            rolmin=max(rolmin-get<2>(v[i]),0);
            rolmax=max(0,rolmax-get<1>(v[i]));
        }
    }
    cout<<max(rolmin,0)<<" "<<max(rolmax,0)<<endl;
    //first none
    int fnone=-1;
    rep(i,0,n) {if (get<0>(v[i]) == "none") {fnone=i; break;}}
    rolmin = get<1>(v[fnone]);
    rolmax = get<2>(v[fnone]);
    for(int i = fnone;i<n;i++) {
        string s = get<0>(v[i]);
        if (s == "none") {
            rolmin = max(rolmin, get<1>(v[i]));
            rolmax = min(rolmax, get<2>(v[i]));
        } else if (s == "on") {
            rolmin+=get<1>(v[i]);
            rolmax+=get<2>(v[i]);
        } else {
            rolmin=max(rolmin-get<2>(v[i]),0);
            rolmax=max(rolmax-get<1>(v[i]),0);
        }
    }
    cout<<(rolmin)<<" "<<(rolmax)<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("traffic.in","r",stdin);
    freopen("traffic.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
