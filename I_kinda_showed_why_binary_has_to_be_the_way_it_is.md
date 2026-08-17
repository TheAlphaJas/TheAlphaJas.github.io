# I kinda showed why binary has to be the way it is.. in a way

So I figured out this really cool way which shows how and why binary numbers work. And more interestingly, why they are **necessary**.

Obviously, we all know binary uses

\[
1,2,4,8,16,\ldots
\]

as its place values. Usually, this is just presented as *the way binary works*. But I started wondering: **why these numbers?** Could we have chosen some other sequence?

Turns out, if we put a few natural constraints on the problem, we don't really have a choice.

## Let's forget binary exists

Suppose I want to construct a number system where I have some set of basis values

\[
a_1,a_2,\ldots,a_n
\]

and for every basis value I can choose a coefficient of either \(0\) or \(1\).

So every number I represent looks like

\[
c_1a_1+c_2a_2+\cdots+c_na_n,
\]

where every \(c_i\in\{0,1\}\).

In other words, I am allowed to take or not take each basis value.

What do I want from this system?

### 1. I want to represent every number

If the sum of all my basis values is \(S\), then the largest thing I can possibly make is \(S\).

So I want my system to be able to make **every integer from \(0\) to \(S\)**.

No gaps.

If I can make \(1,2,3,5\) but not \(4\), that's not a very useful representation system.

### 2. I want the representation to be unique

I don't just want to be able to make every number. I want each number to have exactly one representation.

Otherwise, the same number could have multiple different combinations of basis values, which rather defeats the point of having a clean positional representation.

### 3. I want the system to be scalable

This one is slightly more subtle.

Suppose I have a valid system with \(n\) basis values. If I remove the last few values, I still want the remaining prefix to be a valid system in itself.

So if

\[
a_1,\ldots,a_n
\]

is valid, then

\[
a_1,\ldots,a_k
\]

should also be valid for every \(k<n\).

This means that I don't want some weird system that only works at certain specially chosen lengths. I want to be able to keep extending the system forever while preserving the same rules.

Now let's see what these constraints actually force.

---

## What can the next number possibly be?

Suppose I already have a valid system

\[
a_1,a_2,\ldots,a_n
\]

and these values can represent every integer from

\[
0,1,\ldots,S_n
\]

where

\[
S_n=a_1+a_2+\cdots+a_n.
\]

Now I want to add one more basis value, \(a_{n+1}\).

What can \(a_{n+1}\) possibly be?

Let's enumerate what the new system can make.

First, without using \(a_{n+1}\), I can already make

\[
0,1,2,\ldots,S_n.
\]

That's guaranteed by our assumption.

Now let's use \(a_{n+1}\).

Every number I could previously make can now be added to \(a_{n+1}\), so I can make

\[
a_{n+1},\,
a_{n+1}+1,\,
a_{n+1}+2,\,
\ldots,\,
a_{n+1}+S_n.
\]

So the set of numbers I can make is really just two intervals:

\[
[0,S_n]
\]

and

\[
[a_{n+1},a_{n+1}+S_n].
\]

And now the whole thing becomes obvious.

These two intervals have to join together **without either a gap or an overlap**.

If

\[
a_{n+1}>S_n+1,
\]

then \(S_n+1\) cannot be represented. There is a gap.

For example, if I can make everything up to \(10\), and my next basis value is \(12\), then \(11\) is impossible.

So we need

\[
a_{n+1}\leq S_n+1.
\]

But uniqueness gives us the other side.

If

\[
a_{n+1}\leq S_n,
\]

then \(a_{n+1}\) itself was already representable using the old basis values. Now I have at least two representations of it:

- using the old values;
- using \(a_{n+1}\) itself.

That's forbidden.

So we need

\[
a_{n+1}>S_n.
\]

Put the two constraints together:

\[
S_n<a_{n+1}\leq S_n+1.
\]

There is exactly one integer satisfying this.

\[
\boxed{a_{n+1}=S_n+1}
\]

And that's it.

There is **no choice**.

---

## And now watch what happens

We need \(1\) to be representable, so the smallest possible starting basis value is

\[
a_1=1.
\]

The sum so far is \(1\), so the next value has to be

\[
a_2=S_1+1=2.
\]

Now the sum is

\[
1+2=3,
\]

so the next value has to be

\[
a_3=3+1=4.
\]

The sum is now

\[
1+2+4=7,
\]

so

\[
a_4=7+1=8.
\]

And so on:

\[
1
\rightarrow 2
\rightarrow 4
\rightarrow 8
\rightarrow 16
\rightarrow\cdots
\]

We have just been forced into

\[
\boxed{1,2,4,8,16,\ldots}
\]

which is exactly the binary place-value sequence.

In fact, if

\[
S_n=1+2+4+\cdots+2^{n-1}=2^n-1,
\]

then

\[
a_{n+1}=S_n+1=2^n.
\]

So the next value is always exactly twice the previous one.

---

## So why binary?

The way I now think about it is that binary isn't really an arbitrary convention.

If you decide that:

- every basis value can be used either \(0\) or \(1\) times,
- every integer in the possible range must be representable,
- every representation must be unique, and
- the construction must remain valid as you keep extending it,

then the basis values are **forced** to be powers of two.

The reason is basically just:

> **Don't leave gaps. Don't create duplicates.**

If your current system covers everything up to \(S\), the next value has exactly one place it can go:

\[
\boxed{S+1}.
\]

And repeatedly applying that rule creates binary.

Pretty neat that something which feels like a definition is actually, under these constraints, a necessity.

And, amusingly, this whole rabbit hole started while I was solving the CSES **Missing Coin Sum** problem. XD
