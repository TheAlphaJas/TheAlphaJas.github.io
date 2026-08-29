---
problemName: "Nearest Smaller Values"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Coordinate-compress the values and query a segment tree for the most recent earlier index holding a smaller value."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Nearest_Smaller_Values.cpp"
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

void update_max(int ti, int tl, int tr, vector<ll> &tree, vector<ll> &arr, int mi) {
    if (tl==tr && tl==mi) {tree[ti]=arr[mi]; return;}
    int m = (tl+tr)/2;
    if (mi <= m) {update_max(2*ti + 1, tl, m, tree, arr, mi);} else {
        update_max(2*ti +2, m+1, tr, tree, arr, mi);
    }
    tree[ti] = max(tree[2*ti + 1],tree[2*ti + 2]);
    return;
}

ll get_max(int l, int r, int ti, int tl, int tr, vector<ll> &tree) {
    if (r<l) {return -1;}
    if (r<0) {return -1;}
    if (tl==l && tr==r) {return tree[ti];}
    int m = (tl+tr)/2;
    if (r <= m) {
        return get_max(l, r, 2*ti + 1, tl, m, tree);
    } else if (l > m){
        return get_max(l, r, 2*ti + 2, m+1, tr, tree);
    } else {
        return max(get_max(l, m, 2*ti + 1, tl, m, tree),get_max(m+1, r, 2*ti+2, m+1, tr, tree));
    }
}

void solve() {
    int n;
    cin>>n;
    vector<ll> a(n);
    set<int> S;
    rep(i,0,n) {cin>>a[i]; S.insert(a[i]);}
    unordered_map<int,int> mp;
    int nm=0;
    for(auto x:S) {
        mp[x]=nm;
        nm++;
    }
    int N=nm+1;
    rep(i,0,n) {a[i]=mp[a[i]];}
    // rep(i,0,n) {cout<<a[i]<<" ";} cout<<endl;
    vector<ll> arr(N+1,-1);
    vector<ll> tree(4*N + 4,-1);
    vector<int> ans(n, -1);
    arr[a[0]]=0;
    update_max(0, 0, N-1, tree, arr, a[0]);
    rep(i,1,n-1) {
        ans[i] = get_max(0,a[i]-1, 0, 0, N-1, tree);
        arr[a[i]]=i;
        update_max(0, 0, N-1, tree, arr, a[i]);
    }
    rep(i,0,n) {cout<<ans[i]+1<<" ";}
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
