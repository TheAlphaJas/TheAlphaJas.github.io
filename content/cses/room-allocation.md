---
problemName: "Room Allocation"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Sweep arrival/departure events in time order, assigning the smallest currently free room number."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Room_Allocation.cpp"
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
    set<tuple<int,int,int>> S;
    int n;
    cin>>n;
    int a,b;
    rep(i,0,n) {
        cin>>a>>b;
        S.insert({a,0,i});
        S.insert({b,1,i});
    } 
    vector<int> rooms(n,-1);
    set<int> arooms;
    int mx=0;
    rep(i,1,n) {arooms.insert(i);}
    while(!S.empty()) {
        auto [curtime, isdep, idx] = *(S.begin());
        S.erase(S.begin());
        if (isdep) {
            arooms.insert(rooms[idx]);
        } else {
            int curroom = *arooms.begin();
            rooms[idx]=curroom;
            mx=max(mx,curroom);
            arooms.erase(arooms.begin());
        }
    }
    cout<<mx<<endl;
    rep(i,0,n) {cout<<rooms[i]<<" ";}

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
