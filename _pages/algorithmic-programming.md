---
permalink: /algorithmic-programming/
title: "Algorithmic Programming"
toc: true
sidebar:
  nav: "stuff-i-do"
---

# Algorithmic Programming

This page showcases my work in algorithmic programming, competitive programming, and algorithm design.

## Projects

- **Project 1**: Description of your algorithmic programming project
- **Project 2**: Another project with its description

## Skills

- Competitive Programming
- Algorithm Design
- Data Structures
- Problem Solving
- Time and Space Complexity Analysis

## Blog Posts

Here I share my thoughts and experiences with algorithmic programming challenges.

{% for post in site.categories.algorithmic-programming %}
<div class="post-preview">
  <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
  <p>{{ post.excerpt }}</p>
  <a href="{{ post.url }}" class="btn btn--small btn--primary">Read More</a>
</div>
{% endfor %}
