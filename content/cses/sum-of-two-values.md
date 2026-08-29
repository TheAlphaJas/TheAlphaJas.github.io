---
problemName: "Sum of Two Values"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Hashmap of value positions to find a complementary pair in one pass."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Sum_of_Two_Values.cpp"
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
    int n,x;
    cin>>n>>x;
    vector<int> a(n);
    map<int,int> mp;
    map<int,vector<int>> pos;
    rep(i,0,n) {cin>>a[i]; mp[a[i]]++; pos[a[i]].pb(i);}
    bool fl=0;
    rep(i,0,n) {
        if (x-a[i]!=a[i]) {
            if (mp[x-a[i]]) {
                cout<<i+1<<" "<<pos[x-a[i]][0]+1<<endl;
                fl=1;
                break;
            }
        } else {
            if (mp[a[i]]>1) {
                cout<<pos[a[i]][0]+1<<" "<<pos[a[i]][1]+1<<endl;
                fl=1;
                break;
            }
        }
    }
    if (!fl) {
        cout<<"IMPOSSIBLE\n";
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
