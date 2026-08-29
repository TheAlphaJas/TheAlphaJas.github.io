---
problemName: "Nested Ranges Count"
problemNumber: ""
difficulty: "Easy"
topic: "Sorting and Searching"
topics:
  - "Sorting and Searching"
keyIdea: "Compress coordinates and sweep with a Fenwick-style segment tree to count containing and contained ranges."
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols/blob/main/Sorting%20and%20Searching/Nested_Ranges_Count.cpp"
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

void update_sum(int ti, int tl, int tr, vector<ll> &tree, vector<ll> &arr, int mi) {
    if (tl==tr && tl==mi) {tree[ti]=arr[mi]; return;}
    int m = (tl+tr)/2;
    if (mi <= m) {update_sum(2*ti + 1, tl, m, tree, arr, mi);} else {
        update_sum(2*ti +2, m+1, tr, tree, arr, mi);
    }
    tree[ti] = tree[2*ti + 1] + tree[2*ti + 2];
    return;
}

ll get_sum(int l, int r, int ti, int tl, int tr, vector<ll> &tree) {
    if (tl==l && tr==r) {return tree[ti];}
    int m = (tl+tr)/2;
    if (r <= m) {
        return get_sum(l, r, 2*ti + 1, tl, m, tree);
    } else if (l > m){
        return get_sum(l, r, 2*ti + 2, m+1, tr, tree);
    } else {
        return (get_sum(l, m, 2*ti + 1, tl, m, tree) + get_sum(m+1, r, 2*ti+2, m+1, tr, tree));
    }
}

void solve() {
    int n;
    cin>>n;
    vector<pair<int,int>> v(n);
    set<int> S;
    rep(i,0,n) {
        cin>>v[i].first>>v[i].second;
        S.insert(v[i].first);
        S.insert(v[i].second);
    }      
    int num=0;
    unordered_map<int,int> mp;
    for(auto x:S) {
        mp[x]=num;
        num++;
    }
    vector<int> idx(n);
    rep(i,0,n) {v[i].second = -v[i].second;}
    vector<pair<pair<int,int>,int>> bruh;
    rep(i,0,n) {
        v[i].first = mp[v[i].first];
        v[i].second = -mp[-v[i].second];
        bruh.push_back({v[i],i});
        // cout<<v[i].first<<" "<<v[i].second<<endl;
    }
    sort(all(v));
    sort(all(bruh));
    rep(i,0,n) {
        idx[i]=bruh[i].second;
    }
    vector<int> subcount(n);
    // map<pair<int,int>, int> subcount;
    int N = num+1;
    subcount[0]=0;
    vector<ll> rights1(N+1,0);
    vector<ll> tree1(4*N + 4,0);
    rights1[-v[0].second]=1;
    update_sum(0, 0,N-1, tree1, rights1, -v[0].second);
    rep(i,1,n-1) {
        int z = get_sum(-v[i].second, N-1, 0, 0, N-1, tree1);
        subcount[i]=z;
        rights1[-v[i].second]++;
        update_sum(0, 0,N-1, tree1, rights1, -v[i].second);
    }

    // map<pair<int,int>, int> domcount;
    vector<int> domcount(n);
    domcount[n-1]=0;
    vector<ll> rights2(N+1,0);
    vector<ll> tree2(4*N + 4,0);
    rights2[-v[n-1].second]=1;
    update_sum(0, 0,N-1, tree2, rights2, -v[n-1].second);
    for(int i =n-2;i>=0;i--) {
        int z = get_sum(0, -v[i].second, 0, 0, N-1, tree2);
        domcount[i]=z;
        rights2[-v[i].second]++;
        update_sum(0, 0,N-1, tree2, rights2, -v[i].second);
    }

    vector<int> a1(n), a2(n);
    rep(i,0,n) {a1[idx[i]]=domcount[i];}
    rep(i,0,n) {a2[idx[i]]=subcount[i];}
    rep(i,0,n) {cout<<a1[i]<<" ";} cout<<"\n";
    rep(i,0,n) {cout<<a2[i]<<" ";}

    // rep(i,0,n) {

    // }
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
