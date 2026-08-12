---
problemName: "Problem 1 The Lost Cow"
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
    int x,y;
    cin>>x>>y;
    y-=x;
    int pos=0;
    if (y>=0) {pos=1;} 
    y=abs(y);
    // cout<<y<<endl;
    int p=0;
    lli d=0;
    int c=0;
    while(1) {
        if ((!(p%2)==pos) && (y <= (1<<p))) {
            d+=(y);
            break;
        } else {
            d+=2*(1<<p);
            p++;
        }
    }  
    cout<<d<<endl;
}

int main() {
    //add quotes incase input output file
    freopen("lostcow.in","r",stdin);
    freopen("lostcow.out","w",stdout);
    ios_base::sync_with_stdio(0);
    cin.tie(0); cout.tie(0);
    int tc = 1;
    // cin >> tc;
    for (int t = 1; t <= tc; t++) {
        solve();
    }
}
```
