---
title: "Monotonic Search with Non-Uniform Priors?"
date: "2026-09-06"
summary: "Binary search always queries the midpoint — but that's only optimal when you're clueless about where the answer lies. Here's the information-theoretic argument for querying the median of your belief instead."
tags:
  - Information Theory
  - Search Algorithms
  - Bayesian Statistics
---

We all know binary search.

Generally used for queries where you have some monotonic condition over a search space, and you want to find the first position where the condition becomes true.

For example,

```text
false false false false false true true true true
                         ↑
                       answer
```

The standard strategy is simple: look at the midpoint.

If the condition is true there, the answer must lie to the left. Otherwise, it must lie to the right.

Repeat this, and the search space gets cut roughly in half every time.

But why do we always choose the **midpoint**?

The usual answer is:

> Because it divides the search space into two equally-sized pieces.

And this works fine, when we are clueless as to where our answer might lie, within the search space.

However, consider another scenario.

What if, before we even perform our first query, **we have some belief about where the answer is likely to be?**

Maybe we know that the answer is much more likely to be near the right side of the search space.

To find our answer the fastest, should we still blindly pick the geometric midpoint?

Probably not.

Below I discuss this in a bit more detail, using information theory as a way to guide our search for the optimal guessing algorithm.

---

## A search query is an experiment

Suppose the unknown answer is a random variable $$X$$.

