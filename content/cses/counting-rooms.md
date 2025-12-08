---
problemName: "Counting Rooms"
problemNumber: ""
difficulty: "Hard"
topic: "Graphs"
topics:
  - "Graphs"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols"
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

void dfs(int i, int j, vector<vector<char>> &a, vector<vector<bool>> &vis) {
    int n = a.size();
    int m = a[0].size();
    vis[i][j]=1;
    if (i-1 >= 0) {
        if (a[i-1][j] == '.' && (vis[i-1][j]==0)) {dfs(i-1, j, a, vis);}
    }
    if (i+1 < n) {
        if (a[i+1][j] == '.' && (vis[i+1][j]==0)) {dfs(i+1, j, a, vis);}
    }
    if (j-1 >= 0) {
        if (a[i][j-1] == '.' && (vis[i][j-1]==0)) {dfs(i, j-1, a, vis);}
    }
    if (j+1 < m) {
        if (a[i][j+1] == '.' && (vis[i][j+1]==0)) {dfs(i, j+1, a, vis);}
    }
}

void solve() {
    int cnt=0;
    int n, m;
    cin>>n>>m;
    vector<vector<char>> a(n, vector<char>(m));
    vector<vector<bool>> vis(n, vector<bool>(m, 0));
    rep(i,0,n) {
        rep(j,0,m) {
            cin>>a[i][j];
        }
    }

    rep(i,0,n) {
        rep(j,0,m) {
            if (a[i][j] == '.' && vis[i][j] == 0) {
                cnt++;
                dfs(i, j, a, vis);
            }
        }
    }
    cout<<cnt<<endl;
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
