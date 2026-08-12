---
title: Multinomial Sum
topics:
  - Combinatorics
---

Find the sum of all multinomial coefficients:

$$
\binom{7}{b_1, b_2, b_3, b_4}
$$

where $$b_1 + b_2 + b_3 + b_4 = 7$$ and each $$b_i \geq 0$$ is an integer.

**Original Problem Link**: [Click here](https://www.quantguide.io/questions/multinomial-sum)

<!-- SOLUTION_SEPARATOR -->

### Step 1: Understanding the Multinomial Coefficients  

Each multinomial coefficient 

$$
\binom{7}{b_1, b_2, b_3, b_4}
$$

represents the number of ways to assign the exponents $$b_1, b_2, b_3,$$ and $$b_4$$ in the expansion of:

$$
(x_1 + x_2 + x_3 + x_4)^7.
$$

Thus, the sum of all such coefficients is simply the sum of all terms in this multinomial expansion when each $$x_i = 1$$.

### Step 2: Reduced Version - The Core Idea  

We recognize that the given sum is:

$$
\sum_{b_1 + b_2 + b_3 + b_4 = 7} \binom{7}{b_1, b_2, b_3, b_4}.
$$

Setting $$x_1 = x_2 = x_3 = x_4 = 1$$, the expansion simplifies to:

$$
(1 + 1 + 1 + 1)^7 = 4^7.
$$

which directly gives us the sum.

### Step 3: Compute the Final Value  

$$
4^7 = 16384.
$$


### Thus, the sum of all multinomial coefficients is $$16384$$