(Technically the answer is a fixed, deterministic value. However, our belief about it is stochastic, coz we don't know "where exactly" the answer is, hence we may refer to our belief about the answer as a random variable.)

We have some search space containing all the possible values of $$X$$.

Now consider choosing some breakpoint $$q$$.

Because the condition is monotonic, querying $$q$$ gives us a binary answer:

$$
X \le q
$$

or

$$
X > q.
$$

So every possible breakpoint can be thought of as an **experiment**.

The experiment has two possible outcomes.

Suppose the probability that the answer lies on the left is

$$
P(X\le q)=p.
$$

Then the probability that it lies on the right is

$$
P(X>q)=1-p.
$$

So the breakpoint $$q$$ creates a binary source of information with probabilities

$$
(p,1-p).
$$

Now comes the interesting question:

> **Which breakpoint gives us the most information?**

---

## Information-theoretically, we want the most uncertain experiment

The information contained in a binary random variable is its entropy:

$$
H(p)
=
-p\log_2p-(1-p)\log_2(1-p).
$$

This is the binary entropy function.

It looks like this conceptually:

```text
H(p)
1.0 |             ●
    |           /   \
    |         /       \
    |       /           \
    |     /               \
0.0 | ●_______________________●
      0          1/2          1
```

The entropy is maximized when

$$
p=\frac12.
$$

In other words, the most informative binary experiment is the one where its two outcomes are equally likely.

This is also intuitively reasonable.

If I tell you:

> "There is a 99.9% chance the answer is on the left."

then asking this question doesn't teach you very much. You already almost know what the answer will be.

But if I tell you:

> "There is a 50% chance it's on either side."

then observing the answer eliminates half of your uncertainty.

So the optimal breakpoint is the one satisfying

$$
\boxed{P(X\le q)=\frac12}
$$

or equivalently,

$$
\boxed{F(q)=\frac12}
$$

where $$F$$ is the CDF of our belief about $$X$$.

In other words:

> **The optimal breakpoint is the median of our current belief distribution.**

---

## So what does this have to do with binary search?

Well, consider the usual binary search assumption.

Suppose every possible answer in

$$
[L,R]
$$

is equally likely.

Then our CDF is

$$
F(x)=\frac{x-L}{R-L}.
$$

We want

$$
F(q)=\frac12.
$$

Therefore,

$$
\frac{q-L}{R-L}=\frac12
$$

which gives

$$
q=\frac{L+R}{2}.
$$

The midpoint.

Essentially, ordinary binary search can be seen as a special case of this generalized prior-belief search.

---

## What happens with a non-uniform prior?

Now suppose we have some prior belief about where the answer is.

Instead of

$$
P(X=x)=\frac1N
$$

for every $$x$$, suppose we have a probability mass function

$$
P(X=x)=p_x.
$$

Then the probability that the answer lies at or before index $$i$$ is

$$
\sum_{x\le i}p_x.
$$

We want to find the index $$i$$ for which this cumulative probability is closest to 0.5 in absolute distance terms.

That index is simply the **discrete median** of our prior.

So our generalized monotonic search becomes:

1. Maintain a probability distribution over possible answers.
2. Find its median.
3. Query the monotonic condition at that point.
4. Eliminate the impossible side.
5. Renormalize the remaining probability distribution.
6. Repeat.

If new information changes our beliefs in a more complicated way, we can update the posterior accordingly and find its new median.

Note that the above exercise is essentially a way to optimally utilize prior information (beliefs), in order to converge to our answer faster.

Ofcourse, in all cases, naive binary search will definitely work, however using priors may lead to our answer faster — subject to the accuracy of our prior itself!

---

## An intuitive example

Suppose we're trying to find the **minimum value $$x$$** satisfying some monotonic condition:

$$
f(x)=\text{true}.
$$

For example,

```text
x:       1  2  3  4  ...  74  75  76  ...  100
condition:
         F  F  F  F  ...   F   ?   ?  ...   ?
```

If we go by ordinary binary search, our first guess is

$$
50.
$$

But suppose we have prior knowledge.

Maybe from historical data, previous experiments, or the structure of the problem, we believe:

> **There is an 80% chance that the answer is between 75 and 100.**

That is already valuable information, and we should use it to enhance our guessing algorithm to make it more optimal (i.e. converge faster).

We can encode this as a prior.

For simplicity, imagine:

$$
P(75\le X\le100)=0.8
$$

and

$$
P(1\le X<75)=0.2.
$$

We can distribute that probability mass however we believe is appropriate within those regions.

For example, if we assume uniformity inside each region,

$$
P(X=x)=
\begin{cases}
0.2/74 & 1\le x<75,\\[4pt]
0.8/26 & 75\le x\le100.
\end{cases}
$$

Now ask:

> Where does the cumulative probability first reach $$50\%$$?

All of the first 74 positions together contain only 20% probability.

So we need another 30% probability mass from the region $$75\ldots100$$.

Since that region contains 80% probability uniformly, we need

$$
\frac{0.30}{0.80}=0.375
$$

of that region.

So our first query is around

$$
75+0.375(25)\approx84.4.
$$

Instead of blindly asking at 50, we ask around **84**.

Which makes sense intuitively — we would want to query somewhere near our expected range, instead of somewhere away around 50.

---

## And this isn't restricted to discrete search

Nothing fundamental here requires $$X$$ to be an integer.

Suppose $$X$$ is continuous with probability density $$p(x)$$.

The CDF is

$$
F(x)=\int_{-\infty}^{x}p(t)\,dt.
$$

Our optimal breakpoint $$q$$ satisfies

$$
F(q)=\frac12.
$$

So the same idea works for continuous search spaces.

---

## Posterior can change with prior too!

In ordinary binary search, the posterior update is straightforward.

You ask whether

$$
X\le q.
$$

Suppose the answer is "no."

Then everything at or below $$q$$ is impossible.

Our posterior becomes

$$
P(X\mid X>q).
$$

So we essentially:

1. remove the impossible region,
2. renormalize the remaining probability.

But Bayesian search (a name for what we've formulated all along) doesn't have to work this way.

Suppose an experiment gives us some observation $$Y=y$$ whose probability depends on the actual value of $$X$$ (our true value which we wish to find).

Then Bayes' rule gives

$$
P(X=x\mid Y=y)
\propto
P(Y=y\mid X=x)P(X=x).
$$

Now the experiment can do more than simply eliminate one side.

It can possibly **reshape the probability distribution inside the surviving region**.

For example, imagine we're searching for a value between 1 and 1000.

We learn that 1000 isn't the answer.

Because the search space is monotonic, this immediately tells us that every value above 1000 is impossible — which isn't particularly interesting.

But suppose the experiment also gives us some independent evidence that values near 2 are unlikely, using some other characteristic about our answer and answer-space, which we may know about.

Then our posterior can simultaneously reduce probability around 1000 **and** around 2.

The next optimal breakpoint isn't determined by the normalized "partial original distribution" anymore.

It is determined by the **new posterior** (which may include effects of reducing mass around 2).

---

Therefore, Bayesian search is a cool algorithm for finding a certain breakpoint for a function, which behaves monotonically in its search space. Binary search simply happens to be a special simplified case, where we have a uniform prior, and simplified interaction between prior and posterior.

Ofcourse, there are some key points to be noted:

1. I've used the name "Bayesian search" loosely here; the concept is actually termed as Horstein's Probabilistic Bisection Algorithm (1963), which is probably a more apt name.

2. The gain obtained by using the prior fundamentally depends on how good the prior is. Say we are 95% sure of the correct answer — it will work much faster than binary search. However, if we are 95% sure of the *wrong* answer, it may be slower than naive binary search (or if our prior is at 100%, we may miss it altogether). So it only makes sense to use Bayesian search if our prior performs better than assuming a uniform distribution, which in turn happens where there is a certain degree of truthfulness to our prior.

Perhaps in future blogs I will explore this concept: how good our prior has to be for Bayesian search to make sense, i.e. trying to quantify the "truthfulness" of priors — and, in the alternate case, where assuming a uniform prior instead leads to faster convergence. The answer to this probably exists in prior literature, I suspect using KL divergence or Jensen-Shannon divergence — but these blogs reflect my own thought process more, and are aimed at documenting what I find interesting in an intuitive manner, instead of teaching stuff which already exists.
