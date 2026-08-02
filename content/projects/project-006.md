---
title: "Causal Inference in Reinforcement Learning"
objective: "Causal variants of REINFORCE, PPO, and A2C that use action-independent baselines to cut variance in policy gradient estimation."
techStack:
  - Python
  - PyTorch
  - Reinforcement Learning
  - Causal Inference
  - MuJoCo
results: "Improved sample efficiency and training stability under causal interventions and distribution shift, with theoretical regret guarantees."
keyIdeas:
  - "Introduced causal-aware, action-independent baselines for variance reduction in policy gradients"
  - "Derived regret guarantees for the resulting estimators"
  - "Validated on custom Structural Causal Models and continuous-control MuJoCo benchmarks"
  - "Studied behaviour under interventions and distribution shift rather than only on-policy returns"
tags:
  - RL
  - Causal Inference
  - Research
  - Deep Learning
date: "2025-12-01"
---

## Overview

My B.Tech thesis, supervised by Prof. Dibbendu Roy at IIT Indore. The starting point is a familiar problem in policy gradient methods: the gradient estimator is unbiased but noisy, and the usual fix is to subtract a baseline.

## Approach

Standard baselines are learned value functions. Here the baseline is built from the causal structure of the environment instead, using variables that influence the return but are independent of the chosen action. This keeps the estimator unbiased while removing variance that a purely observational baseline cannot see.

The same construction was applied to REINFORCE, PPO, and A2C, giving causal variants of each.

## Evaluation

Two settings were used: custom Structural Causal Models where the ground-truth causal graph is known, and continuous-control MuJoCo benchmarks. Beyond standard returns, the methods were evaluated under interventions and distribution shift — the regime where a causally-grounded baseline should help most, and where it does.
