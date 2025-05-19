# 🔄 Continuous Integration (CI)

This section covers the essentials of Continuous Integration (CI) using GitHub Actions. CI automates the process of building, testing, and validating code changes to ensure quality and reliability. Below, you'll find detailed examples for each sub-topic to help you understand and apply these concepts.

## 🏗️ Sub-Topics

### 1. Setting Up a CI Pipeline
A CI pipeline automates the process of building and testing code changes. This example sets up a basic pipeline for a Node.js app, including dependency installation and testing.

```yaml
# ci-pipeline.yml
# Main Learning Points: Setting Up a CI Pipeline
# A CI pipeline automates building, testing, and validating code changes.

name: Basic CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      # Checkout the repository
      - name: Checkout code
        uses: actions/checkout@v3

      # Set up Node.js environment
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # Install dependencies
      - name: Install dependencies
        run: npm install

      # Run tests (assuming Jest for this example)
      - name: Run tests
        run: npm test
```

### 2. Running Tests (Jest, PyTest, etc.)
Testing ensures code functionality. This example demonstrates running tests for both a Node.js app (using Jest) and a Python app (using PyTest) in a single workflow.

#### Supporting Files
**app.js**
```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };
```

**app.test.js**
```javascript
const { add, subtract } = require('./app.js');

describe('Math Functions', () => {
    test('should add two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
    });

    test('should subtract two numbers correctly', () => {
        expect(subtract(5, 3)).toBe(2);
    });
});
```

**requirements.txt**
```
pytest==7.4.0
```

#### Workflow
```yaml
# run-tests.yml
# Main Learning Points: Running Tests (Jest, PyTest, etc.)
# Automate testing for different languages in a CI pipeline.

name: Run Tests Demo

on:
  push:
    branches: [ main ]

jobs:
  test-node:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install jest --save-dev

      - name: Run Jest tests
        run: npx jest app.test.js

  test-python:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run PyTest
        run: pytest --version  # Placeholder; replace with actual test command if Python tests are added
```

### 3. Linting and Code Quality Checks
Linting ensures code quality and consistency. This example uses ESLint to lint a Node.js app.

```yaml
# linting.yml
# Main Learning Points: Linting and Code Quality Checks
# Linting ensures code quality and consistency.

name: Linting Demo

on:
  push:
    branches: [ main ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install eslint --save-dev

      - name: Run ESLint
        run: npx eslint app.js
```

### 4. Build Artifacts
Artifacts are files generated during a workflow, such as build outputs, that can be stored and shared. This example builds a Node.js app and uploads the build directory as an artifact.

```yaml
# build-artifacts.yml
# Main Learning Points: Build Artifacts
# Artifacts are files generated during a workflow (e.g., build outputs).

name: Build Artifacts Demo

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Create a build directory
        run: |
          mkdir build
          cp app.js build/
          echo "Build completed at $(date)" > build/build-info.txt

      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-artifact
          path: build/
```

## 🚀 Getting Started

To try these workflows:
1. Create a GitHub repository.
2. Add the supporting files (`app.js`, `app.test.js`, `requirements.txt`) to your repository as needed.
3. Create a `.github/workflows/` directory in your repository.
4. Add the `.yml` files above to the `.github/workflows/` directory.
5. Push to the main branch to trigger the workflows.
6. Check the "Actions" tab in your GitHub repository to view the workflow runs and logs.

These examples provide a strong foundation for implementing Continuous Integration with GitHub Actions. Move on to the next sections of the roadmap to explore Continuous Deployment, advanced workflows, and more!