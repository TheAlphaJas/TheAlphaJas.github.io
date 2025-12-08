---
title: "LSTMSE-Net: Audio-Visual Speech Enhancement"
objective: "Developed LSTMSE-Net, an audio-visual speech enhancement model to isolate and enhance speaker audio in noisy environments using temporal feature extraction with RNN and LSTM units."
techStack:
  - Python
  - PyTorch
  - Deep Learning
  - LSTM
  - RNN
  - Audio Processing
  - Video Processing
github: "https://github.com/TheAlphaJas"
paper: "https://www.isca-archive.org/interspeech_2024/jain24_interspeech.html"
results: "Achieved a 3× reduction in inference time compared to the baseline model with improvements in speech quality. Paper accepted at InterspeechW 2024."
keyIdeas:
  - "Engineered a temporal feature extraction pipeline using RNN and LSTM units to jointly model audio-visual dependencies"
  - "Designed architecture to isolate and enhance speaker audio in noisy environments"
  - "Currently working on advanced version using ConvNeXtV2 based video pipeline and audio decoder inspired from deep state space modelling"
tags:
  - ML
  - Deep Learning
  - Audio Processing
  - Research
  - Publications
date: "2024-05-01"
---

## Overview

LSTMSE-Net is a novel audio-visual speech enhancement model developed to isolate and enhance speaker audio in noisy environments. The project focuses on leveraging both audio and visual cues to improve speech quality through deep learning techniques.

## Methodology

The model uses a temporal feature extraction pipeline that employs RNN and LSTM units to jointly model audio-visual dependencies. This approach allows the model to leverage visual information (lip movements, facial expressions) to better enhance the corresponding audio signal.

## Key Innovations

- **Temporal Modeling**: RNN and LSTM units capture temporal dependencies in both audio and video streams
- **Joint Audio-Visual Processing**: Simultaneous processing of audio and visual features for better enhancement
- **Efficient Architecture**: Achieved 3× reduction in inference time compared to baseline while improving quality

## Results

The model achieved significant improvements:
- 3× reduction in inference time compared to baseline
- Improved speech quality metrics
- Paper accepted at InterspeechW 2024

## Future Work

Currently developing an advanced version using:
- ConvNeXtV2-based video pipeline for better visual feature extraction
- Audio decoder inspired by deep state space modeling

