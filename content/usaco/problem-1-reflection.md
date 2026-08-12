---
problemName: "Problem 1 Reflection"
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

int getnumchanges(int i, int j, vector<vector<char>> &arr) {
    int n = arr.size();
    //assume i & j < n/2
    if (i>=n/2) {i = n-1-i;}
    if (j>=n/2) {j = n-1-j;}
    map<char,int> mp;
    mp[arr[i][j]]++;
    mp[arr[n-1-i][n-1-j]]++;
    mp[arr[i][n-1-j]]++;
    mp[arr[n-1-i][j]]++;
    return min({mp['.'], mp['#']});
}

void togglearr(int i, int j, vector<vector<char>> &arr) {
    if (arr[i][j]=='.') {arr[i][j]='#';} else {arr[i][j]='.';}
}

void solve() {
    int n,m;
    cin>>n>>m;
    vector<vector<char>> arr(n, vector<char>(n));
    int bruh=0;
    rep(i,0,n) {
        rep(j,0,n) {
            cin>>arr[i][j];
            // if (i<n/2 && j<n/2) {bruh+=getnumchanges(i,j,arr);}
        }
    }      
    rep(i,0,n/2) {
        rep(j,0,n/2) {{bruh+=getnumchanges(i,j,arr);}}
    }
    cout<<bruh<<endl;
    int a,b;
    rep(i,0,m) {
        cin>>a>>b;
        bruh-=getnumchanges(a-1, b-1, arr);
        togglearr(a-1, b-1, arr);
        bruh+=getnumchanges(a-1, b-1, arr);
        cout<<bruh<<endl;
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
