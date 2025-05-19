# 🛠️ Advanced Workflows

This section explores advanced GitHub Actions workflows, focusing on techniques to optimize and scale automation. You'll learn how to use matrix builds, conditional steps, reusable workflows, caching, and scheduled workflows. Below are detailed examples for each sub-topic to help you understand and apply these concepts.

## 🏗️ Sub-Topics

### 1. Matrix Builds
Matrix builds allow running jobs across multiple configurations, such as different operating systems or language versions. This example tests a Node.js app across multiple OS and Node versions.

#### Supporting File
**package.json**
```json
{
    "name": "advanced-workflows-demo",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Running tests...\" && exit 0"
    },
    "dependencies": {
        "express": "^4.18.2"
    }
}
```

#### Workflow
```yaml
# matrix-builds.yml
# Main Learning Points: Matrix Builds
# Matrix builds allow running jobs across multiple configurations (e.g., different OS or versions).

name: Matrix Builds Demo

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [Ubuntu-latest, windows-latest]
        node-version: [16, 18, 20]
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

### 2. Conditional Steps (`if` Conditions)
Conditional steps use `if` conditions to control step execution based on criteria like branch names. This example runs different steps depending on the branch.

```yaml
# conditional-steps.yml
# Main Learning Points: Conditional Steps (if Conditions)
# Use 'if' conditions to control when steps run based on certain criteria.

name: Conditional Steps Demo

on:
  push:
    branches: [ main, develop ]

jobs:
  conditional:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Step for main branch only
        if: github.ref == 'refs/heads/main'
        run: echo "This step runs only on the main branch"

      - name: Step for develop branch only
        if: github.ref == 'refs/heads/develop'
        run: echo "This step runs only on the develop branch"

      - name: Always run this step
        run: echo "This step runs on all branches"
```

### 3. Reusable Workflows
Reusable workflows allow you to define a workflow once and call it from multiple workflows, reducing duplication. This example defines a reusable test workflow and calls it.

#### Reusable Workflow
```yaml
# test-workflow.yml
# Main Learning Points: Reusable Workflows (Definition)
# Reusable workflows allow you to define a workflow that can be called by other workflows.

name: Reusable Test Workflow

on:
  workflow_call:
    inputs:
      node-version:
        description: 'Node.js version to use'
        required: true
        type: string

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ inputs.node-version }}

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

#### Caller Workflow
```yaml
# call-reusable-workflow.yml
# Main Learning Points: Reusable Workflows (Caller)
# Call a reusable workflow to avoid duplicating logic.

name: Call Reusable Workflow Demo

on:
  push:
    branches: [ main ]

jobs:
  call-test:
    uses: ./.github/workflows/test-workflow.yml
    with:
      node-version: '18'
```

### 4. Caching Dependencies
Caching dependencies reduces build time by storing and reusing dependencies across workflow runs. This example caches Node.js dependencies.

```yaml
# cache-dependencies.yml
# Main Learning Points: Caching Dependencies
# Cache dependencies to reduce build time in workflows.

name: Cache Dependencies Demo

on:
  push:
    branches: [ main ]

jobs:
  cache:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Cache Node.js dependencies
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test
```

### 5. Scheduled Workflows
Scheduled workflows run at specific times using cron syntax. This example schedules a workflow to run daily at 10:00 PM IST (16:30 UTC), based on the current date and time (09:10 PM IST on May 18, 2025).

```yaml
# scheduled-workflow.yml
# Main Learning Points: Scheduled Workflows
# Schedule workflows to run at specific times using cron syntax.

name: Scheduled Workflow Demo

on:
  schedule:
    # Run daily at 10:00 PM IST (16:30 UTC)
    # Current time: 09:10 PM IST on May 18, 2025
    # IST is UTC+5:30, so 10:00 PM IST = 16:30 UTC
    - cron: '30 16 * * *'

jobs:
  scheduled:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run a scheduled task
        run: echo "This workflow ran on $(date)"
```

## 🚀 Getting Started

To try these workflows:
1. Create a GitHub repository.
2. Add the supporting file (`package.json`) to your repository as needed.
3. Create a `.github/workflows/` directory in your repository.
4. Add the `.yml` files above to the `.github/workflows/` directory.
5. Push to the main branch to trigger the workflows (except for the scheduled one, which runs daily).
6. Check the "Actions" tab in your GitHub repository to view the workflow runs and logs.

These examples provide advanced techniques for optimizing GitHub Actions workflows. Move on to the next sections of the roadmap to explore security, monitoring, and integrations!