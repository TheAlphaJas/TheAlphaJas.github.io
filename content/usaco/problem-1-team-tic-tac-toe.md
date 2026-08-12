---
problemName: "Problem 1 Team Tic Tac Toe"
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
    vector<vector<char>> arr(3, vector<char>(3));
    rep(i,0,3) {
        rep(j,0,3) {
            cin>>arr[i][j];
        }
    }

    set<char> S;
    // int solo=0, mixed=0;
    set<char> solos;
    set<pair<char,char>> mixeds;
    vector<char> t;
    rep(i,0,3) {
        S.insert(arr[i][0]);
        S.insert(arr[i][1]);
        S.insert(arr[i][2]);
        if (S.size()==1) {solos.insert(*(S.begin()));}
        if (S.size()==2) {
            for(auto x:S) {t.pb(x);}
            mixeds.insert(make_pair(t[0], t[1]));
            t.clear();
        }
        S.clear();
    }
    // cout<<"hi";

    // cout<<solos.size()<<endl;

    rep(i,0,3) {
        S.insert(arr[0][i]);
        S.insert(arr[1][i]);
        S.insert(arr[2][i]);
        if (S.size()==1) {solos.insert(*S.begin());}
        if (S.size()==2) {
            // vector<char> t;
            for(auto x:S) {t.pb(x);}
            mixeds.insert(make_pair(t[0], t[1]));
            t.clear();
        }
        S.clear();
    }

    rep(i,0,3) {
        S.insert(arr[i][i]);
    }

    if (S.size()==1) {solos.insert(*S.begin());}
    if (S.size()==2) {
            // vector<char> t;
            for(auto x:S) {t.pb(x);}
            mixeds.insert(make_pair(t[0], t[1]));
            t.clear();
        }
    S.clear();

    rep(i,0,3) {
        S.insert(arr[i][2-i]);     
    }
    if (S.size()==1) {solos.insert(*S.begin());}
        if (S.size()==2) {
            // vector<char> t;
            for(auto x:S) {t.pb(x);}
            mixeds.insert(make_pair(t[0], t[1]));
            t.clear();
        }
    S.clear();
    // cout<<"hi\n";
    cout<<solos.size()<<"\n"<<mixeds.size()<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("tttt.in","r",stdin);
    freopen("tttt.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
