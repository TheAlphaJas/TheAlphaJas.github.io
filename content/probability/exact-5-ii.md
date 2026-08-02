---
title: Exact 5 II
topics:
  - Statistics
  - Expectations
---

Abd continually rolls a fair $$6$$-sided die until he obtains his first $$6$$.  
What’s the expected number of times Abd rolls a $$5$$ before he stops?

**Original Problem Link**: [Click here](https://www.quantguide.io/questions/exact-5-ii)

<!-- SOLUTION_SEPARATOR -->

Let $$ X $$ be the event representing number of times we get a $$5$$ before hitting our first $$6$$.

Let’s try to break this down using conditional expectation.  
From any given state, every die roll gives us 6 possible outcomes:

- With probability $$ \frac{1}{6} $$, we get a $$5$$.
- With probability $$ \frac{1}{6} $$, we get a $$6$$ → game stops.
- With probability $$ \frac{4}{6} $$, we get something else ($$1$$, $$2$$, $$3$$, or $$4$$).


Let’s write the expected value in terms of these outcomes:

$$
E[X] = \frac{1}{6} \cdot E[X \mid \text{5}] + \frac{1}{6} \cdot E[X \mid \text{6}] + \frac{4}{6} \cdot E[X \mid \text{Other}]
$$

Now, analyze each term:

- $$ E[X \mid \text{6}] = 0 $$ → because we stop immediately, no more $$5$$s possible.
- $$ E[X \mid \text{5}] = 1 + E[X] $$ → we got one $$5$$, and then we're back to square one, since the process restarts.
- $$ E[X \mid \text{Other}] = E[X] $$ → getting $$1$$, $$2$$, $$3$$, or $$4$$ doesn't change the structure. We're still in the exact same state with same probabilities.

### Substituting all this in:

$$
E[X] = \frac{1}{6}(1 + E[X]) + \frac{1}{6}(0) + \frac{4}{6}(E[X])
$$

$$
E[X] = \frac{1}{6} + \frac{1}{6}E[X] + \frac{4}{6}E[X]
$$

$$
E[X] = \frac{1}{6} + \frac{5}{6}E[X]
$$

Bring terms together:

$$
E[X] - \frac{5}{6}E[X] = \frac{1}{6}
\Rightarrow \frac{1}{6}E[X] = \frac{1}{6}
\Rightarrow E[X] = 1
$$

### Final Answer

So the expected number of times Abd rolls a $$5$$ before his first $$6$$ is:

$$
\boxed{1}
$$