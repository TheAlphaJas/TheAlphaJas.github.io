---
title: Consecutive Tails
topics:
  - Combinatorics
---

A fair coin is flipped $$10$$ times. What is the probability that any tails which occur, occur only in consecutive pairs? For instance, $$THHTTHHTTH$$ fails because of the lone tail at the start, while $$HHTTTTHHHH$$ is fine — as is all heads.

**Original Problem Link**: [Click here](https://www.quantguide.io/questions/consecutive-tails)

<!-- SOLUTION_SEPARATOR -->

Before counting anything, let us pin down the structure of the problem.

Ten flips of a fair coin give $$2^{10} = 1024$$ possible sequences, and every one of them is **equally likely**, each with probability $$\frac{1}{1024}$$. That is the key simplification: because the sequences are equiprobable, we never have to weigh one against another. The answer is just

$$
P = \frac{\#\{\text{sequences where tails come only in pairs}\}}{1024}
$$

So this is purely a counting problem. All the work is in the numerator.

### Step 1: What does a valid sequence look like?

Read the condition carefully. Tails may only appear in consecutive pairs, so a valid sequence is nothing more than a string built out of two kinds of pieces:

- the block $$[TT]$$ — a pair of tails
- the single letter $$H$$

Glue any number of these together in any order and you get a valid sequence. Note that this correctly allows $$TTTT$$, which is just two $$[TT]$$ blocks sitting next to each other, and it correctly forbids a lone $$T$$, since there is no piece that can produce one.

Say we use $$i$$ blocks of $$[TT]$$. Those eat up $$2i$$ of our ten flips, so the rest must be heads:

$$
\#\text{heads} = 10 - 2i
$$

and the total number of *pieces* we are arranging is

$$
i + (10 - 2i) = 10 - i
$$

Since $$2i \le 10$$, the possible values are $$i = 0, 1, 2, 3, 4, 5$$. So the plan is clear: count the arrangements for each $$i$$, then add them up.

### Step 2: Counting the arrangements for a fixed $$i$$

We are arranging $$10 - i$$ pieces in a row: $$i$$ copies of $$[TT]$$ and $$10 - 2i$$ copies of $$H$$.

Start by pretending every piece is **distinguishable** — label the heads $$H_1, H_2, \ldots, H_{10-2i}$$ and the blocks $$B_1, B_2, \ldots, B_i$$. Then there are simply

$$
(10 - i)!
$$

orderings, since we have $$10-i$$ distinct things to permute.

But of course they are not distinguishable, and this badly overcounts. Swap $$H_3$$ with $$H_7$$ and the string of H's and T's you actually see does not change at all. Same if you swap $$B_1$$ with $$B_2$$. So every genuine sequence has been counted once for **every** way of relabelling the heads among themselves and the blocks among themselves — that is,

$$
(10-2i)! \cdot i!
$$

times over. To cancel this redundancy, we divide it out:

$$
\#\text{arrangements} = \frac{(10-i)!}{i!\,(10-2i)!} = \binom{10-i}{i}
$$

Which reads very naturally in the end: out of $$10-i$$ positions in the row of pieces, choose the $$i$$ that hold the $$[TT]$$ blocks.

> If you are being extra careful, you might also want to distinguish the two tails *inside* each block, multiplying the top by $$2^{i}$$. But those two tails are identical as well, so you would divide the very same $$2^{i}$$ straight back out. It cancels, and we can ignore it entirely.

### Step 3: Summing over $$i$$

Now just add up the six cases:

$$
\#\text{valid sequences} = \sum_{i=0}^{5}\binom{10-i}{i}
$$

Term by term:

- $$i = 0$$: $$\binom{10}{0} = 1$$ &nbsp;(all heads)
- $$i = 1$$: $$\binom{9}{1} = 9$$
- $$i = 2$$: $$\binom{8}{2} = 28$$
- $$i = 3$$: $$\binom{7}{3} = 35$$
- $$i = 4$$: $$\binom{6}{4} = 15$$
- $$i = 5$$: $$\binom{5}{5} = 1$$ &nbsp;(all tails, $$TTTTTTTTTT$$)

$$
1 + 9 + 28 + 35 + 15 + 1 = 89
$$

### Step 4: The probability

$$
P = \frac{89}{1024} \approx 0.0869
$$

### Step 5: Sanity check

Let us verify $$89$$ a completely different way, by building the count up from short sequences. Let $$A_n$$ be the number of valid sequences of length $$n$$.

Look at how a valid sequence of length $$n$$ *starts*. There are only two possibilities, since it cannot begin with a lone tail:

- it starts with $$H$$, and the remaining $$n-1$$ flips form any valid sequence — $$A_{n-1}$$ ways
- it starts with $$TT$$, and the remaining $$n-2$$ flips form any valid sequence — $$A_{n-2}$$ ways

These cases are disjoint and cover everything, so

$$
A_n = A_{n-1} + A_{n-2}
$$

with $$A_0 = 1$$ (the empty sequence) and $$A_1 = 1$$ (just $$H$$). Rolling it forward:

$$
1,\; 1,\; 2,\; 3,\; 5,\; 8,\; 13,\; 21,\; 34,\; 55,\; \mathbf{89}
$$

So $$A_{10} = 89$$, agreeing with the sum in Step 3. (Those are the Fibonacci numbers, which is a nice thing to fall out of a coin problem — the recursion above is exactly the Fibonacci rule.)

It is also easy to spot-check the small cases by hand. For $$n = 4$$ the formula gives $$\binom{4}{0} + \binom{3}{1} + \binom{2}{2} = 1 + 3 + 1 = 5$$, and indeed the only valid sequences are $$HHHH$$, $$TTHH$$, $$HTTH$$, $$HHTT$$ and $$TTTT$$.

### Thus, the probability that all tails occur in consecutive pairs is $$\frac{89}{1024}$$
