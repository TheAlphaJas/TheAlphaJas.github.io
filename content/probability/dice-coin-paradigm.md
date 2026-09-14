---
title: Dice-Coin Paradigm
topics:
  - Conditional Probability
  - Geometric Series
  - Infinite Series
---

We flip a fair coin until we obtain our first tails. Given the first tails occurs on the $$n$$th flip, we roll a fair $$6$$-sided die $$n$$ times. Find the probability that the die value $$1$$ is observed in the rolls.

---

**Original Problem Link:** [https://www.quantguide.io/questions/dicecoin-paradigm](https://www.quantguide.io/questions/dicecoin-paradigm)

<!-- SOLUTION_SEPARATOR -->

### Step 1: Probability of seeing a 1, for a fixed $$n$$

Suppose we already knew the first tails landed on flip $$n$$, so we roll the die exactly $$n$$ times. Rolling "no $$1$$ at all" in $$n$$ independent rolls has probability $$(5/6)^n$$, so

$$
P(\text{at least one } 1 \mid n \text{ rolls}) = 1 - \left(\frac{5}{6}\right)^n
$$

That handles the die, for a fixed $$n$$. The remaining question is: how likely is each $$n$$ in the first place?

### Step 2: Probability that the first tails lands on flip $$n$$

For the first tails to occur exactly on flip $$n$$, the first $$n-1$$ flips must all be heads, and the $$n$$th must be tails:

$$
P(\text{first tails on flip } n) = \left(\frac{1}{2}\right)^{n-1}\cdot\frac{1}{2} = \left(\frac{1}{2}\right)^{n}
$$

### Step 3: Combine and sum over every possible $$n$$

The event "we see a $$1$$" can happen via any $$n = 1, 2, 3, \dots$$, and these are mutually exclusive (the coin gives exactly one value of $$n$$). So we weight each $$n$$'s die-probability by how likely that $$n$$ was, and sum over all of them:

$$
P(\text{see a } 1) = \sum_{n=1}^{\infty} \left(\frac{1}{2}\right)^n \left[1 - \left(\frac{5}{6}\right)^n\right]
$$

It's convenient to instead sum from $$n = 0$$: the $$n=0$$ term is $$1\cdot\left[1 - 1\right] = 0$$, so throwing it in changes nothing, but it lets us use the clean closed form $$\sum_{n=0}^{\infty} r^n = \frac{1}{1-r}$$ directly instead of the shifted version. Splitting the sum in two:

$$
P(\text{see a } 1) = \sum_{n=0}^{\infty}\left(\frac{1}{2}\right)^n - \sum_{n=0}^{\infty}\left(\frac{1}{2}\cdot\frac{5}{6}\right)^n = \sum_{n=0}^{\infty}\left(\frac{1}{2}\right)^n - \sum_{n=0}^{\infty}\left(\frac{5}{12}\right)^n
$$

### Step 4: Evaluate both geometric series

$$
\sum_{n=0}^{\infty}\left(\frac{1}{2}\right)^n = \frac{1}{1 - \frac12} = 2, \qquad \sum_{n=0}^{\infty}\left(\frac{5}{12}\right)^n = \frac{1}{1 - \frac{5}{12}} = \frac{12}{7}
$$

so

$$
P(\text{see a } 1) = 2 - \frac{12}{7} = \frac{14 - 12}{7} = \frac{2}{7}
$$

A quick sanity check: $$2/7 \approx 0.286$$. Since $$n$$ is at least $$1$$ with probability $$1$$, and $$P(\text{at least one } 1 \text{ in a single roll}) = 1/6 \approx 0.167$$, while more rolls make it more likely, a number moderately above $$1/6$$ is exactly what we'd expect.

### Thus, the probability of observing a die value of $$1$$ is $$\dfrac{2}{7}$$
