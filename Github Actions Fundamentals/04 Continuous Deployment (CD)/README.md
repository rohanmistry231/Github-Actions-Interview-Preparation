# 🚀 Continuous Deployment (CD)

This section covers Continuous Deployment (CD) using GitHub Actions, focusing on automating the deployment process to various platforms, managing Docker images, handling sensitive data, and enforcing deployment approvals. Below are detailed examples for each sub-topic to help you understand and apply these concepts.

## 🏗️ Sub-Topics

### 1. Deploying to Cloud Platforms (AWS, Heroku, Vercel)
Automate deployment to cloud platforms like AWS Elastic Beanstalk, Heroku, and Vercel. This example shows deployment workflows for each platform, assuming credentials are stored as GitHub Secrets.

#### Supporting Files
**app.js**
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from the Continuous Deployment Demo!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```

**package.json**
```json
{
    "name": "cd-demo",
    "version": "1.0.0",
    "main": "app.js",
    "dependencies": {
        "express": "^4.18.2"
    }
}
```

#### Workflow
```yaml
# deploy-cloud.yml
# Main Learning Points: Deploying to Cloud Platforms (AWS, Heroku, Vercel)
# Automate deployment to cloud platforms using GitHub Actions.

name: Deploy to Cloud Platforms

on:
  push:
    branches: [ main ]

jobs:
  deploy-aws:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy to AWS Elastic Beanstalk
        uses: einaregilsson/beanstalk-deploy@v21
        with:
          aws_access_key: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws_secret_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          application_name: cd-demo-app
          environment_name: cd-demo-env
          version_label: ${{ github.sha }}
          region: us-east-1
          deployment_package: .

  deploy-heroku:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: cd-demo-app
          heroku_email: ${{ secrets.HEROKU_EMAIL }}

  deploy-vercel:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel_token: ${{ secrets.VERCEL_TOKEN }}
          vercel_project_id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel_org_id: ${{ secrets.VERCEL_ORG_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}
```

### 2. Docker Image Builds and Pushes
Build and push Docker images to a registry like Docker Hub as part of the CD pipeline. This example builds an image for the Node.js app and pushes it to Docker Hub.

#### Supporting Files
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

#### Workflow
```yaml
# docker-build-push.yml
# Main Learning Points: Docker Image Builds and Pushes
# Automate building and pushing Docker images to a registry.

name: Docker Build and Push

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
          tags: ${{ secrets.DOCKERHUB_USERNAME }}/cd-demo-app:${{ github.sha }}
```

### 3. Environment Variables and Secrets
Securely manage configuration using environment variables and GitHub Secrets. This example demonstrates passing an API key to the app securely.

```yaml
# env-secrets.yml
# Main Learning Points: Environment Variables and Secrets
# Use environment variables and GitHub Secrets for secure configuration.

name: Environment Variables and Secrets Demo

on:
  push:
    branches: [ main ]

jobs:
  env-secrets:
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

      - name: Run app with environment variables
        run: node app.js
        env:
          PORT: 3000
          API_KEY: ${{ secrets.API_KEY }}

      - name: Print secret (for demo purposes only)
        run: echo "API Key is $API_KEY"
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

### 4. Deployment Approvals
Enforce manual approvals before deployment using GitHub Environments. This example requires approval before deploying to a production environment.

```yaml
# deploy-approvals.yml
# Main Learning Points: Deployment Approvals
# Use GitHub Environments to enforce manual approvals before deployment.

name: Deployment Approvals Demo

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

      - name: Build app
        run: echo "Build completed"

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy (placeholder)
        run: echo "Deploying to production after approval"
```

## 🚀 Getting Started

To try these workflows:
1. Create a GitHub repository.
2. Add the supporting files (`app.js`, `Dockerfile`, `package.json`) to your repository.
3. Set up GitHub Secrets for cloud provider credentials, Docker Hub, and other sensitive data as noted in each workflow.
4. Create a `.github/workflows/` directory in your repository.
5. Add the `.yml` files above to the `.github/workflows/` directory.
6. For approvals, set up a "production" environment with required reviewers in your repository settings.
7. Push to the main branch to trigger the workflows.
8. Check the "Actions" tab in your GitHub repository to view the workflow runs, approve deployments, and verify the results.

These examples provide a strong foundation for implementing Continuous Deployment with GitHub Actions. Move on to the next sections of the roadmap to explore advanced workflows, security, and more!