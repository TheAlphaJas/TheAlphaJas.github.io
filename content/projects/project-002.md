---
title: "Reinforcement Learning for Hangman Game"
objective: "Designed a Deep Q-Network (DQN)-based agent to play Hangman by predicting optimal letter choices, using RNNs for memory."
techStack:
  - Python
  - PyTorch
  - Reinforcement Learning
  - DQN
  - RNN
github: "https://github.com/TheAlphaJas"
results: "Achieved 85%+ win rate using techniques such as e-greedy strategy, target policy networks, and dynamic learning rate adjustments."
keyIdeas:
  - "Formulated Hangman as a reinforcement learning problem"
  - "Used Deep Q-Networks (DQN) for value function approximation"
  - "Implemented RNNs to maintain memory of previous letter choices"
  - "Applied e-greedy exploration strategy for balanced exploration-exploitation"
  - "Used target policy networks for stable training"
  - "Implemented dynamic learning rate adjustments"
tags:
  - RL
  - ML
  - Games
  - Deep Learning
date: "2024-08-01"
---

## Overview

This project applies reinforcement learning to the classic Hangman game, training an agent to make optimal letter choices to maximize its chances of winning.

## Problem Formulation

The Hangman game was formulated as a Markov Decision Process:
- **State**: Current word pattern, guessed letters, remaining attempts
- **Action**: Choosing the next letter to guess
- **Reward**: Positive for correct guesses, negative for incorrect guesses, large positive for winning

## Architecture

The agent uses a Deep Q-Network (DQN) architecture with:
- **RNN component**: Maintains memory of previous letter choices and their outcomes
- **Q-Network**: Estimates the value of each possible action (letter choice)
- **Target Network**: Provides stable targets for Q-learning updates

## Training Techniques

- **E-greedy strategy**: Balances exploration of new letter choices with exploitation of learned knowledge
- **Experience replay**: Stores and samples from past experiences for stable learning
- **Target policy networks**: Separate target network for stable Q-value estimation
- **Dynamic learning rate**: Adjusts learning rate during training for better convergence

## Results

The trained agent achieved an 85%+ win rate, demonstrating effective learning of letter frequency patterns and strategic guessing.
