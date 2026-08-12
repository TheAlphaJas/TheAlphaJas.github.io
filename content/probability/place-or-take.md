---
title: Place or Take
topics:
  - Expectation
  - Series
  - Optimization
---

You are playing a one-player game with two opaque boxes. At each turn, you can choose to either "place" or "take".
"Place" places $1 from a third party into one box randomly. "Take" empties out one box randomly and that money is yours.
This game consists of 100 turns where you must either place or take. Assuming optimal play, what is the expected payoff of this game?
Note that you do not know how much money you have taken until the end of the game.

---

**Original Problem Link:** [https://www.quantguide.io/questions/place-or-take](https://www.quantguide.io/questions/place-or-take)

<!-- SOLUTION_SEPARATOR -->

Before touching any algebra, note that the boxes are opaque and we learn nothing until the game ends.
So there is no information to adapt to — a strategy is just a fixed sequence of 100 moves, decided in advance.
All we have to do is find the best sequence.

### Step 1: What does the optimal sequence look like?

First, let us convince ourselves of the shape of the answer: **all the places come first, then all the takes.**

Consider the case where we are allowed at most one take. It obviously has to be at the very end.
Any place made *after* the take does nothing for us — it adds to a box that is never emptied again,
so that dollar can never become ours. Money placed *before* the take, on the other hand, is money the take can sweep.

Now build up by induction. Say we want to add one more take. Ignore the take we have already committed to the last turn,
and look at the remaining turns as a fresh instance of the same problem. By the same reasoning as above,
the new take belongs at the end of *that* block — i.e. immediately before the take we set aside.

Repeating this, all the takes get pushed to the back and all the places to the front. So the optimal strategy is

$$
\underbrace{P\,P\,\cdots\,P}_{100-k}\;\underbrace{T\,T\,\cdots\,T}_{k}
$$

and the only thing left to choose is $$ k $$, the number of takes.

### Step 2: Expected value of each take

Let $$ k $$ be the number of takes, so we make $$ n = 100 - k $$ places first.

After the placing phase, box $$ A $$ holds $$ X \sim \text{Bin}\!\left(n, \tfrac{1}{2}\right) $$ dollars and box $$ B $$ holds $$ n - X $$.

**First take.** We empty a uniformly random box, so

$$
E[T_1] = \frac{1}{2}E[X] + \frac{1}{2}E[n - X] = \frac{n}{2}
$$

Note what happens to the boxes: whichever box we emptied is now zero, and *no more money is ever placed*.
So from here on the state is always "one box holds everything that is left, the other is empty".
The expected money still sitting in the boxes is

$$
n - \frac{n}{2} = \frac{n}{2}
$$

**Second take.** We again pick a box at random. With probability $$ \tfrac{1}{2} $$ we pick the empty one and get nothing,
and with probability $$ \tfrac{1}{2} $$ we pick the one holding the remainder $$ R $$:

$$
E[T_2] = \frac{1}{2}\cdot 0 + \frac{1}{2}E[R] = \frac{1}{2}\cdot\frac{n}{2} = \frac{n}{4}
$$

The same argument repeats: each take collects half of what is left in expectation, and therefore halves what remains.
So

$$
E[T_i] = \frac{n}{2^i}, \qquad i = 1, 2, \ldots, k
$$

### Step 3: Sum the GP

$$
E(k) = \sum_{i=1}^{k} \frac{n}{2^i} = n\left(1 - \frac{1}{2^k}\right)
$$

$$
E(k) = (100 - k)\left(1 - 2^{-k}\right)
$$

The trade-off is now explicit. More takes means more chances to collect, but every extra take costs us a dollar of principal.

> **Sanity check.** There is a second route to the same formula. Follow a single placed dollar: it sits in its box
> until that box happens to be swept, and each take picks its box with probability $$ \tfrac{1}{2} $$, independently.
> So a dollar placed before all $$ k $$ takes is collected with probability $$ 1 - 2^{-k} $$. Summing over the
> $$ n $$ dollars gives $$ n(1 - 2^{-k}) $$ directly. This also re-proves Step 1: a dollar's chance of being
> collected only grows with the number of takes that follow it, so every place belongs before every take.

### Step 4: Maximize over $$ k $$

Treat $$ k $$ as continuous and differentiate:

$$
\frac{dE}{dk} = -\left(1 - 2^{-k}\right) + (100 - k)\,2^{-k}\ln 2
$$

Setting this to zero:

$$
(100 - k)\,2^{-k}\ln 2 = 1 - 2^{-k}
$$

Multiplying through by $$ 2^{k} $$:

$$
(100 - k)\ln 2 = 2^{k} - 1
$$

$$
2^{k} = (100 - k)\ln 2 + 1
$$

This is transcendental, so plot the two sides on [Desmos](https://www.desmos.com/calculator) —
$$ y = (100 - x)\ln 2 + 1 $$ (a gently falling line) against $$ y = 2^{x} $$ (an exploding exponential).
They cross once, at

$$
k^{*} \approx 6.05
$$

### Step 5: Round to an integer

$$ k $$ has to be a whole number, so check the two candidates on either side of $$ k^{*} $$:

$$
E(6) = 94\left(1 - \frac{1}{64}\right) = 94 \cdot \frac{63}{64} = \frac{2961}{32} = 92.53125
$$

$$
E(7) = 93\left(1 - \frac{1}{128}\right) = 93 \cdot \frac{127}{128} = \frac{11811}{128} \approx 92.2734
$$

(and $$ E(5) = 95 \cdot \frac{31}{32} = 92.03125 $$, for comparison)

So the optimum is $$ k = 6 $$: place 94 times, then take 6 times.

### Thus, the expected payoff under optimal play is $$\frac{2961}{32} = 92.53125$$
