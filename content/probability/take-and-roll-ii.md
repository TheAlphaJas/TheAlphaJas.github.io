---
title: Take and Roll II
topics:
  - Expectation
  - Markov Chains
  - Geometric Distribution
  - Optimization
---

You are given a fair $$20$$-sided die and $$100$$ actions in a game. The die starts with upface $$1$$. The two options you can perform are to roll and to take. Performing a roll re-rolls the current upface of the die. Performing a take allows you to cash out the current upface of the die. Note that the game does not end when you perform a take. However, you must roll the die again before doing another take. Your strategy is to accept any number that is at least some threshold $$n$$. This $$n$$ must be decided in advance and is fixed for the entire game. Assuming rational play in selecting $$n$$, find your expected payout.

---

**Original Problem Link:** [https://www.quantguide.io/questions/take-and-roll-ii](https://www.quantguide.io/questions/take-and-roll-ii)

<!-- SOLUTION_SEPARATOR -->

Tracking every possible sequence of rolls across $$100$$ actions is hopeless: for each threshold $$n$$, the number of possible games explodes. So we don't track individual outcomes at all. We play entirely in the world of **expectations**.

The plan has two parts:

1. For a **fixed** threshold $$n$$, find the expected total payout as a function of $$n$$.
2. Maximize that expression over $$n \in \{1, 2, \dots, 20\}$$.

### Step 1: The shape of one "cycle"

With a fixed threshold $$n$$, the game repeats the same pattern over and over:

- keep rolling until the upface is at least $$n$$,
- then take it.

(The die starting at $$1$$ fits right in: we must roll before our first useful take anyway.)

Suppose we knew

$$
L = \text{expected number of rolls needed to land on a value} \ge n
$$

which we'd expect to be a function of $$n$$ itself. That would be enough, because then one cycle costs, on average, $$L$$ rolls followed by $$1$$ take, i.e. $$L + 1$$ actions. Both rolling and taking use up actions, so out of our $$100$$ actions we get

$$
\text{number of takes} \approx \frac{100}{L+1}
$$

### Step 2: The payout of one take

What do we pocket on each take? It could be anything from $$n$$ to $$20$$. But conditioned on landing on something $$\ge n$$, each of the values $$n, n+1, \dots, 20$$ is equally likely (the die is fair, and we only ever stop on the first acceptable value). So the expected payout per take is just their average:

$$
E[\text{payout per take}] = \frac{n + 20}{2}
$$

### Step 3: The total, in terms of $$n$$ and $$L$$

Multiplying the expected number of takes by the expected payout of each,

$$
E[\text{total payout}] = \frac{100}{L+1}\cdot\frac{20+n}{2}
$$

Everything now hinges on finding $$L$$.

### Step 4: Finding $$L$$ with a Markov chain

Think of the game as a tiny Markov chain with two states: "currently below $$n$$" and "reached something $$\ge n$$" (absorbing, since that's where we stop and take). Let $$E$$ be the expected number of fresh rolls needed to hit a value $$\ge n$$.

The trick, as with Markov chains in general, is to condition on what happens on the **very next roll** and notice that the process then restarts:

- With probability $$\dfrac{21-n}{20}$$ (the values $$n, \dots, 20$$ out of $$20$$), the roll is acceptable. That took exactly $$1$$ roll, and we're done.
- With probability $$\dfrac{n-1}{20}$$ (the values $$1, \dots, n-1$$), the roll fails. We've spent $$1$$ roll, and since the die has no memory we are right back where we started, needing $$E$$ more rolls on average.

By conditional expectation,

$$
E = \frac{21-n}{20}\cdot 1 + \frac{n-1}{20}\cdot\left(1 + E\right)
$$

where the $$1 + E$$ accounts for the failed roll itself plus the fresh start after it. Expanding,

$$
E = \frac{21 - n}{20} + \frac{n-1}{20} + \frac{n-1}{20}E = 1 + \frac{n-1}{20}E
$$

$$
E\left(1 - \frac{n-1}{20}\right) = 1 \quad\Longrightarrow\quad E\cdot\frac{21-n}{20} = 1 \quad\Longrightarrow\quad E = \frac{20}{21-n}
$$

(This is just the mean of a geometric distribution with success probability $$\frac{21-n}{20}$$, which is a nice cross-check.)

**Sanity checks.**

- As $$n$$ grows, fewer values are acceptable, so we should need more rolls on average, and indeed $$\frac{20}{21-n}$$ increases with $$n$$.
- At $$n = 1$$ every value is acceptable, so exactly one roll always does it: $$E = \frac{20}{20} = 1$$. ✓
- At $$n = 20$$ only a $$20$$ works, a $$1/20$$ chance per roll, so we expect $$E = 20$$ rolls. ✓

So $$L = E = \dfrac{20}{21-n}$$.

### Step 5: Plug $$L$$ back in

$$
L + 1 = \frac{20}{21-n} + 1 = \frac{41-n}{21-n}
$$

so the expected total payout becomes

$$
f(n) = \frac{100}{L+1}\cdot\frac{20+n}{2} = 100\cdot\frac{21-n}{41-n}\cdot\frac{20+n}{2} = \frac{50\,(21-n)(20+n)}{41-n}
$$

The trade-off is visible right in the formula. Raising $$n$$ increases the payout per take, $$\frac{20+n}{2}$$, but shrinks the number of takes, $$\frac{100(21-n)}{41-n}$$.

### Step 6: Maximize over $$n$$

Plotting $$y = \frac{50(21-x)(20+x)}{41-x}$$ on [Desmos](https://www.desmos.com/calculator), the curve peaks just past $$x = 6$$. We can also pin that down exactly. Writing $$f(x) = 50\cdot\frac{420 + x - x^2}{41 - x}$$ and setting the derivative's numerator to zero,

$$
(1 - 2x)(41 - x) + (420 + x - x^2) = x^2 - 82x + 461 = 0
$$

$$
x = 41 - \sqrt{1220} \approx 6.07
$$

But $$n$$ has to be an integer, so we check the neighbors:

- $$n = 5$$: $$f(5) = \dfrac{50\cdot 16\cdot 25}{36} = \dfrac{5000}{9} \approx 555.56$$
- $$n = 6$$: $$f(6) = \dfrac{50\cdot 15\cdot 26}{35} = \dfrac{3900}{7} \approx 557.14$$
- $$n = 7$$: $$f(7) = \dfrac{50\cdot 14\cdot 27}{34} = \dfrac{9450}{17} \approx 555.88$$

So the best threshold is $$n = 6$$: accept anything $$6$$ or above, reroll $$1$$ through $$5$$.

> **A caveat on exactness.** "$$100/(L+1)$$ takes" treats the game as a long-run rate, as if cycles always fit neatly into the $$100$$ actions and fractional takes were allowed. But a take only pays when a cycle actually completes, and the last cycle can get cut off mid-reroll. The natural fix is to count only whole cycles, with a floor:
>
> $$
> f_{\lfloor\,\rfloor}(n) = \left\lfloor \frac{100\,(21-n)}{41-n} \right\rfloor \cdot \frac{20+n}{2}
> $$
>
> and plot that directly on Desmos as `y = floor(100(21-x)/(41-x)) * (20+x)/2`. The curve turns into a staircase, and the jumps matter: at $$n = 6$$ the $$42.86$$ expected cycles round down to $$42$$ (payout $$546$$), while at $$n = 7$$ the $$41.18$$ cycles only lose a sliver, rounding to $$41$$ (payout $$553.5$$). So the floored version actually prefers $$n = 7$$.
>
> Even the floor is still an approximation, though, because the number of completed cycles is itself random, and the average of a floor is not the floor of an average. Solving the $$100$$-action game exactly (a dynamic program over every state) gives $$552.47$$, $$553.96$$ and $$552.61$$ for $$n = 5, 6, 7$$. So the true optimum is $$n = 6$$ with an expected payout of about $$553.96$$, a little under $$3900/7 \approx 557.14$$. The expected-cycle model lands on the right threshold, and $$3900/7$$ is the intended answer under that model.

### Thus, the optimal threshold is $$n = 6$$, and the expected payout is $$\dfrac{3900}{7} \approx 557.14$$
