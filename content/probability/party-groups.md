---
title: Party Groups
topics:
  - Expectation
  - Recursion
  - Random Permutations
  - Harmonic Numbers
---

There are $$50$$ guests at a party and they are making groups for a game. To do this they each write their name on a piece of paper and put it into a hat. One by one, each guest picks a name from the hat. Each guest will be a part of a group with the guest they pulled the name out of from the hat. If a guest pulls out their own name, they are in a group all by themselves. If Guest A pulls out Guest B's name, Guest B pulls out Guest C's name, and Guest C pulls out Guest A's name, they are all a part of the same closed group and no one else will be able to join them. How many groups will there be on average? Round your answer to the nearest tenth.

---

**Original Problem Link:** [https://www.quantguide.io/questions/party-groups](https://www.quantguide.io/questions/party-groups)

<!-- SOLUTION_SEPARATOR -->

We could, in principle, list out every possible way the names get drawn and count the groups in each. But with $$50$$ guests that's $$50!$$ outcomes, and even organizing them by group structure is tedious. So instead, let's think **recursively**.

### Step 1: Setting up the recursion

Let $$E_n$$ be the expected number of groups when there are $$n$$ guests.

Say we already have $$n-1$$ people, and they formed $$E_{n-1}$$ groups on average. Now an $$n$$th person shows up. What can happen to the group count? Only two things:

1. **He makes a new group**, with only him in it. This happens exactly when he pulls out his own name. The count goes up by $$1$$.
2. **He joins an existing group.** Someone's chain now passes through him before closing, so he slots into a group that was already there. The count doesn't change.

So if we can compute the probability of him making a new group, we get a recurrence in $$E_n$$!

### Step 2: What's the probability he picks his own name?

Here's the catch: we don't know *when* he draws. He could be the first to pick from the hat, or the last, or anywhere in between, and every position among $$1, \dots, n$$ is equally likely. So let's work it out position by position.

- **He picks first.** All $$n$$ names are in the hat, so he draws his own with probability
  $$
  \frac{1}{n}
  $$
- **He picks second.** The first guest must *not* take his name, and then he must draw it from the $$n-1$$ left:
  $$
  \frac{n-1}{n}\cdot\frac{1}{n-1} = \frac{1}{n}
  $$
- **He picks third.** Neither of the first two may take his name, then he draws it from the $$n-2$$ left:
  $$
  \frac{n-1}{n}\cdot\frac{n-2}{n-1}\cdot\frac{1}{n-2} = \frac{1}{n}
  $$
- **He picks fourth.** Same idea, one more factor:
  $$
  \frac{n-1}{n}\cdot\frac{n-2}{n-1}\cdot\frac{n-3}{n-2}\cdot\frac{1}{n-3} = \frac{1}{n}
  $$

Every time, the product telescopes. In general, if he picks $$k$$th,

$$
\underbrace{\frac{n-1}{n}\cdot\frac{n-2}{n-1}\cdots\frac{n-k+1}{n-k+2}}_{\text{first } k-1 \text{ guests miss his name}}\cdot\frac{1}{n-k+1} = \frac{n-k+1}{n}\cdot\frac{1}{n-k+1} = \frac{1}{n}
$$

So **every position gives $$\frac{1}{n}$$**. And each position itself happens with probability $$\frac{1}{n}$$, so adding up over all $$n$$ positions,

$$
P(\text{he picks his own name}) = \sum_{k=1}^{n} \frac{1}{n}\cdot\frac{1}{n} = n\cdot\frac{1}{n^2} = \frac{1}{n}
$$

Weird, but interesting! No matter where he sits in the drawing order, his own name ends up in his hand with probability exactly $$\frac{1}{n}$$. (In hindsight this is symmetry at work: his slip is equally likely to end up in any of the $$n$$ hands, and one of those is his.)

### Step 3: The recurrence

One subtle point before we write it down. In case 2, does joining a group really leave the other $$n-1$$ people's groups "untouched on average"? Yes: if he pulled out someone else's name, just splice him out of his chain (whoever drew *his* name now points to whoever *he* drew). That gives a valid drawing for the other $$n-1$$ guests with exactly the same number of groups, and every such drawing comes up equally often. So in both cases, the other $$n-1$$ guests contribute $$E_{n-1}$$ groups on average.

Conditioning on whether he picks his own name,

$$
E_n = \underbrace{\frac{1}{n}\left(1 + E_{n-1}\right)}_{\text{new group of his own}} + \underbrace{\frac{n-1}{n}\,E_{n-1}}_{\text{joins an existing group}}
$$

$$
E_n = \frac{1}{n} + \frac{1}{n}E_{n-1} + \frac{n-1}{n}E_{n-1} = \frac{1}{n} + E_{n-1}
$$

Each new guest adds exactly $$\frac{1}{n}$$ groups on average. Clean!

### Step 4: Base case and unrolling

Base case? Of course: with $$n = 1$$ there's one guest, who pulls out his own name, so $$E_1 = 1$$ (only 1 group possible lol).

Quick sanity check at $$n = 2$$: either both guests draw their own names ($$2$$ groups) or they swap ($$1$$ group), each with probability $$\frac12$$, so $$E_2 = 1.5$$. The recurrence agrees: $$E_2 = \frac12 + E_1 = 1.5$$. ✓

Unrolling all the way up,

$$
E_{50} = 1 + \frac{1}{2} + \frac{1}{3} + \frac{1}{4} + \cdots + \frac{1}{50} = \sum_{k=1}^{50} \frac{1}{k}
$$

the $$50$$th harmonic number. It has no neat closed form, so we let a computer add it up:

$$
E_{50} = \sum_{k=1}^{50}\frac{1}{k} \approx 4.4992
$$

(As a rough check, $$H_n \approx \ln n + 0.5772$$, and $$\ln 50 + 0.5772 \approx 4.49$$.) Rounded to the nearest tenth, that's $$4.5$$.

### Thus, there will be about $$4.5$$ groups on average
