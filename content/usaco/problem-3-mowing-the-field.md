---
problemName: "Problem 3 Mowing The Field"
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
    //2000*2000
    vector<vector<lli>> grid(2005, vector<lli>(2005,-1));
    int cx=1002, cy=1002;
    int n;
    cin>>n;
    char d; int s;
    grid[cx][cy]=0;
    int time=1;
    lli ans=INT_MAX;
    rep(i,0,n) {
        cin>>d>>s;
        if (d=='N'){
            while(s) {
                cy++;
                if (grid[cx][cy]!=-1) {
                    ans=min(ans, time - grid[cx][cy]);
                }
                grid[cx][cy]=time;
                s--;
                time++;
            }
        } else if (d=='S') {
            while(s) {
                cy--;
                if (grid[cx][cy]!=-1) {
                    ans=min(ans, time - grid[cx][cy]);
                }
                grid[cx][cy]=time;
                s--;
                time++;
            }
        } else if (d=='E') {
            while(s) {
                cx++;
                if (grid[cx][cy]!=-1) {
                    ans=min(ans, time - grid[cx][cy]);
                }
                grid[cx][cy]=time;
                s--;
                time++;
            }
        } else {
            while(s) {
                cx--;
                if (grid[cx][cy]!=-1) {
                    ans=min(ans, time - grid[cx][cy]);
                }
                grid[cx][cy]=time;
                s--;
                time++;
            }
        }
    }
    if (ans==INT_MAX) {ans = -1;}
    cout<<ans<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("mowing.in","r",stdin);
    freopen("mowing.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
