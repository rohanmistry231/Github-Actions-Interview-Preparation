# 📊 Monitoring and Debugging

This section covers techniques for monitoring and debugging GitHub Actions workflows. You'll learn how to generate detailed logs, debug workflows locally, send custom notifications, and collect run metrics. Below are detailed examples for each sub-topic to help you understand and apply these concepts.

## 🏗️ Sub-Topics

### 1. Workflow Logs
Detailed logs help you monitor and debug workflows by providing insights into each step's execution. This example generates logs for environment details, dependency installation, and test execution.

#### Supporting File
**package.json**
```json
{
    "name": "monitoring-debugging-demo",
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
# workflow-logs.yml
# Main Learning Points: Workflow Logs
# Use detailed logging to monitor and debug workflows.

name: Workflow Logs Demo

on:
  push:
    branches: [ main ]

jobs:
  logs:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Log environment details
        run: |
          echo "Runner OS: $RUNNER_OS"
          echo "Node Version: $(node --version)"
          echo "Current Directory: $(pwd)"

      - name: Install dependencies with logging
        run: npm install --verbose

      - name: Run tests with logging
        run: npm test
        continue-on-error: true

      - name: Log failure details (if any)
        if: failure()
        run: echo "Previous step failed. Check the logs above for details."
```

### 2. Debugging with `act` Locally
The `act` tool allows you to run GitHub Actions workflows locally, speeding up the debugging process. This example provides a simple workflow and instructions for running it with `act`.

```yaml
# debug-act.yml
# Main Learning Points: Debugging with `act` Locally
# Use `act` to run GitHub Actions workflows locally for faster debugging.

name: Debug with Act Demo

on:
  push:
    branches: [ main ]

jobs:
  debug:
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

      - name: Run tests
        run: npm test

# To debug this workflow locally using `act`:
# 1. Install `act` on your machine:
#    - Follow instructions at https://github.com/nektos/act
#    - Example for macOS/Linux: `curl https://raw.githubusercontent.com/nektos/act/master/install.sh | bash`
# 2. Ensure Docker is installed and running (act uses Docker to simulate runners)
# 3. Place this file in .github/workflows/debug-act.yml
# 4. From your repository's root directory, run:
#    `act push -j debug`
# 5. Review the output to debug the workflow locally
```

### 3. Custom Notifications (Slack, Email)
Custom notifications help you stay informed about workflow status by sending alerts to Slack or Email. This example sends notifications on failure to both Slack and Email.

```yaml
# custom-notifications.yml
# Main Learning Points: Custom Notifications (Slack, Email)
# Send notifications to Slack and Email to monitor workflow status.

name: Custom Notifications Demo

on:
  push:
    branches: [ main ]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Run a step that might fail
        run: npm install && npm test
        continue-on-error: true

      # Send a Slack notification
      - name: Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
          channel-id: 'workflow-notifications'
          text: 'Workflow failed! Check the run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}'

      # Send an Email notification
      - name: Notify via Email on failure
        if: failure()
        uses: dawidd6/action-send-mail@v3
        with:
          server_address: smtp.gmail.com
          server_port: 465
          username: ${{ secrets.EMAIL_USERNAME }}
          password: ${{ secrets.EMAIL_PASSWORD }}
          subject: 'Workflow Failure: ${{ github.workflow }}'
          body: 'The workflow failed. Check the run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}'
          to: ${{ secrets.EMAIL_RECIPIENT }}
          from: GitHub Actions <noreply@github.com>
```

### 4. Workflow Run Metrics
Collecting metrics, such as workflow run duration, helps you monitor performance and identify bottlenecks. This example calculates and logs the duration of the workflow.

```yaml
# workflow-metrics.yml
# Main Learning Points: Workflow Run Metrics
# Collect and log metrics like run duration to monitor workflow performance.

name: Workflow Metrics Demo

on:
  push:
    branches: [ main ]

jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - name: Record start time
        run: echo "START_TIME=$(date +%s)" >> $GITHUB_ENV

      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Calculate and log duration
        run: |
          END_TIME=$(date +%s)
          DURATION=$((END_TIME - START_TIME))
          echo "Workflow duration: $DURATION seconds"
```

## 🚀 Getting Started

To try these workflows:
1. Create a GitHub repository.
2. Add the supporting file (`package.json`) to your repository as needed.
3. Set up GitHub Secrets for `SLACK_BOT_TOKEN`, `EMAIL_USERNAME`, `EMAIL_PASSWORD`, and `EMAIL_RECIPIENT` as needed for notifications.
4. Create a `.github/workflows/` directory in your repository.
5. Add the `.yml` files above to the `.github/workflows/` directory.
6. For local debugging with `act`, follow the setup instructions in the `debug-act.yml` example.
7. Push to the main branch to trigger the workflows.
8. Check the "Actions" tab in your GitHub repository to view the workflow runs, logs, and metrics.

These examples provide essential techniques for monitoring and debugging GitHub Actions workflows. Move on to the next sections of the roadmap to explore integrations and more!