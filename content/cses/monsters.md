---
problemName: "Monsters"
problemNumber: ""
difficulty: "Hard"
keyIdea: "Solution implementation"
language: "C++"
github: "https://github.com/TheAlphaJas/cses-sols"
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

void processmindis(vector<vector<char>> &adj, vector<vector<int>> &mindis) {
    int n = mindis.size();
    int m = mindis[0].size();
    queue<tuple<int,int,int>> q;
    vector<vector<bool>> vis(n, vector<bool>(m, 0));
    rep(i,0,n) {
        rep(j,0,m) {
            // cout<<adj[i][j]<<" ";
            if (adj[i][j] == 'M') {q.push({i,j,0}); vis[i][j]=1;}
        }
        // cout<<endl;
    }
    while(!q.empty()) {
        tuple<int,int,int> t = q.front();
        q.pop();
        int i = get<0>(t);
        int j = get<1>(t);
        int d = get<2>(t);
        // cout<<i<<" "<<j<<" "<<d<<endl;
        mindis[i][j] = d;
        vector<int> l = {-1,1};
        for(auto x:l) {
            if (i+x < n && i+x > -1) {
                if (!vis[i+x][j]) {
                if (adj[i+x][j]!='#') {
                    q.push({i+x, j, d+1});
                    vis[i+x][j] =1;
                }
            }
            }
            
            if (j+x < m && j+x > -1) {
                if (!vis[i][j+x]) {
                if (adj[i][j+x]!='#') {
                    q.push({i, j+x, d+1});
                    vis[i][j+x]=1;
                }
            }
            }
        }
    }
}

void solve() {
    int n,m;
    cin>>n>>m;
    int ai, aj;
    vector<vector<char>> adj(n, vector<char>(m));
    rep(i,0,n) {
        rep(j,0,m) {
            cin>>adj[i][j];
            if (adj[i][j] == 'A') {ai = i; aj = j;}
        }
    }     

    vector<vector<bool>> vis(n+1, vector<bool>(m+1,0));
    vector<vector<int>> step(n+1, vector<int>(m+1, '#'));
    vector<vector<int>> mindis(n, vector<int>(m, INT_MAX));
    vis[ai][aj]=1;
    vector<int> l = {-1,1};
    queue<pair<tuple<int,int>,int>> q;
    q.push({{ai,aj}, 0});
    pair<int,int> ret = {-1,-1};
    processmindis(adj, mindis);

    // rep(i,0,n) {
    //     rep(j,0,m) {
    //         cout<<mindis[i][j]<<" ";
    //     }
    //     cout<<endl;
    // }
    //bfs loop
    while(!q.empty()) {
        pair<tuple<int,int>,int> cur = q.front();
        q.pop();
        int curi = get<0>(cur.first);
        int curj = get<1>(cur.first);
        if (curi == 0 || curi == n-1 || curj == 0 || curj == m-1) {
            ret = {curi, curj};
            break;
        }
        int dist = cur.second;
        for(auto x:l) {
            if (curi + x < n && curi + x > -1) {
                if (adj[curi + x][curj] != '#' && adj[curi + x][curj] != 'M' && mindis[curi +x][curj] > dist + 1 && vis[curi + x][curj] == 0) {
                    // cout<<"considered - "<<curi + x<<" "<<curj<<endl;
                    vis[curi + x][curj]=1;
                    if (x == 1) {
                        step[curi + x][curj] = 'D';
                    } else {
                        step[curi + x][curj] = 'U';
                    }
                    
                    q.push({{curi + x, curj}, dist+1});
                }
            }

            if (curj + x < m && curj + x > -1 && vis[curi][x+curj] == 0) {
                // cout<<"considering "<<curi<<" "<<x + curj<<endl;
                // cout<<"my dist - "<<dist + 1<<" | mindis - "<<mindis[curi][curj + x]<<endl;
                if (adj[curi][x+curj] != '#' && adj[curi][x+curj] != 'M' && mindis[curi][x+curj] > dist + 1 && vis[curi][x+curj] == 0) {
                    // cout<<"considered - "<<curi<<" "<<x+curj<<endl;
                    vis[curi][x+curj]=1;
                    if (x == 1) {
                        step[curi][curj+x] = 'R';
                    } else {
                        step[curi][curj+x] = 'L';
                    }
                    
                    q.push({{curi, x+ curj}, dist+1});
                }
            }
        }

    }

// cout<<"hi\n";
    if (ret.first == -1) {
        cout<<"NO\n";
    } else {
        int x,y;
        x = ret.first;
        y = ret.second;
        vector<char> ans;
        while(1) {
            if (step[x][y] == '#') {break;}
            ans.pb(step[x][y]);
            if (step[x][y] == 'L') {y++;}
            else if (step[x][y] == 'R') {y--;}
            else if (step[x][y] == 'U') {x++;}
            else if (step[x][y] == 'D') {x--;}
        }
        cout<<"YES\n";
        cout<<ans.size()<<endl;
        reverse(all(ans));
        for(auto x:ans) {cout<<x;}
        cout<<endl;
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
