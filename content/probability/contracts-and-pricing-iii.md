---
title: Contracts and Pricing III
topics:
  - Expectation
  - Exponential Distribution
  - Options Pricing
---

After being caught in an embarrassing high-profile data fabrication scandal, Calambya University decides to stop sharing data with the national college ranking organization, effective in 2023. Rival school Mahogany University is overjoyed and offers each student a tuition refund worth $$ X $$ thousand dollars, where $$ X = \text{Calambya's 2023 Ranking} - \text{Mahogany's 2023 Ranking} $$.

One Mahogany student, Justin, offers to sell the following contract to his friend Kevin for $$ 0.70 $$ thousand dollars, before $$ X $$ is known: Justin will give Kevin the right but not the obligation to purchase Justin's tuition refund for only $$ 0.5 $$ thousand dollars.

Suppose $$ X \sim \text{Exp}(\beta) $$, where $$ \beta $$ is the scale. Compute $$ \beta $$ to the nearest tenth under the assumption that the contract is priced fairly.

---

**Original Problem Link:** [https://www.quantguide.io/questions/contracts-and-pricing-iii](https://www.quantguide.io/questions/contracts-and-pricing-iii)

<!-- SOLUTION_SEPARATOR -->

### Step 1: What is this contract, really?

Kevin is buying the right, but not the obligation, to buy Justin's refund of $$ X $$ thousand dollars for a strike of $$ 0.5 $$ thousand dollars. That's exactly a **call option** on $$ X $$ with strike $$ K = 0.5 $$.

He only exercises it when $$ X > 0.5 $$, in which case he pockets $$ X - 0.5 $$ risk-free (buy the refund for $$ 0.5 $$, and it's worth $$ X $$). If $$ X \le 0.5 $$, he just walks away.

So the payoff at expiry is

$$
\text{Payoff}(X) = \max(X - 0.5,\ 0)
$$

and Kevin pays $$ 0.70 $$ upfront, before $$ X $$ is known, to hold this.

### Step 2: "Fair pricing" — two equivalent checkpoints

There are two natural moments to reason about fairness from.

**Step 0 — the instant Kevin signs the contract.** Fair pricing should mean his *net* expected profit (payoff minus what he paid) is exactly $$ 0 $$. If it weren't, one side would have a built-in edge, and the price wouldn't really be fair to both parties.

**Step 1 — right after signing, ignoring the sunk premium.** He's already paid $$ 0.70 $$. So "fair" here just means his *expected payoff* going forward should equal the $$ 0.70 $$ he handed over.

These sound like different conditions. They aren't — let's write both out and check.

**View A (net profit, from Step 0):**

$$
R_1(X) =
\begin{cases}
-0.7 & X \le 0.5 \\
(X - 0.5) - 0.7 = X - 1.2 & X > 0.5
\end{cases}
$$

Fair pricing $$ \implies E[R_1(X)] = 0 $$.

**View B (raw payoff, from Step 1):**

$$
R_2(X) =
\begin{cases}
0 & X < 0.5 \\
X - 0.5 & X \ge 0.5
\end{cases}
$$

Fair pricing $$ \implies E[R_2(X)] = 0.7 $$, since his expected take should just match what he already paid.

### Step 3: These are the same equation

Notice that

$$
R_1(X) = R_2(X) - 0.7 \quad \text{for every } X.
$$

(Check both pieces: for $$ X \le 0.5 $$, that's $$ 0 - 0.7 = -0.7 $$ ✓. For $$ X > 0.5 $$, that's $$ (X-0.5) - 0.7 = X - 1.2 $$ ✓.)

So

$$
E[R_1(X)] = E[R_2(X)] - 0.7
$$

Setting $$ E[R_1(X)] = 0 $$ immediately gives $$ E[R_2(X)] = 0.7 $$ — View B's condition, exactly. Same equation, just shifted by the premium.

So we can just work with the cleaner one:

$$
E[\max(X - 0.5,\ 0)] = 0.7
$$

### Step 4: Using memorylessness of the exponential

We're told $$ X \sim \text{Exp}(\beta) $$ with $$ \beta $$ as the scale, so $$ E[X] = \beta $$.

The exponential is memoryless: conditional on $$ X > 0.5 $$, the excess $$ X - 0.5 $$ is again distributed $$ \text{Exp}(\beta) $$. So

$$
E[\max(X-0.5,\ 0)] = P(X > 0.5) \cdot E[X - 0.5 \mid X > 0.5] = e^{-0.5/\beta} \cdot \beta
$$

Our fairness condition becomes

$$
\boxed{\beta \, e^{-0.5/\beta} = 0.7}
$$

### Step 5: Solve numerically

This is transcendental in $$ \beta $$, so plot $$ y = \beta e^{-0.5/\beta} $$ against $$ y = 0.7 $$ on [Desmos](https://www.desmos.com/calculator) and read off where they cross:

$$
\beta \approx 1.10
$$

Sanity check: $$ 1.10 \times e^{-0.5/1.10} = 1.10 \times e^{-0.4545} \approx 1.10 \times 0.6348 \approx 0.698 \approx 0.70 $$ ✓.

### Thus, the fair scale is $$\beta \approx 1.1$$
