---
problemName: "N Nusret Gökçe"
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
    ll int n,m;
    cin>>n>>m;
    ll int a[n];
    rep(i,0,n) {cin>>a[i];}
    vector<ll int> toadd(n,0);
    rep(i,1,n-1) {
        if (a[i-1] < a[i]) {
            if (a[i] - a[i-1] > m) {
                toadd[i-1]+=(a[i] - a[i-1] - m);
            }
        } else {
            if (a[i] <= a[i-1]) {
                if (a[i-1] - a[i] > m) {a[i] = a[i-1] - m;}
            }
        }
    }
    bool fl=0;
    for(int i = n-2;i>=0;i--) {
        toadd[i] = max(toadd[i+1] + (a[i+1] - a[i] - m),0LL);
    }
    rep(i,0,n) {cout<<a[i] + toadd[i]<<" ";}
    cout<<endl;

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
