---
problemName: "Problem 3 Stuck In A Rut"
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

void computestuff(int i, vector<tuple<char, int,int>> &tups, vector<int> &anss, map<int,vector<int>> &corr) {
    int xn,yn,xe,ye;
    int n = anss.size();
        // ans = INT_MAX;
        rep(j,0,n) {
            if (get<0>(tups[i]) == 'N') {
                xn = get<1>(tups[i]);
                yn = get<2>(tups[i]);
                if (get<0>(tups[j]) == 'N') {continue;}
                    xe = get<1>(tups[j]);
                    ye = get<2>(tups[j]);
                    if (ye - yn <= 0) {continue;}
                    if (xn - xe <= 0) {continue;}
                    if ((ye - yn > xn - xe) && (anss[j] > xn - xe)) {
                        if (ye - yn < anss[i]) {
                            anss[i] = ye-yn;
                            if (anss[j]==INT_MAX) {
                            corr[i].pb(j);
                            }
                        }
                    }
            } else {
                xe = get<1>(tups[i]);
                ye = get<2>(tups[i]);
                // cout<<xe<<" "<<ye<<endl;
                if (get<0>(tups[j]) == 'E') {continue;}
                    xn = get<1>(tups[j]);
                    yn = get<2>(tups[j]);
                    // cout<<xn<<" "<<yn<<endl;
                    if (ye - yn <= 0) {continue;}
                    if (xn - xe <= 0) {continue;}
                    if ((ye - yn < xn - xe) && (anss[j] > ye - yn)) {
                        // cout<<"yes for "<<i<<" "<<j<<endl;
                        // cout<<anss[j]<<endl;
                        // cout<<"mu\n"<<xn-xe<<endl; anss[i] = min(anss[i], xn - xe);
                    if (anss[i] > xn-xe) {
                        anss[i] = xn-xe;
                        if (anss[j]==INT_MAX) {
                            // cout<<"hi "<<i<<" "<<j<<endl;
                            corr[i].pb(j);
                        }
                    }
                }
            }
        }
}

void solve() {
    int n;
    cin>>n;
    vector<tuple<char, int,int>> tups;
    char d; int x,y;
    rep(i,0,n) {
        cin>>d>>x>>y;
        tups.pb({d,x,y});
    }      
    // int ans=INT_MAX;
    int xn, xe, yn, ye;
    vector<int> anss(n, INT_MAX);
    queue<int> q;
    vector<bool> qd(n, 0);
    rep(i,0,n) {
        q.push(i);
        qd[i]=1;
    }
    // rep(i,0,n) {
    //     q.push(i);
    // }
    map<int, vector<int>> corr;
    
    int cnt=n*n*n;

    while(cnt) {
        anss[cnt%n]=INT_MAX;
        computestuff(cnt%n, tups, anss, corr);
        cnt--;
    }
    // while(!q.empty() && cnt) {
    //     int z = q.front();
    //     // cout<<z<<endl;
    //     // cout<<"! "<<anss[3]<<" "<<anss[4]<<endl;
    //     anss[z]=INT_MAX;
    //     q.pop();
    //     qd[z]=0;
    //     computestuff(z, tups, anss, corr);
    //     bool t=0;
    //     for(auto x:corr[z]) {
    //         t=1;
    //         if (qd[x]==0) {
    //             // cout<<"pushed "<<x<<endl;
    //             q.push(x);
    //             qd[x]=1;
                
    //         }
    //     }
    //     if (t)  {q.push(z); qd[z]=1;}
    //     cnt--;
    // }

    rep(i,0,n) {
        if (anss[i]!=INT_MAX) {cout<<anss[i]<<endl;} else {cout<<"Infinity\n";}
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
