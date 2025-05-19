# 🔒 Security and Permissions

This section focuses on securing GitHub Actions workflows by managing secrets, controlling permissions, restricting access, and ensuring secure dependency management. These practices help protect your CI/CD pipelines from vulnerabilities and unauthorized access. Below are detailed examples for each sub-topic to help you understand and apply these concepts.

## 🏗️ Sub-Topics

### 1. Managing Secrets
GitHub Secrets allow you to securely store sensitive data, such as API keys, and use them in workflows without exposing them in logs. This example demonstrates using a secret named `API_KEY`.

```yaml
# manage-secrets.yml
# Main Learning Points: Managing Secrets
# Use GitHub Secrets to securely store and access sensitive data like API keys.

name: Manage Secrets Demo

on:
  push:
    branches: [ main ]

jobs:
  secrets:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # Use a secret to authenticate an API call (simulated here with an echo)
      - name: Use API Key from secrets
        run: echo "Using API Key: $API_KEY"
        env:
          API_KEY: ${{ secrets.API_KEY }}

      # Example: Pass secret to a script (for demo purposes only, avoid exposing secrets in logs)
      - name: Run a script with secret
        run: echo "Simulating API call with key: $(echo $API_KEY | head -c 4)..."
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

### 2. GitHub Token Permissions
The `GITHUB_TOKEN` is automatically provided to workflows, but its permissions can be customized to follow the principle of least privilege. This example restricts the token to read-only access for repository contents.

```yaml
# token-permissions.yml
# Main Learning Points: GitHub Token Permissions
# Customize the permissions of the GITHUB_TOKEN to follow the principle of least privilege.

name: GitHub Token Permissions Demo

# Restrict the default GITHUB_TOKEN permissions
permissions:
  contents: read  # Only allow reading repository contents
  issues: none    # No access to issues
  pull-requests: none  # No access to pull requests

on:
  push:
    branches: [ main ]

jobs:
  token-permissions:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      # This step should succeed (read access is allowed)
      - name: Read repository contents
        run: ls -la

      # This step would fail if it tried to write (e.g., create an issue), but we'll simulate a safe operation
      - name: Simulate safe operation
        run: echo "GITHUB_TOKEN has limited permissions: ${{ toJSON(github.token) }}"
```

### 3. Restricting Workflow Access
Restrict who can trigger workflows or access specific jobs using GitHub Environments and branch protections. This example uses an environment named `production` to enforce restrictions.

```yaml
# restrict-access.yml
# Main Learning Points: Restricting Workflow Access
# Use GitHub Environments and branch protections to control who can trigger workflows.

name: Restrict Workflow Access Demo

on:
  push:
    branches: [ main ]

jobs:
  restricted:
    runs-on: ubuntu-latest
    # Use an environment to enforce restrictions
    environment: production
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run a restricted step
        run: echo "This step runs only after environment restrictions are met"
```

### 4. Secure Dependency Management
Securely manage dependencies by using trusted actions and auditing for vulnerabilities. This example uses `actions/setup-node` to install Node.js dependencies and runs `npm audit` to check for vulnerabilities.

#### Supporting File
**package.json**
```json
{
    "name": "security-demo",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {
        "express": "^4.18.2"
    }
}
```

#### Workflow
```yaml
# secure-dependencies.yml
# Main Learning Points: Secure Dependency Management
# Use trusted actions and tools to manage dependencies securely and check for vulnerabilities.

name: Secure Dependency Management Demo

on:
  push:
    branches: [ main ]

jobs:
  dependencies:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # Use a trusted action to set up Node.js and install dependencies
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          # Enable dependency caching for faster builds
          cache: 'npm'

      # Install dependencies securely
      - name: Install dependencies
        run: npm install

      # Audit dependencies for vulnerabilities
      - name: Audit dependencies
        run: npm audit --audit-level=high
```

## 🚀 Getting Started

To try these workflows:
1. Create a GitHub repository.
2. Add the supporting file (`package.json`) to your repository as needed.
3. Set up GitHub Secrets (e.g., `API_KEY`) in your repository settings (Settings > Secrets and variables > Actions).
4. Create an environment named `production` if needed (Settings > Environments) and configure restrictions.
5. Create a `.github/workflows/` directory in your repository.
6. Add the `.yml` files above to the `.github/workflows/` directory.
7. Push to the main branch to trigger the workflows.
8. Check the "Actions" tab in your GitHub repository to view the workflow runs and logs.

These examples provide essential security practices for GitHub Actions workflows. Move on to the next sections of the roadmap to explore monitoring, debugging, and integrations!