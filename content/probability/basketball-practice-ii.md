---
title: Basketball Practice II
topics:
  - Expectation
  - Conditional Expectation
---

Frank makes his first free throw and misses his second free throw. The probability of making the $$n$$th free throw is equal to the proportion of free throws he made during his first $$n-1$$ attempts. How many free throws can Frank expect to make in 100 attempts?

**Original Problem Link**: [Click here](https://www.quantguide.io/questions/basketball-practice-ii)

<!-- SOLUTION_SEPARATOR -->

Let $$H_k$$ be the number of throws Frank has **made** in his first $$k$$ attempts. We are told $$H_2 = 1$$ — one made, one missed — and we want $$E[H_{100}]$$.

The natural way in is to go throw by throw. Each attempt contributes either $$1$$ or $$0$$ to the final count, so

$$
E[H_{100}] = \underbrace{1}_{\text{first two throws}} + \sum_{n=3}^{100} P(\text{Frank makes throw } n)
$$

So everything reduces to finding the probability of a make on the $$n$$th throw. Get that, and we just sum it from $$3$$ to $$100$$.

### Step 1: Writing the naive expression

The rule we are handed is direct enough. If we know the history up to throw $$n-1$$, then

$$
P(\text{make throw } n) = \frac{\#\{\text{throws made up to and including } n-1\}}{n-1} = \frac{H_{n-1}}{n-1}
$$

But there is an obvious catch: this depends on the **history**. $$H_{n-1}$$ is not a number we know, it is a random variable — Frank might have made 3 of his first 8, or 6 of his first 8, and the answer differs.

That is fine, because we do not need the probability for one particular history. We need it averaged over all of them. So let us define

$$
p_n = P(\text{Frank makes throw } n) = E\!\left[\frac{H_{n-1}}{n-1}\right] = \frac{E[H_{n-1}]}{n-1}
$$

Think of $$p_n$$ as the *average probability* of a make on throw $$n$$, taken over every way the history could have played out. (The $$n-1$$ came out of the expectation because it is just a constant.) This is exactly the quantity our sum needs.

### Step 2: Breaking the history one throw back

Here is the useful observation. The count $$H_{n-1}$$ can be written in terms of the count one step earlier, because from throw $$n-2$$ to throw $$n-1$$ only one thing happened — Frank either made throw $$n-1$$ or he did not:

- if he **made** it, then $$H_{n-1} = H_{n-2} + 1$$
- if he **missed** it, then $$H_{n-1} = H_{n-2}$$

So we split into those two cases and average over them. The made-case carries probability $$p_{n-1}$$, and taking expectations gives

$$
E[H_{n-1}] = E[H_{n-2}] + p_{n-1}
$$

Note that we did not need the two pieces to be independent here — we are only adding up expected values, and expectation is additive regardless.

Now the trick: we already have a name for $$E[H_{n-2}]$$. Applying the definition of $$p_n$$ from Step 1 one step earlier,

$$
p_{n-1} = \frac{E[H_{n-2}]}{n-2} \quad \Longrightarrow \quad E[H_{n-2}] = (n-2)\,p_{n-1}
$$

Substituting this in:

$$
E[H_{n-1}] = (n-2)\,p_{n-1} + p_{n-1} = (n-1)\,p_{n-1}
$$

So the expected probability at step $$n$$ has become a recursion in the expected probability at step $$n-1$$.

### Step 3: Solving the recursion

Feed that back into the definition of $$p_n$$:

$$
p_n = \frac{E[H_{n-1}]}{n-1} = \frac{(n-1)\,p_{n-1}}{n-1}
$$

$$
p_n = p_{n-1}
$$

The $$(n-1)$$ cancels clean, and we are left with something almost suspiciously simple: **the probability never changes.** Whatever it was on the previous throw, it is the same on this one.

(One bit of care: the substitution $$E[H_{n-2}] = (n-2)p_{n-1}$$ needed the rule to actually apply at throw $$n-1$$, so this recursion is valid for $$n \geq 4$$. We just need a starting value.)

That starting value is easy, because at throw $$3$$ there is no randomness in the history at all — Frank has made exactly $$1$$ of $$2$$:

$$
p_3 = \frac{H_2}{2} = \frac{1}{2}
$$

Therefore

$$
p_n = \frac{1}{2} \qquad \text{for every } n = 3, 4, \ldots, 100
$$

### Step 4: Summing up

Now the sum from the very beginning is trivial. Throws $$3$$ through $$100$$ are $$98$$ throws, each worth $$\frac12$$ in expectation, and the first two throws contributed a guaranteed $$1$$ make:

$$
E[H_{100}] = 1 + \sum_{n=3}^{100}\frac{1}{2} = 1 + \frac{98}{2} = 1 + 49 = 50
$$

### Step 5: Sanity check

The algebra worked, but why *should* the answer be a flat one-half at every step? Here is the reason, and it makes the whole result feel inevitable.

Look at the rule again. The chance of a make is the proportion of makes so far; so the chance of a miss is the proportion of misses so far. The rule treats makes and misses **identically** — swap the two words everywhere and you have the exact same problem.

And look at where Frank starts: $$1$$ make and $$1$$ miss. That starting history is perfectly balanced too, with no tilt toward either outcome.

So the entire process is symmetric under swapping "make" and "miss". There is simply no reason for it to favour one over the other, which forces

$$
E[\text{makes}] = E[\text{misses}]
$$

Since the two must add up to $$100$$ throws, each is $$50$$. That is our answer again, with no recursion needed — and it explains why $$p_n$$ had to be $$\frac12$$ rather than drifting up or down: any drift would have to pick a side, and the problem gives it no grounds to.

> Worth noting how strong the history-dependence really is, even though the average came out so tame. Frank's tally does not cluster around $$50$$ at all — it is *equally likely* to be any value from $$1$$ to $$99$$.
>
> Why? Say the final tally is $$m$$, so of the remaining $$98$$ throws, $$m-1$$ were makes and $$99-m$$ were misses. Fix any one such sequence. Its denominators are just the attempt counts $$2, 3, \ldots, 99$$, no matter how the makes and misses are arranged. Its make-numerators run $$1, 2, \ldots, m-1$$ — each make finds exactly one more make in the history than the previous one did, so the last one finds $$m-1$$ — and its miss-numerators likewise run $$1, 2, \ldots, 99-m$$. So *every* such sequence has the same probability,
> $$\frac{(m-1)!\,(99-m)!}{2 \cdot 3 \cdots 99} = \frac{(m-1)!\,(99-m)!}{99!}$$
> and there are $$\binom{98}{m-1}$$ of them, so
> $$P(H_{100} = m) = \binom{98}{m-1}\frac{(m-1)!\,(99-m)!}{99!} = \frac{98!}{99!} = \frac{1}{99}$$
> which does not depend on $$m$$ at all. The mean of that flat distribution is $$\frac{1 + 99}{2} = 50$$, agreeing with Step 4.

### Thus, Frank can expect to make $$50$$ of his 100 free throws
