---
problemName: "D Running Miles"
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

// lli computeval(int curval, int curidx, int maxlsum, int maxrsum, int maxlsumidx, int maxrsumidx) {
//     lli s = curval + maxlsum + maxrsum;
//     return s-1;
// }

void solve() {
    ll int n;
    cin>>n;
    lli a[n];
    rep(i,0,n) {cin>>a[i];}
    lli lsum[n], rsum[n];
    //rsum is a[i] - i
    //lsum is a[i] + i
    //from center goto right - rsum, goto left - lsum
    rep(i,0,n) {
        lsum[i] = a[i] + i;
        rsum[i] = a[i] - i;
    }     
    lli maxrsum[n], maxlsum[n];
    maxrsum[n-1] = rsum[n-1];
    maxlsum[0] = lsum[0];
    lli maxrsumindex[n], maxlsumindex[n];
    maxrsumindex[n-1] = n-1;
    for(int i  =n-2;i>=0;i--) {
        if (rsum[i] >= maxrsum[i+1]) {
            maxrsum[i] = rsum[i];
            maxrsumindex[i] = i;
        } else {
            maxrsum[i] = maxrsum[i+1];
            maxrsumindex[i] = maxrsumindex[i+1];
        }
        // maxrsum[i] = max(rsum[i], maxrsum[i+1]);
    }
    for(int i = 1;i<n;i++) {
        if (lsum[i] >= maxlsum[i-1]) {
            maxlsum[i] = lsum[i];
            maxlsumindex[i] = i;
        } else {
            maxlsum[i] = maxlsum[i-1];
            maxlsumindex[i] = maxlsumindex[i-1];
        }
        // maxlsum[i] = max(maxlsum[i-1], lsum[i]);
    }
    lli ans =0 ;
    for(int i = 1;i<n-1;i++) {
        cout<<a[i]<<" "<<maxlsum[i-1]<<" "<<maxrsum[i+1]<<endl;
        ans = max(ans, a[i] + maxlsum[i-1] + maxrsum[i+1]);
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
    cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
