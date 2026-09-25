---
title: Power Grid
topics:
  - Dynamic Programming
  - Combinatorics
  - Transfer Matrix Method
---

A $$3 \times 3$$ grid of light bulbs is formed. Then, each light bulb is powered on with probability $$\frac{1}{2}$$. Find the probability that no two adjacent (grid cells that share a common side) light bulbs are powered on.

---

**Original Problem Link:** [https://www.quantguide.io/questions/power-grid](https://www.quantguide.io/questions/power-grid)

<!-- SOLUTION_SEPARATOR -->

Brute-forcing over all $$2^9 = 512$$ on/off configurations of the grid is the naive plan, and it does technically work, but there's a much smarter way in once we notice something: whether a configuration is valid only ever depends on **pairs of adjacent rows**, never on rows further apart. That locality is exactly what makes a row-by-row DP click.

### Step 1: Treat a row as a "state"

Each row has $$3$$ bulbs, each on or off, so a row can be described by one of $$2^3 = 8$$ on/off patterns. Call each pattern a **state**. Write a state like $$(\text{off}, \text{off}, \text{on})$$ to mean bulb $$1$$ and $$2$$ are off, bulb $$3$$ is on.

But not all $$8$$ states can ever legally appear as a row by themselves: the "no two adjacent bulbs" rule also applies *within* a row (bulbs $$1$$–$$2$$ and $$2$$–$$3$$ are side-by-side). That rules out any state with two consecutive bulbs both on: $$(\text{on},\text{on},\text{off})$$, $$(\text{off},\text{on},\text{on})$$, and $$(\text{on},\text{on},\text{on})$$ are all immediately invalid, leaving exactly $$5$$ legal single-row states:

$$
(\text{off},\text{off},\text{off}),\ (\text{on},\text{off},\text{off}),\ (\text{off},\text{on},\text{off}),\ (\text{off},\text{off},\text{on}),\ (\text{on},\text{off},\text{on})
$$

### Step 2: When can two rows sit on top of each other?

Two vertically stacked rows are compatible exactly when no *column* has both rows' bulbs on, i.e. their on-positions don't overlap at all. Take the state $$(\text{off},\text{off},\text{on})$$: whatever sits directly above or below it must have bulb $$3$$ off (else that shared column has two adjacent bulbs both lit). Checking it against all $$5$$ legal states, the compatible ones are

$$
(\text{off},\text{off},\text{on}) \ \longrightarrow\ \{(\text{on},\text{off},\text{off}),\ (\text{off},\text{on},\text{off}),\ (\text{off},\text{off},\text{off})\}
$$

three options, all with bulb $$3$$ off (the two remaining legal states, $$(\text{off},\text{off},\text{on})$$ itself and $$(\text{on},\text{off},\text{on})$$, both keep bulb $$3$$ on, so they're excluded).

Running this same check against the other legal states builds the full compatibility map. A few more of them, to see the pattern:

- $$(\text{off},\text{off},\text{off}) \ \longrightarrow\ \{(\text{off},\text{off},\text{off}),\ (\text{on},\text{off},\text{off}),\ (\text{off},\text{on},\text{off}),\ (\text{off},\text{off},\text{on}),\ (\text{on},\text{off},\text{on})\}$$: all $$5$$ legal states, since an all-off row conflicts with nothing.
- $$(\text{on},\text{off},\text{off}) \ \longrightarrow\ \{(\text{off},\text{off},\text{off}),\ (\text{off},\text{on},\text{off}),\ (\text{off},\text{off},\text{on})\}$$: anything with bulb $$1$$ off, $$3$$ options.
- $$(\text{off},\text{on},\text{off}) \ \longrightarrow\ \{(\text{off},\text{off},\text{off}),\ (\text{on},\text{off},\text{off}),\ (\text{off},\text{off},\text{on}),\ (\text{on},\text{off},\text{on})\}$$: anything with bulb $$2$$ off, $$4$$ options.
- $$(\text{on},\text{off},\text{on}) \ \longrightarrow\ \{(\text{off},\text{off},\text{off}),\ (\text{off},\text{on},\text{off})\}$$: needs both bulb $$1$$ and bulb $$3$$ off, only $$2$$ options.

That last one is the most restrictive, which makes sense: $$(\text{on},\text{off},\text{on})$$ has the most bulbs lit ($$2$$ of the $$3$$), so it leaves the least room for a neighboring row.

### Step 3: Roll the rows up via DP

Now define $$dp_r(s) = $$ number of valid ways to fill the first $$r$$ rows, given that row $$r$$ is in state $$s$$. The first row has no row below it to conflict with, so

$$
dp_1(s) = 1 \quad \text{for each of the $5$ legal states } s
$$

Every subsequent row only needs to look at the row directly beneath it (that's the whole point of building the compatibility map in Step 2), so

$$
dp_r(s) = \sum_{\substack{s' \text{ legal} \\ s' \text{ compatible with } s}} dp_{r-1}(s')
$$

Rolling this forward for $$3$$ rows (using the grid's top-bottom symmetry: it doesn't matter which side we call "row 1") and summing $$dp_3(s)$$ over all $$5$$ legal $$s$$ gives the total count of valid $$3\times 3$$ grids:

$$
\sum_{s} dp_3(s) = 63
$$

### Step 4: Convert to a probability

All $$512$$ on/off assignments to the $$9$$ bulbs are equally likely (each bulb is on independently with probability $$\tfrac12$$), and $$63$$ of them are valid. So

$$
P(\text{no two adjacent bulbs both on}) = \frac{63}{512}
$$

### Why this generalizes

Nothing above was really specific to a $$3\times 3$$ grid. For an $$m \times n$$ grid, encode each row as one of $$2^n$$ raw states (of which some smaller number $$S(n) \le 2^n$$ are internally legal), build the $$S(n) \times S(n)$$ compatibility map exactly as in Step 2, and run the same DP for $$m$$ rows. Each new row only ever needs the row directly below it, and that's the entire mechanism, so the whole computation costs about $$O\!\big(m \cdot S(n)^2\big)$$: $$m$$ rows, and up to $$S(n)^2$$ compatibility checks summed per row. A DP like this is really nothing more than a rule for **mapping states to states**; once that mapping is written down, the rest is bookkeeping.

There's a small optimization worth naming, too. Nothing in the setup actually forces rows to be the "line" and columns to be the "steps." A grid graph has no preferred orientation, so we could just as easily encode each *column* as a state (of $$m$$ bulbs, so $$S(m)$$ legal states) and step across the $$n$$ columns instead, giving cost $$O\!\big(n \cdot S(m)^2\big)$$, by the exact same argument with rows and columns swapped, WLOG.

Since $$S(k)$$ (the count of legal single-line states, no two adjacent bulbs on) grows exponentially in the line length $$k$$ (it's a Fibonacci-type count, and in fact $$S(3) = 5$$ is exactly what Step 1 found), that squared term dominates. So it's always worth picking whichever orientation keeps the *state* dimension smaller, even if that means taking more steps along the other one. The true best-case complexity is

$$
O\Big(\min\big(m\cdot S(n)^2,\ n\cdot S(m)^2\big)\Big)
$$

and for a long, narrow grid (say $$m = 3$$, $$n = 1000$$), that difference is enormous: sweeping across the $$1000$$ long direction with only $$S(3)=5$$ states per step is vastly cheaper than the reverse.

### Thus, the probability is $$\dfrac{63}{512}$$
