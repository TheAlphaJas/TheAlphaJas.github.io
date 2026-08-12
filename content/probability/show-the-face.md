---
title: Show the Face
topics:
  - Expectation
  - Conditional Probability
  - Markov Chains
  - Geometric Distribution
---

Roll a fair standard 6-sided die until a 6 appears. Given that the first 6 occurs before the first 5, find the expected number of times the die was rolled.

**Original Problem Link**: [Click here](https://www.quantguide.io/questions/show-the-face)

<!-- SOLUTION_SEPARATOR -->

Let us first drop the condition and solve the easy version:

> "Roll a fair die until a 6 appears. What is the expected number of rolls?"

Let $$N$$ be the number of rolls. To take exactly $$n$$ rolls, the first $$n-1$$ must be non-6 and the $$n$$-th must be a 6. The rolls are **independent**, so we just multiply:

$$
P(N = n) = \left(\frac{5}{6}\right)^{n-1}\left(\frac{1}{6}\right)
$$

This is geometric with $$p = \frac16$$, so $$E[N] = \sum_n n\,P(N = n) = 6$$.

Now add the condition: we are told the first 6 came before the first 5. What breaks?

### Step 1: Why counting sequences goes wrong here

The tempting fix is this. If the 6 must beat the 5, then none of the rolls before it can be a 5, so each intermediate roll has only $$\{1,2,3,4\}$$ available — 4 faces instead of 5. So swap $$\frac56$$ for $$\frac46$$:

$$
P(N = n) \stackrel{?}{=} \left(\frac{4}{6}\right)^{n-1}\left(\frac{1}{6}\right)
$$

First problem: multiplying per-roll probabilities was allowed because the rolls were independent. The condition is a statement about the *whole run*, not about each roll separately, so it couples the rolls together — knowing what roll 3 was tells you something about roll 7. That licence is gone.

Fine, so let us retreat to counting instead, and write everything as a fraction over sequences of length $$n$$:

$$
\frac{\#\{\text{good sequences of length } n\}}{\#\{\text{all sequences of length } n\}} = \frac{4^{n-1}}{6^{n}}
$$

The numerator is honest enough: $$4$$ choices for each of the first $$n-1$$ rolls, with the last roll forced to be a 6.

But now look at the denominator. Our experiment **stops** at the first 6. So a run of length $$n$$ only exists if the $$n$$-th roll is a 6! Any string that does not end in a 6 is not an outcome of our experiment at all — it is just the beginning of some *longer* run. It belongs to a bigger $$n$$.

So the numerator counts finished runs while the denominator counts unfinished fragments, and the ratio is not measuring anything we asked for. There is no honest denominator to write, because a stopped experiment does not have a fixed-length sample space.

> Interesting enough, In the unconditioned case we got away with this. "$$n-1$$ rolls failed, then one worked" is a fine argument there, and $$\frac{5^{n-1}}{6^n}$$ happens to be the right number. But that is the arithmetic being kind to us, not the framing being correct — and carrying the same argument over to the conditioned problem is not strictly valid, coz as discussed, individual throws aren't independant anymore.

Lets tackle this from another perspective, with something much more suited to handle infinite chain lengths, i.e. Markov Chains.

### Step 2: The Markov chain

Track the only thing that matters: is the race between the first 5 and the first 6 still open? Faces $$1,2,3,4$$ decide nothing; only $$5$$ and $$6$$ do. So three states are enough:

- $$S$$ — **running.** No 5 and no 6 yet.
- $$W$$ — **win.** A 6 arrived with no 5 before it. This is our condition.
- $$L$$ — **lose.** A 5 arrived first.

One roll from $$S$$ does one of three things:

$$
S \xrightarrow{\;4/6\;} S, \qquad S \xrightarrow{\;1/6\;} W, \qquad S \xrightarrow{\;1/6\;} L
$$

Both $$W$$ and $$L$$ are dead ends.
Note that we call $$L$$ a dead end, purely because the first 5 coming before the first 6, invalidates the original condition given in the condition, and hence won't be a valid chain in our reduced sample space of "experiments which follow the given condition - i.e. the first 6 comes before the first 5". 

Note that this Markov Chain formulation allows us to exploit the memoryless properly and simply multiply transition probabilities.. effectively removing the complications arising from "lack of independance between events" in the previous naive formulation of Step 1.

So the problem becomes:

> "Starting at $$S$$, find the expected number of steps to get absorbed, given that we end up at $$W$$ and not $$L$$."

### Step 3: Probability of the condition 

We want the probability that a run started at $$S$$ ends up at $$W$$. Call it $$P(S \to W)$$ — and note this means ending at $$W$$ *eventually*, after however many rolls it takes, not the $$\frac16$$ chance of jumping straight there on the next roll.

Condition on the first roll. With probability $$\frac16$$ we land in $$W$$ at once, with probability $$\frac16$$ we land in $$L$$ and are finished, and with probability $$\frac23$$ we are back at $$S$$ — where, since the chain has no memory, our chances are described by the very same $$P(S \to W)$$. So

$$
P(S \to W) = \frac{1}{6}(1) + \frac{1}{6}(0) + \frac{2}{3}\,P(S \to W)
$$

$$
\frac{1}{3}P(S \to W) = \frac{1}{6} \quad \Longrightarrow \quad P(S \to W) = \frac{1}{2}
$$

Which is just what symmetry would tell us: $$5$$ and $$6$$ are interchangeable faces, so whichever shows up first is equally likely to be either one.

Now here is the point of computing this. The event $$S \to W$$ **is** exactly what the problem conditions on — "the first 6 comes before the first 5" says precisely that our run ends at $$W$$. So the quantity we are being asked for is

$$
E[N \mid S \to W]
$$

and to get it we need the conditional distribution

$$
P(N = n \mid S \to W) = \frac{P(N = n,\; S \to W)}{P(S \to W)}
$$

We have just found the denominator. The numerator — the probability of ending on a 6 at roll $$n$$ *and* the run finishing at $$W$$ — is what we work out next.

### Step 4: The distribution, and the answer

How can the chain land in $$W$$ at step exactly $$n$$? Only one way — take the self-loop $$n-1$$ times, then the edge into $$W$$:

$$
P(N = n,\; S \to W) = \left(\frac{2}{3}\right)^{n-1}\cdot\frac{1}{6}
$$

A quick check that this is right: summing over all $$n$$ should give the total chance of winning,

$$
\sum_{n=1}^{\infty}\left(\frac{2}{3}\right)^{n-1}\frac{1}{6} = \frac{1}{6}\cdot\frac{1}{1 - \frac{2}{3}} = \frac{1}{2}
$$

which matches the $$P(S \to W) = \frac12$$ from Step 3.

Now divide to get the conditional distribution:

$$
P(N = n \mid S \to W) = \frac{P(N = n,\; S \to W)}{P(S \to W)} = \frac{\left(\frac{2}{3}\right)^{n-1}\frac{1}{6}}{\frac{1}{2}} = \frac{1}{3}\left(\frac{2}{3}\right)^{n-1}
$$

So given the condition, $$N$$ is geometric with $$p = \frac13$$, and

$$
E[N \mid S \to W] = \frac{1}{p} = 3
$$

### Step 5: Sanity check

Unconditionally we expected $$6$$ rolls, and $$3$$ is smaller — which is the right direction, since long runs give the 5 lots of chances to sneak in first, and the condition throws exactly those away.

### Thus, given that the first 6 occurs before the first 5, the expected number of rolls is $$3$$
