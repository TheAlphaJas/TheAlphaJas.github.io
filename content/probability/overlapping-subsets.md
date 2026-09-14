---
title: Overlapping Subsets
topics:
  - Binomial Distribution
  - Generating Functions
  - Variance
---

Consider the set $$\Omega = \{1, 2, \dots, 20\}$$. Two subsets $$A$$ and $$B$$ of $$\Omega$$ are uniformly at random selected from the power set of $$\Omega$$, independently. It is possible that $$A = B$$. Define $$N = |A \cap B|$$. Compute $$\dfrac{\text{Var}(N)}{E[N]}$$.

---

**Original Problem Link:** [https://www.quantguide.io/questions/overlapping-subsets](https://www.quantguide.io/questions/overlapping-subsets)

<!-- SOLUTION_SEPARATOR -->

### Step 1: Set up the distribution of $$N$$

We first need $$P(N = k)$$ — the probability that $$A$$ and $$B$$ overlap in exactly $$k$$ elements.

To build such a pair $$(A, B)$$: choose which $$k$$ of the $$20$$ elements are the common ones — that's $$\binom{20}{k}$$ ways. For the remaining $$20 - k$$ elements, none of them may end up in *both* sets (otherwise the overlap would exceed $$k$$), so we need to count: in how many ways can the leftover elements be split between $$A$$ and $$B$$ so that no leftover element lands in both?

### Step 2: A subproblem — mutually exclusive subsets

Define $$N(n) = $$ the number of ways to choose two subsets of an $$n$$-element set that share **no** elements (i.e. two mutually exclusive subsets, either of which may be empty). Two different lines of reasoning both nail this down.

**First way — sum over the size of the first subset.** Suppose the first subset takes $$j$$ of the $$n$$ elements ($$j$$ can range from $$0$$ to $$n$$); there are $$\binom{n}{j}$$ ways to pick which. The second subset must then live entirely inside the remaining $$n - j$$ elements, and can be *any* subset of those — $$2^{n-j}$$ choices. So

$$
N(n) = \sum_{j=0}^{n} \binom{n}{j}\, 2^{\,n-j}
$$

Recognize this as the binomial theorem $$(x+y)^n = \sum_j \binom{n}{j} x^{n-j}y^j$$ with $$x = 2$$, $$y = 1$$:

$$
N(n) = \sum_{j=0}^n \binom{n}{j}\, 2^{n-j}\, 1^{j} = (2+1)^n = 3^n
$$

**Second way — go element by element.** Instead of thinking in terms of subset sizes, just decide the fate of each of the $$n$$ elements independently: it can go into the first subset, into the second subset, or into neither (a subset doesn't need to contain every element). That's $$3$$ choices per element, and $$n$$ independent elements, so directly

$$
N(n) = 3^n
$$

Both routes agree — reassuringly, since they're counting the exact same thing.

### Step 3: The distribution of $$N$$

Plugging $$n = 20 - k$$ (the leftover elements) into Step 2, and combining with the $$\binom{20}{k}$$ choice of which elements are shared from Step 1:

$$
\text{Numerator (favorable pairs with exactly } k \text{ common elements)} = \binom{20}{k}\, 3^{20-k}
$$

The denominator is the total number of ways to pick $$(A, B)$$ with no restriction — each of $$A$$, $$B$$ independently has $$2^{20}$$ possible values, so $$2^{20}\cdot 2^{20} = 4^{20}$$ total pairs. Hence

$$
P(N = k) = \frac{\binom{20}{k}\, 3^{20-k}}{4^{20}}
$$

**Sanity check.** These probabilities should sum to $$1$$ over $$k = 0, \dots, 20$$. By the binomial theorem again,

$$
\sum_{k=0}^{20} \binom{20}{k}\, 3^{20-k} = (3+1)^{20} = 4^{20}
$$

so $$\sum_k P(N=k) = 4^{20}/4^{20} = 1$$. ✓

### Step 4: Computing $$E[N]$$ via differentiation

Rather than quote a known formula, we can get $$E[N]$$ directly from the generating function that produced Step 3. Introduce a dummy variable $$r$$ and write

$$
f(r) = \sum_{k=0}^{20} \binom{20}{k}\, 3^{20-k}\, r^k = (3 + r)^{20}
$$

(this is just the binomial theorem with $$x=3$$, $$y=r$$; setting $$r=1$$ recovers the numerator sum from Step 3). Differentiating with respect to $$r$$ pulls down a factor of $$k$$ from each term:

$$
f'(r) = \sum_{k=0}^{20} k\binom{20}{k}\, 3^{20-k}\, r^{k-1} = 20(3+r)^{19}
$$

Multiplying through by $$r$$ and setting $$r = 1$$:

$$
\sum_{k=0}^{20} k\binom{20}{k}\, 3^{20-k} = 20\cdot 1\cdot(3+1)^{19} = 20\cdot 4^{19}
$$

so

$$
E[N] = \frac{20\cdot 4^{19}}{4^{20}} = \frac{20}{4} = 5
$$

### Step 5: Computing $$E[N^2]$$ the same way

Differentiate once more. Starting again from $$f(r) = (3+r)^{20}$$ and its first derivative $$f'(r) = 20(3+r)^{19}$$, differentiate a second time:

$$
f''(r) = \sum_{k=0}^{20} k(k-1)\binom{20}{k}\, 3^{20-k}\, r^{k-2} = 20\cdot 19\,(3+r)^{18}
$$

Multiplying by $$r^2$$ and setting $$r=1$$:

$$
\sum_{k=0}^{20} k(k-1)\binom{20}{k}\, 3^{20-k} = 380\cdot 4^{18}
$$

which gives $$E[N(N-1)] = \dfrac{380\cdot 4^{18}}{4^{20}} = \dfrac{380}{16} = \dfrac{95}{4}$$, and so

$$
E[N^2] = E[N(N-1)] + E[N] = \frac{95}{4} + 5 = \frac{95}{4} + \frac{20}{4} = \frac{115}{4}
$$

### Step 6: Variance and the final ratio

$$
\text{Var}(N) = E[N^2] - \big(E[N]\big)^2 = \frac{115}{4} - 25 = \frac{115}{4} - \frac{100}{4} = \frac{15}{4}
$$

$$
\boxed{\frac{\text{Var}(N)}{E[N]} = \frac{15/4}{5} = \frac{15}{20} = \frac{3}{4}}
$$

**Alternate Way of Thinking?.** Choosing a subset of $$\Omega$$ uniformly from its power set is the same as flipping a fair coin independently for each of the $$20$$ elements, to decide membership. So for element $$i$$, define the indicator

$$
X_i = \mathbb{1}[i \in A \cap B] = \begin{cases} 1 & i \in A \text{ and } i \in B \\ 0 & \text{otherwise} \end{cases}
$$

$$i \in A$$ and $$i \in B$$ are themselves independent fair coin flips, so

$$
P(X_i = 1) = P(i \in A)\cdot P(i \in B) = \frac12\cdot\frac12 = \frac14 \quad \Longrightarrow \quad X_i \sim \text{Bernoulli}\!\left(\tfrac14\right)
$$

and since membership is decided independently *across* elements too, $$X_1, \dots, X_{20}$$ are i.i.d. Bernoulli$$(\tfrac14)$$. Now $$N = |A \cap B| = \sum_{i=1}^{20} X_i$$ is literally a sum of $$20$$ i.i.d. Bernoulli$$(\tfrac14)$$ trials — which is exactly the definition of $$N \sim \text{Binomial}(20, \tfrac14)$$, with no need to have derived the $$\binom{20}{k}3^{20-k}/4^{20}$$ formula at all.

From here $$E[N]$$ and $$\text{Var}(N)$$ follow from the single-trial moments, without touching a binomial coefficient. For a single Bernoulli$$(p)$$ trial, $$E[X_i] = p$$ and $$\text{Var}(X_i) = E[X_i^2] - E[X_i]^2 = p - p^2 = p(1-p)$$ (using $$X_i^2 = X_i$$, since $$X_i \in \{0,1\}$$). Linearity of expectation, and additivity of variance across *independent* summands, then give

$$
E[N] = \sum_{i=1}^{20} E[X_i] = 20p, \qquad \text{Var}(N) = \sum_{i=1}^{20} \text{Var}(X_i) = 20\,p(1-p)
$$

so the ratio collapses immediately, with the $$20$$ (and even $$p$$ itself, partially) cancelling out:

$$
\frac{\text{Var}(N)}{E[N]} = \frac{20\,p(1-p)}{20\,p} = 1 - p
$$

With $$p = \tfrac14$$, that's $$1 - \tfrac14 = \tfrac34$$ — matching Step 6 exactly, but now visibly true for *any* ground set size (not just $$20$$), since $$n$$ never even appears in the final ratio. The long derivation above (via $$P(N=k)$$ and differentiating generating functions) rebuilds all of this from first principles; recognizing the Bernoulli/Binomial structure up front just lets you skip straight to the answer.

### Thus, $$\dfrac{\text{Var}(N)}{E[N]} = \dfrac{3}{4}$$
