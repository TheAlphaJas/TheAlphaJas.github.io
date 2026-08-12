---
problemName: "Problem 1 FEB"
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
    int n;
    cin>>n;
    vector<char> a(n);
    rep(i,0,n) {cin>>a[i];}
    //each type = n, s (n - num Fs; s - 0 for diff, 1 for same. 2 for edge)
    vector<pair<int,int>> types;   
    int as=0, ae=n-1;   
    bool emer=0;
    if (a[0]=='F') {
        int z=0;
        rep(i,0,n) {
            if (a[i]!='F') {as=i; break;}
            z++;
        }
        if (z!=n) {
        types.pb({z, 2});} else {
            emer=1;
        }
    }
    if (emer==0) {
    if (a[n-1]=='F') {
        int z=0;
        rep(i,0,n) {
            if (a[n-1-i]!='F') {ae=n-1-i; break;}
            z++;
        }
        types.pb({z, 2});
    }
    // edges done
    // cout<<as<<" "<<ae<<endl;
    int c=0;
    char prev;
    for(int i = as;i<=ae;i++) {
        if (a[i]=='F') {c++; if (c==1) {prev=a[i-1];}} else {
            if (c>0) {
                if (prev==a[i]) {types.pb({c, 1});} else {types.pb({c,0});}
                c=0;
            }
        }
    }
    int baseval=0;
    rep(i,0,n-1) {
        if (a[i]==a[i+1] && (a[i]!='F')) {baseval++;}
    }

    int minval=0, maxval=0;
    bool d1=0;
    for(auto x:types) {
        // cout<<x.first<<" "<<x.second<<endl;
        if (x.second == 0) {
            minval+=(x.first%2);
            maxval+=x.first;
        } else if (x.second==1) {
            maxval+=(x.first+1);
            minval+=(x.first+1)%2;
        } else {
            d1=1;
            maxval+=x.first;
            minval+=0;
        }
    }
    if (d1) {
        cout<<maxval-minval+1<<endl;
        rep(i,0,maxval-minval+1) {
            cout<<baseval+minval+i<<endl;
        }
    } else {
        cout<<(maxval - minval)/2 + 1<<endl;
        for(int i=minval; i<=maxval; i+=2) {
            cout<<i+baseval<<endl;
        }
    }} else {
        cout<<n<<endl;
        rep(i,0,n){cout<<i<<endl;}
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
