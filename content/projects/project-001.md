---
title: "rawML - ML Implements from scratch"
objective: "Developed a custom ML library implementing neural networks from scratch in Python and NumPy."
techStack:
  - Python
  - NumPy
  - Machine Learning
  - Neural Networks
github: "https://github.com/TheAlphaJas"
results: "Built a custom autograd engine (jTensor) with dynamic computational graph construction and gradient tracking, plus vectorized modular layers, loss functions, and optimizers (SGD, Adam), enabling training of multi-layer perceptrons without high-level framework dependencies."
keyIdeas:
  - "Implemented neural networks from scratch without using high-level frameworks"
  - "Created custom tensor class (jTensor) with automatic gradient tracking"
  - "Built sequential model structure for easy layer composition"
  - "Implemented vectorized modular layers, loss functions, and optimizers (SGD, Adam)"
  - "Trained multi-layer perceptrons without high-level framework dependencies"
tags:
  - ML
  - Python
  - Education
  - Deep Learning
date: "2024-10-01"
---

## Overview

rawML is a custom machine learning library that implements neural networks from scratch using only Python and NumPy. The goal was to gain deep understanding of the fundamental mechanics of neural networks by building everything from the ground up.

## Key Components

### jTensor
A custom tensor class that tracks gradients automatically, enabling backpropagation without relying on external frameworks like PyTorch or TensorFlow.

### Sequential Model
A flexible sequential model structure that allows easy composition of layers, similar to Keras but implemented from scratch.

### Optimization
Implemented SGD and Adam, alongside vectorized modular layers and loss functions, enough to train multi-layer perceptrons end to end.

## Learning Outcomes

This project provided deep insights into:
- How automatic differentiation works
- The mechanics of backpropagation
- The internals of modern deep learning frameworks
