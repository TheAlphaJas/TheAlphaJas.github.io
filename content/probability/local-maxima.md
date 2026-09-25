---
title: Local Maxima
topics:
  - Linearity of Expectation
  - Symmetry
  - Recursion
---

$$14$$ pieces of paper labelled $$1$$–$$14$$ are placed in a line at random. We spot $$i$$ is a local maxima if the paper at the $$i$$th position is strictly larger than all of its adjacent papers. Find the expected number of local maxima in the sequence. For example, with $$6$$ numbers, $$513246$$ has $$3$$ local maxima, at the first, third, and last spots.

---

**Original Problem Link:** [https://www.quantguide.io/questions/local-maxima](https://www.quantguide.io/questions/local-maxima)

<!-- SOLUTION_SEPARATOR -->

Counting local maxima directly, by cases on the actual arrangement, looks painful. But every permutation of $$1,\dots,14$$ is equally likely, and that symmetry lets the whole thing collapse.

### Step 1: Set up with linearity of expectation

For position $$i$$, let $$X_i = 1$$ if $$i$$ is a local maximum and $$0$$ otherwise. We want

$$
E[\text{number of local maxima}] = \sum_{i=1}^{n} E[X_i] = \sum_{i=1}^n P(i \text{ is a local max})
$$

Each $$X_i$$ only depends on $$1$$ or $$2$$ nearby values, so we just need $$P(i \text{ is a local max})$$ for an edge position and for a middle position. By symmetry, that probability is the same for every edge position, and the same for every middle position.

### Step 2: Edge positions

Position $$1$$ (and symmetrically, position $$n$$) has only one neighbor, so it is a local max exactly when it beats that single neighbor. Since all permutations are equally likely, this is the same as picking $$2$$ random distinct numbers $$a, b$$ and asking $$P(a > b)$$. By symmetry between $$a$$ and $$b$$, that's

$$
P(\text{edge is a local max}) = \frac{1}{2}
$$

### Step 3: Middle positions

A middle position $$i$$ has two neighbors, and is a local max exactly when it beats both. Equivalently: pick $$3$$ random distinct numbers $$a, b, c$$ (standing for the left neighbor, the position itself, and the right neighbor): what's $$P(b > a \text{ and } b > c)$$, i.e. $$P(b \text{ is the largest of the three})$$?

All $$3! = 6$$ orderings of $$a, b, c$$ are equally likely, and $$b$$ is the largest in exactly $$2$$ of them ($$a<c<b$$ and $$c<a<b$$). So

$$
P(\text{middle is a local max}) = \frac{2}{6} = \frac{1}{3}
$$

### Step 4: Put it together

There are $$2$$ edge positions and $$n - 2$$ middle positions, and each contributes its probability independently to the sum in Step 1:

$$
E[\text{maxima}] = 2\cdot\frac{1}{2} + (n-2)\cdot\frac{1}{3} = 1 + \frac{n-2}{3} = \frac{n+1}{3}
$$

For $$n = 14$$:

$$
E[\text{maxima}] = \frac{14+1}{3} = \frac{15}{3} = 5
$$

### A slower approach, for fun: recursion

It's worth seeing $$E(n) = \frac{n+1}{3}$$ fall out of a recursion too, by relating $$E(n)$$ to $$E(n-1)$$ directly, since it makes the "why" more concrete.

**Building a random permutation of size $$n$$ from one of size $$n-1$$.** Take a uniformly random permutation of $$1, \dots, n-1$$, and insert the new largest value $$n$$ into one of the $$n$$ possible gaps (before the first element, between two elements, or after the last), each gap equally likely. This produces a uniformly random permutation of $$1,\dots,n$$.

**What inserting $$n$$ does to the maxima count.** Since $$n$$ is the biggest value around, wherever it lands it is automatically a new local maximum: that's a guaranteed $$+1$$. But it can also *destroy* existing maxima, because any old element now adjacent to $$n$$ picks up a neighbor bigger than itself, and can no longer be a local max:

- If $$n$$ lands at an **edge** (probability $$2/n$$), it touches exactly $$1$$ old position, so it can destroy at most that $$1$$ old maximum.
- If $$n$$ lands in the **middle** (probability $$(n-2)/n$$), it touches $$2$$ old positions (the ones that used to be adjacent to each other), so it can destroy up to $$2$$ old maxima.

Now take expectations. Every old position is, on average, a local max with probability $$E(n-1)/(n-1)$$ (that's just the average over all $$n-1$$ positions). So the *expected* number of old maxima destroyed is $$\frac{E(n-1)}{n-1}$$ per touched position, and every old maximum that *isn't* touched survives unchanged, contributing its share to $$E(n-1)$$ as usual. Putting the surviving part, the destroyed part, and the guaranteed new maximum together:

$$
E(n) = \underbrace{E(n-1)}_{\text{old maxima, before any are removed}} + \underbrace{1}_{\text{new element } n} - \underbrace{\left[\frac{2}{n}\cdot\frac{E(n-1)}{n-1} + \frac{n-2}{n}\cdot\frac{2E(n-1)}{n-1}\right]}_{\text{expected old maxima destroyed}}
$$

The bracket simplifies nicely:

$$
\frac{2}{n}\cdot\frac{E(n-1)}{n-1} + \frac{n-2}{n}\cdot\frac{2E(n-1)}{n-1} = \frac{E(n-1)}{n(n-1)}\Big[2 + 2(n-2)\Big] = \frac{E(n-1)}{n(n-1)}\cdot 2(n-1) = \frac{2E(n-1)}{n}
$$

so the recursion collapses to

$$
E(n) = E(n-1) + 1 - \frac{2E(n-1)}{n} = E(n-1)\cdot\frac{n-2}{n} + 1
$$

with $$E(2) = 1$$ (with only $$2$$ elements, both are edges, and exactly one of them is bigger, so there's always exactly $$1$$ local max). Unrolling this recursion (or just checking that $$E(n) = \frac{n+1}{3}$$ satisfies it) reproduces:

$$
E(n) = \frac{n+1}{3} \quad \implies \quad E(14) = 5
$$

exactly matching Step 4.

### A closing note: why $$1/2$$ and $$1/3$$ never drift

The per-position probabilities $$1/2$$ (edge) and $$1/3$$ (middle), computed at the small case $$n = 3$$, keep working unchanged all the way out to $$n = 14$$, and this isn't a coincidence. We can set up a recurrence for these probabilities themselves (in the same spirit as the recursion for $$E(n)$$ above), and it turns out the base case is exactly a fixed point of that recurrence, which is precisely why it never drifts, and gives a second, alternate lens on why the symmetry argument in Steps 2–3 works. I'll write a short blog post soon going into this properly.

### Thus, the expected number of local maxima is $$5$$
