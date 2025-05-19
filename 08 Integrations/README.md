# 🌍 Integrations

This section explores integrating GitHub Actions with external services and tools to enhance your CI/CD pipelines. You'll learn how to integrate with Docker, AWS, Kubernetes, and third-party tools like Slack and Jira. Below are detailed examples for each sub-topic to help you understand and apply these integrations.

## 🏗️ Sub-Topics

### 1. Docker Integration
Integrate with Docker to build and push container images to a registry like Docker Hub. This example builds and pushes a Node.js app image.

#### Supporting Files
**app.js**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from the Integrations Demo!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

**Dockerfile**
```dockerfile
# Dockerfile for the Node.js app
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
```

**package.json**
```json
{
    "name": "integrations-demo",
    "version": "1.0.0",
    "main": "app.js",
    "dependencies": {
        "express": "^4.18.2"
    }
}
```

#### Workflow
```yaml
# docker-integration.yml
# Main Learning Points: Docker Integration
# Build and push a Docker image to a registry like Docker Hub.

name: Docker Integration Demo

on:
  push:
    branches: [ main ]

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/integrations-demo:${{ github.sha }}
```

### 2. AWS Integration (S3, ECS, Lambda)
Integrate with AWS to upload files to S3, deploy containers to ECS, and update Lambda functions. This example performs all three operations for a Node.js app.

#### Workflow
```yaml
# aws-integration.yml
# Main Learning Points: AWS Integration (S3, ECS, Lambda)
# Integrate GitHub Actions with AWS services for storage, container deployment, and serverless functions.

name: AWS Integration Demo

on:
  push:
    branches: [ main ]

jobs:
  s3-upload:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Upload to S3
        run: aws s3 cp app.js s3://my-integrations-bucket/app.js

  ecs-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, tag, and push image to Amazon ECR
        env:
          ECR_REGISTRY: ${{ secrets.ECR_REGISTRY }}
          ECR_REPOSITORY: integrations-demo
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG

      - name: Deploy to ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: task-definition.json
          service: integrations-demo-service
          cluster: integrations-demo-cluster
          wait-for-service-stability: true

  lambda-update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Package Lambda function
        run: |
          zip -r function.zip app.js package.json node_modules
          npm install

      - name: Update Lambda function
        run: aws lambda update-function-code --function-name integrations-demo-lambda --zip-file fileb://function.zip
```

### 3. Kubernetes Integration
Deploy a container to a Kubernetes cluster using GitHub Actions. This example deploys the Docker image to a Kubernetes cluster.

#### Supporting File
**deployment.yml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: integrations-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: integrations-demo
  template:
    metadata:
      labels:
        app: integrations-demo
    spec:
      containers:
      - name: integrations-demo
        image: DOCKERHUB_USERNAME/integrations-demo:latest
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: integrations-demo-service
spec:
  selector:
    app: integrations-demo
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

#### Workflow
```yaml
# kubernetes-integration.yml
# Main Learning Points: Kubernetes Integration
# Deploy a container to a Kubernetes cluster using GitHub Actions.

name: Kubernetes Integration Demo

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup kubectl
        uses: azure/setup-kubectl@v3
        with:
          version: 'latest'

      - name: Configure Kubernetes credentials
        run: |
          echo "${{ secrets.KUBE_CONFIG }}" > kubeconfig
          export KUBECONFIG=kubeconfig

      - name: Deploy to Kubernetes
        run: kubectl apply -f deployment.yml

      - name: Verify deployment
        run: kubectl get pods
```

### 4. Third-Party Tools (Slack, Jira)
Integrate with third-party tools like Slack for notifications and Jira for issue tracking. This example sends a Slack notification and creates a Jira issue on workflow failure.

#### Workflow
```yaml
# third-party-tools.yml
# Main Learning Points: Third-Party Tools (Slack, Jira)
# Integrate with Slack for notifications and Jira for issue updates.

name: Third-Party Tools Demo

on:
  push:
    branches: [ main ]

jobs:
  third-party:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # Simulate a failure for notification purposes
      - name: Run a step that might fail
        run: exit 1
        continue-on-error: true

      # Send a Slack notification
      - name: Notify Slack on failure
        if: failure()
        uses: slackapi/slack-github-action@v1.24.0
        with:
          slack-bot-token: ${{ secrets.SLACK_BOT_TOKEN }}
          channel-id: 'workflow-notifications'
          text: 'Workflow failed! Check the run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}'

      # Create a Jira issue on failure
      - name: Create Jira issue on failure
        if: failure()
        uses: atlassian/gajira-create@v3
        with:
          project: 'DEMO'
          issuetype: 'Bug'
          summary: 'Workflow Failure: ${{ github.workflow }}'
          description: 'The workflow failed. Check the run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}'
        env:
          JIRA_BASE_URL: ${{ secrets.JIRA_BASE_URL }}
          JIRA_USER_EMAIL: ${{ secrets.JIRA_USER_EMAIL }}
          JIRA_API_TOKEN: ${{ secrets.JIRA_API_TOKEN }}
```

## 🚀 Getting Started

To try these integrations:
1. Create a GitHub repository.
2. Add the supporting files (`app.js`, `Dockerfile`, `package.json`, `deployment.yml`) to your repository.
3. Set up GitHub Secrets for Docker Hub, AWS, Kubernetes, Slack, and Jira credentials as noted in each workflow.
4. Create a `.github/workflows/` directory in your repository.
5. Add the `.yml` files above to the `.github/workflows/` directory.
6. Set up the required external services (e.g., AWS resources, Kubernetes cluster, Slack app, Jira project).
7. Push to the main branch to trigger the workflows.
8. Check the respective services (Docker Hub, AWS, Kubernetes, Slack, Jira) to verify the integrations.

These examples demonstrate how to integrate GitHub Actions with various platforms and tools to enhance your CI/CD pipelines. This concludes the GitHub Actions roadmap!