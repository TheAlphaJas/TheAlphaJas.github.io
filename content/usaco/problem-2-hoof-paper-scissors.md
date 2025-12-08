---
problemName: "Problem 2 Hoof Paper Scissors"
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
#define rep(var, start, num) for(int var = start; var <start + num; var++)
#define all(x) x.begin(), x.end()
#define ulli unsigned long long int
#define ull unsigned long long
bool sortbysec(const pair<ll,ll> &a,const pair<ll,ll> &b) { return (a.second < b.second); }

void solve() {
    int n;
    cin>>n;
    vector<int> a(n+1,0), b(n+1,0);
    int s=0,p=0,h=0;
    vector<char> seq;
    char x;
    rep(i,0,n) {
        cin>>x;
        seq.pb(x);
        switch(x) {
            case 'P':
            p++;
            break;
            case 'H':
            h++;
            break;
            case 'S':
            s++;
            break;
        }
        a[i+1] = max({s,p,h});
    }
    reverse(all(seq));
    s=0; p=0; h=0;
    rep(i,0,n) {
        x = seq[i];
        switch(x) {
            case 'P':
            p++;
            break;
            case 'H':
            h++;
            break;
            case 'S':
            s++;
            break;
        }
        b[i+1] = max({s,p,h});
    }
    int ans=0;
    for(int i=0;i<=n;i++) {
        ans = max(ans,a[i]+b[n-i]);
    }
    cout<<ans<<endl;
}
int main() {
    //add quotes incase input output file
    freopen("hps.in","r",stdin);
    freopen("hps.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
