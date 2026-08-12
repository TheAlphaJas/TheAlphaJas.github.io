---
problemName: "D Multiple Of 2019"
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

int tenmodpow(int i, vector<int> &dp) {
    if (i==1) {return 10;}
    if (i==0) {return 1;}
    if (dp[i]!=-1) {return dp[i];}
    if (i%2) {
        int z = tenmodpow((i-1)/2, dp);
        return dp[i] = (10 * z * z)%2019;
    } else {
        int z = tenmodpow(i/2,dp);
        return dp[i] = (z*z)%2019;
    }
}

lli C2(int n) {
    if (n%2) {
        return n*((n-1)/2);
    } else {
        return (n/2)*(n-1);
    }
}

void solve() {
    string s;
    cin>>s;
    int n = s.size();
    vector<int> modvec(n+2, 0);
    vector<int> dp(n+2, -1);
    modvec[1] = (s[n-1]-'0');
    map<int,int> mp;
    for(int i = 2;i<=n;i++) {
        modvec[i] = ((modvec[i-1]) + (s[n-i]-'0')*tenmodpow(i-1,dp))%2019;
    }
    for(int i =0;i<=n;i++) {
        mp[modvec[i]]++;
        // cout<<modvec[i]<<" ";
    }
    lli ans = 0;
    for(auto x:mp) {
        ans += C2(x.second);
    }
    cout<<ans<<endl;
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
