---
problemName: "C GCD On Blackboard"
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

void solve() {
    ll int n;
    cin>>n;
    ll int a[n];
    rep(i,0,n) {cin>>a[i];}
    lli leftgcd[n], rightgcd[n];
    leftgcd[0] = a[0];
    rightgcd[n-1] = a[n-1];
    rep(i,1,n-1) {
        leftgcd[i] = gcd(leftgcd[i-1], a[i]);
        rightgcd[n-1-i] = gcd(rightgcd[n-i], a[n-i-1]);
    }   
    lli ans = max(max(leftgcd[n-1], rightgcd[0]), max(leftgcd[n-2], rightgcd[1]));   
    rep(i,1,n-2) {
        ans = max(ans, gcd(leftgcd[i-1], rightgcd[i+1]));
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
