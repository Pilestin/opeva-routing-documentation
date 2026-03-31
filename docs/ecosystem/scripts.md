---
id: automation-scripts
title: OPEVA Automation Scripts
description: Collection of useful utility scripts.
sidebar_label: Scripts
tags: [scripts, tools, automation]
---

# Automation Scripts

**Owner:** DevOps Team | **Status:** Active | **Language:** Bash / Python

Collection of utility scripts for data generation, mock scenario creation, and CI/CD operations within OPEVA.

## Scripts Overview

### `generate-mock-vehicles.py`
Generates simulated electric vehicles and battery data points.

```bash
python generate-mock-vehicles.py --count 100 --out data.json
```

### `trigger-routing-job.sh`
Fires a cURL request to the Routing ML Engine to trigger optimization.

```bash
./trigger-routing-job.sh my-payload.json
```
