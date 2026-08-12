---
problemName: "D Irreducible Anagrams"
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

bool huh(vector<vector<int>> &prefarr, int l, int r, string &s) {
    if (l==r) {return 1;}

    int cnt=0;
    rep(i,0,26) {
        int z = prefarr[r+1][i] - prefarr[l-1+1][i];
        cnt += (z>0);
    }
    if (cnt > 2) {return 1;}
    if (cnt == 2) {
        if (s[l]!=s[r]) {return 1;}
    }
    return 0;
}

void solve() {
    string s;
    cin>>s;
    int n = s.size();
    vector<vector<int>> prefarr(n+1,vector<int>(26,0));
    rep(i,1,n) {
        rep(j,0,26) {
            prefarr[i][j] = prefarr[i-1][j] + (s[i-1] == ('a' + j));
        }
    }
    int q;
    cin>>q;
    int l,r;
    rep(i,0,q) {
        cin>>l>>r;
        string s = huh(prefarr, l-1, r-1,s) ? "Yes\n" : "No\n";
        cout<<s;
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
