# Project Overview

## Summary

This repository contains a Kanban board project inspired by Azure DevOps Boards and an embedded LLM-maintained wiki that explains how the project is designed, implemented, and evolved over time.

## Goals

- Build a usable board with editable columns and cards.
- Support drag-and-drop movement that reflects task status progression.
- Keep product, engineering, and execution knowledge in markdown rather than letting it disappear into chat history.

## Working Model

- The app code is the implementation artifact.
- The wiki is the persistent project memory.
- Raw sources feed the wiki.
- The wiki should be updated when implementation or understanding changes materially.

## Current Status

The repository has been initialized with a first frontend implementation plan and the first generation of wiki pages. The initial MVP targets local in-browser state before backend persistence.
