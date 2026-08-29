---
problemName: "Josephus Problem II"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Binary search over a segment tree of alive positions to jump straight to the k-th surviving person after each elimination."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Josephus_Problem_II.cpp"
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

void update_pref(int ti, int tl, int tr, vector<int> &tree, vector<int> &arr, int mi) {
    if (tl==tr && tl==mi) {tree[ti]=arr[mi]; return;}
    int m = (tl+tr)/2;
    if (mi <= m) {update_pref(2*ti + 1, tl, m, tree, arr, mi);} else {
        update_pref(2*ti +2, m+1, tr, tree, arr, mi);
    }
    tree[ti] = tree[2*ti + 1] + tree[2*ti + 2];
    return;
}

int get_prefix(int l, int num, int ti, int tl, int tr, vector<int> &tree) {
    if (tl==l && tr==num) {return tree[ti];}
    int m = (tl+tr)/2;
    if (num <= m) {
        return get_prefix(l, num, 2*ti + 1, tl, m, tree);
    } else if (l > m){
        return get_prefix(l, num, 2*ti + 2, m+1, tr, tree);
    } else {
        return (get_prefix(l, m, 2*ti + 1, tl, m, tree) + get_prefix(m+1, num, 2*ti+2, m+1, tr, tree));
    }
}

int find_kth(int k, vector<int> &arr, vector<int> &tree) {
    int n =arr.size() - 1;
    int l = 1;
    int r = n;
    while(r!=l) {
        int m = (l+r)/2;
        int z = get_prefix(1, m, 0, 1, n, tree);
        // cout<<"LR "<<l<<" "<<r<<" "<<m<<" "<<z<<" "<<k<<endl;
        if (z>=k) {
            r=m;
        } else {
            l=m+1;
        }
        if (r-l <= 1) {break;}
    }
    if (get_prefix(1, l, 0, 1, n, tree) == k) {return l;} else if(get_prefix(1, r, 0, 1, n, tree) == k) {
        return r;
    } else {
        cout<<"BRUH2\n"; return -1;
    }
}

void solve() {
    int n,k;
    cin>>n>>k;
    set<int> S;
    rep(i,1,n) {S.insert(i);}
    int curval=1;
    vector<int> arr(n+1,1);
    vector<int> tree(4*n + 4,0);
    rep(i,1,n) {
        update_pref(0, 1, n, tree, arr, i);
    }
    while(!S.empty()) {
        int curidx = get_prefix(1,curval, 0, 1, n, tree);
        int newidx = 1 + (curidx - 1 + k)%(S.size());
        int newval = find_kth(newidx, arr ,tree);
        auto f = S.find(newval);
        if (f!=S.end()) {S.erase(f);} else {cout<<"WHAT\n";}
        arr[newval]=0;
        cout<<newval<<" ";
        update_pref(0,1,n,tree,arr,newval); 
        if (S.size()==0) {break;}
        auto it = S.lower_bound(newval);
        if (it==S.end()) {it=S.begin();}
        curval = *it;
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
