---
problemName: "Problem 1 Shell Game"
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

int ans(int start, vector<pair<int,int>> &swaps, vector<int> &guesses) {
    int n = guesses.size();
    int curval = start;
    int ans=0;
    rep(i,0,n) {
        if (swaps[i].first == curval || swaps[i].second == curval) {
            curval = swaps[i].first^swaps[i].second^curval;
        }
        if (guesses[i] == curval) {ans++;}
    }
    return ans;
}

void solve() {
    int n;
    cin>>n;
    vector<pair<int,int>> swaps(n);
    vector<int> guesses(n);
    rep(i,0,n) {
        cin>>swaps[i].first>>swaps[i].second>>guesses[i];
    }
    int final_ans=0;
    for(int start = 1;start<=3;start++) {
        final_ans = max(final_ans,ans(start,swaps,guesses));
    }
    cout<<final_ans;
}
int main() {
    freopen("shell.in","r",stdin);
    freopen("shell.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
