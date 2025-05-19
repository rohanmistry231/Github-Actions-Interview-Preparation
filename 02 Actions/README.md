# ⚙️ Actions

This section dives into GitHub Actions' **Actions**—reusable units of code that perform specific tasks within workflows. You'll learn how to use marketplace actions, create custom actions, handle inputs and outputs, and build composite actions. Below are detailed examples for each sub-topic to help you understand and apply these concepts.

## 🏗️ Sub-Topics

### 1. Using Marketplace Actions
Marketplace actions are pre-built, community-contributed actions available in the GitHub Marketplace. This example uses `actions/checkout` to clone the repository and `actions/setup-node` to set up Node.js.

```yaml
# marketplace-action.yml
# Main Learning Points: Using Marketplace Actions
# Marketplace actions are reusable units of code shared by the community.
# Example: Using actions/checkout to clone the repository.

name: Marketplace Action Demo

on:
  push:
    branches: [ main ]

jobs:
  use-marketplace-action:
    runs-on: ubuntu-latest
    steps:
      # Using a marketplace action to checkout the repository
      - name: Checkout code
        uses: actions/checkout@v3

      # Verify the checkout by listing files
      - name: List files
        run: ls -la

      # Using another marketplace action: actions/setup-node to set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # Verify Node.js setup
      - name: Check Node.js version
        run: node --version
```

### 2. Creating Custom Actions
Custom actions allow you to encapsulate your own reusable logic. This example creates a Docker-based action that prints a greeting message. It includes three files: `action.yml`, `Dockerfile`, and `entrypoint.sh`.

#### action.yml
```yaml
# .github/actions/custom-greeting/action.yml
# Main Learning Points: Creating Custom Actions
# Custom actions allow you to encapsulate reusable logic.
# This is a Docker-based action that prints a greeting.

name: 'Custom Greeting Action'
description: 'A simple action to print a greeting message'
runs:
  using: 'docker'
  image: 'Dockerfile'
  args:
    - 'Hello, GitHub Actions!'
```

#### Dockerfile
```dockerfile
# .github/actions/custom-greeting/Dockerfile
# Main Learning Points: Creating Custom Actions (Dockerfile)
# This Dockerfile defines the container for the custom action.

FROM alpine:latest

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make the script executable
RUN chmod +x /entrypoint.sh

# Define the entrypoint
ENTRYPOINT ["/entrypoint.sh"]
```

#### entrypoint.sh
```bash
#!/bin/sh

# Main Learning Points: Creating Custom Actions (Entrypoint Script)
# This script runs inside the Docker container and prints the greeting.

# The argument passed to the Docker container
GREETING="$1"

echo "$GREETING"
```

### 3. Action Inputs and Outputs
Actions can accept inputs and produce outputs, making them dynamic and reusable. This example creates a JavaScript-based action that takes a name as input and outputs a greeting, then uses it in a workflow.

#### action.yml
```yaml
# .github/actions/greeting-io/action.yml
# Main Learning Points: Action Inputs and Outputs
# Actions can accept inputs and produce outputs for use in workflows.

name: 'Greeting with Inputs and Outputs'
description: 'An action that takes a name as input and outputs a greeting'
inputs:
  name:
    description: 'The name to greet'
    required: true
    default: 'User'
outputs:
  greeting:
    description: 'The generated greeting message'
runs:
  using: 'node16'
  main: 'main.js'
```

#### main.js
```javascript
const core = require('@actions/core');

try {
    // Get the input
    const name = core.getInput('name');
    
    // Generate the greeting
    const greeting = `Hello, ${name}!`;
    
    // Set the output
    core.setOutput('greeting', greeting);
    
    console.log(greeting);
} catch (error) {
    core.setFailed(error.message);
}
```

#### use-io-action.yml
```yaml
# use-io-action.yml
# Main Learning Points: Using an Action with Inputs and Outputs
# This workflow uses the custom action defined above.

name: Inputs and Outputs Demo

on:
  push:
    branches: [ main ]

jobs:
  use-io-action:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Use custom action with inputs and outputs
        id: greet
        uses: ./.github/actions/greeting-io
        with:
          name: 'Alice'

      - name: Print the output
        run: echo "Greeting from action: ${{ steps.greet.outputs.greeting }}"
```

### 4. Composite Actions
Composite actions combine multiple steps into a single action, simplifying workflows. This example creates a composite action that checks out code and prints a greeting, then uses it in a workflow.

#### action.yml
```yaml
# .github/actions/composite-greeting/action.yml
# Main Learning Points: Composite Actions
# Composite actions combine multiple steps into a single reusable action.

name: 'Composite Greeting Action'
description: 'A composite action that checks out code and prints a greeting'
runs:
  using: 'composite'
  steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Print greeting
      run: echo "Hello from composite action!"
      shell: bash
```

#### use-composite-action.yml
```yaml
# use-composite-action.yml
# Main Learning Points: Using a Composite Action
# This workflow uses the composite action defined above.

name: Composite Action Demo

on:
  push:
    branches: [ main ]

jobs:
  use-composite-action:
    runs-on: ubuntu-latest
    steps:
      - name: Use composite action
        uses: ./.github/actions/composite-greeting

      - name: Verify files after checkout
        run: ls -la
```

## 🚀 Getting Started

To try these actions and workflows:
1. Create a GitHub repository.
2. Set up the directory structure as noted in each example (e.g., `.github/actions/` for custom actions, `.github/workflows/` for workflow files).
3. Add the files to your repository.
4. Push to the main branch to trigger the workflows.
5. Check the "Actions" tab in your GitHub repository to view the workflow runs and logs.

These examples provide a solid foundation for working with GitHub Actions. Move on to the next sections of the roadmap to explore CI/CD pipelines, advanced workflows, and more!