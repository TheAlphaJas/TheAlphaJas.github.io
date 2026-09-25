---
title: Decreasing Uniform Chain
topics:
  - Order Statistics
  - Record Values
  - Expectation
---

Let $$X_1, X_2, \dots \sim \text{Unif}(0,1)$$ IID. Let $$N$$ be the first index $$n$$ where $$X_n \neq \min\{X_1,\dots,X_n\}$$. Find $$\mathbb{E}[X_{N-1}]$$, i.e. the smallest value among the first $$N-1$$ values selected. The answer will be in the form $$a + be$$ for integers $$a$$ and $$b$$, where $$e$$ is Euler's constant. Find $$a+b$$.

---

**Original Problem Link:** [https://www.quantguide.io/questions/decreasing-uniform-chain](https://www.quantguide.io/questions/decreasing-uniform-chain)

<!-- SOLUTION_SEPARATOR -->

### Step 1: Understand the structure

$$X_n$$ fails to be the running minimum the first time it's **not smaller than everything before it**. So right up to that point, every draw was a new record low: the sequence of running minima is strictly decreasing:

$$
X_1 > X_2 > \cdots > X_{N-1}, \qquad \text{and then} \qquad X_N > X_{N-1}
$$

($$N \ge 2$$ always: with just one draw, $$X_1$$ trivially equals $$\min\{X_1\}$$, so the streak can't break on the first draw.) We want $$E[X_{N-1}]$$, the value of the running minimum right before it stops being extended.

### Step 2: The density of $$X_{N-1}$$, for a fixed stopping index

Since $$N$$ itself is random, let's first fix a candidate value $$n$$ for $$N$$ and work out the (sub-)density of $$X_{n-1}$$ landing at some value $$x$$, *conditional on the streak lasting exactly this long*. There are three independent requirements packed into this event:

- **The $$n-2$$ earlier draws must all exceed $$x$$.** For $$X_{n-1} = x$$ to be smaller than everything before it, we need $$X_1, \dots, X_{n-2} > x$$. Each is Uniform$$(0,1)$$ and independent, so this happens with probability $$(1-x)^{n-2}$$.

- **Those $$n-2$$ draws must also land in strictly decreasing order.** Being bigger than $$x$$ isn't enough: they also have to arrive as $$X_1 > X_2 > \cdots > X_{n-2}$$ specifically, not in some other order. Since the draws are independent and continuous, all $$(n-2)!$$ orderings of $$X_1,\dots,X_{n-2}$$ are equally likely, so the probability of landing in exactly this one is $$\dfrac{1}{(n-2)!}$$.

- **The streak must break right after.** We need $$X_n > x$$, which (being an independent Uniform draw) happens with probability $$1-x$$.

Multiplying these together, and including the density ($$=1$$ on $$(0,1)$$) of $$X_{n-1}$$ itself landing at $$x$$:

$$
f_n(x) = (1-x)^{n-2} \cdot \frac{1}{(n-2)!} \cdot (1-x) = \frac{(1-x)^{n-1}}{(n-2)!}
$$

### Step 3: Does this integrate to a valid probability?

Before trusting $$f_n$$, check that summing it over every possible stopping index $$n \ge 2$$, and integrating over $$x$$, gives exactly $$1$$, since $$N$$ must take *some* value.

$$
\int_0^1 f_n(x)\, dx = \frac{1}{(n-2)!}\int_0^1 (1-x)^{n-1}\, dx = \frac{1}{(n-2)!}\cdot\frac{1}{n} = \frac{1}{n\,(n-2)!}
$$

Rewrite this with a common factorial in the denominator: since $$n! = n(n-1)(n-2)!$$,

$$
\frac{1}{n\,(n-2)!} = \frac{n-1}{n!} = \frac{n}{n!} - \frac{1}{n!} = \frac{1}{(n-1)!} - \frac{1}{n!}
$$

This telescopes beautifully when summed from $$n=2$$ to $$\infty$$:

$$
\sum_{n=2}^{\infty}\left[\frac{1}{(n-1)!} - \frac{1}{n!}\right] = \left(\frac{1}{1!} - \frac{1}{2!}\right) + \left(\frac{1}{2!} - \frac{1}{3!}\right) + \cdots = \frac{1}{1!} = 1
$$

Every term cancels against the next one, leaving just the very first piece. So the total probability really is $$1$$. This confirms $$f_n$$ is a legitimate (sub-)density, and we can trust it to compute $$E[X_{N-1}]$$.

### Step 4: Compute $$E[X_{N-1}]$$

Now weight $$x$$ by its density and integrate, then sum over $$n$$:

$$
E[X_{N-1}] = \sum_{n=2}^{\infty} \int_0^1 x\, f_n(x)\, dx = \sum_{n=2}^{\infty} \frac{1}{(n-2)!}\int_0^1 x(1-x)^{n-1}\, dx
$$

The inner integral is a Beta integral: $$\int_0^1 x^1(1-x)^{n-1}\, dx = \dfrac{1!\,(n-1)!}{(n+1)!}$$. Substituting in,

$$
\int_0^1 x\, f_n(x)\, dx = \frac{1}{(n-2)!}\cdot\frac{(n-1)!}{(n+1)!} = \frac{n-1}{(n+1)!}
$$

using $$(n-1)!/(n-2)! = n-1$$. As in Step 3, split the numerator to make the sum telescope: write $$n - 1 = (n+1) - 2$$:

$$
\frac{n-1}{(n+1)!} = \frac{(n+1) - 2}{(n+1)!} = \frac{1}{n!} - \frac{2}{(n+1)!}
$$

### Step 5: Sum both pieces separately, via $$e$$

Recall $$e = \sum_{k=0}^{\infty} \dfrac{1}{k!}$$. The first piece, summed from $$n=2$$:

$$
\sum_{n=2}^{\infty} \frac{1}{n!} = e - \frac{1}{0!} - \frac{1}{1!} = e - 2
$$

The second piece, reindexing $$m = n+1$$ (so $$m$$ runs from $$3$$ to $$\infty$$):

$$
\sum_{n=2}^{\infty} \frac{2}{(n+1)!} = 2\sum_{m=3}^{\infty}\frac{1}{m!} = 2\left(e - \frac{1}{0!} - \frac{1}{1!} - \frac{1}{2!}\right) = 2(e - 2.5)
$$

Putting it together:

$$
E[X_{N-1}] = (e-2) - 2(e - 2.5) = e - 2 - 2e + 5 = 3 - e
$$

### Step 6: Final answer

We're told $$E[X_{N-1}] = a + be$$, so matching $$3 - e$$ gives $$a = 3$$, $$b = -1$$, hence

$$
a + b = 3 + (-1) = 2
$$

As a quick sanity check, $$3 - e \approx 0.282$$, comfortably inside $$(0,1)$$ as it must be, and noticeably smaller than $$0.5$$, which makes sense: $$X_{N-1}$$ is, by construction, the bottom of a streak of record lows, so it's biased well below the average of a single Uniform$$(0,1)$$ draw.

### Thus, $$a + b = 2$$
