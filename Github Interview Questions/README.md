# GitHub Actions Interview Questions with Makefile for AI/ML Roles

This README provides **170 GitHub Actions interview questions** tailored for AI/ML students preparing for technical interviews, focusing on automating CI/CD pipelines for machine learning projects using GitHub Actions and Makefiles. The questions are categorized into **GitHub Actions Basics**, **Workflow Configuration**, **Makefile Integration**, **CI/CD for AI/ML**, **Testing Automation**, **Deployment Automation**, **Advanced Workflows**, and **Security & Best Practices**. Each category is divided into **Basic**, **Intermediate**, and **Advanced** levels, with practical code snippets using GitHub Actions YAML and Makefile scripts for tasks like linting, testing, building, and deploying ML models. This resource supports candidates aiming for roles such as data scientists, ML engineers, or DevOps engineers working on automated ML pipelines.

## GitHub Actions Basics

### Basic
1. **What is GitHub Actions, and how is it used in AI/ML?**  
   GitHub Actions is a CI/CD platform for automating workflows in GitHub repositories. In AI/ML, it automates model training, testing, and deployment.  
   ```yaml
   name: Basic Workflow
   on: [push]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: echo "Hello, AI/ML Workflow!"
   ```

2. **How do you create a simple GitHub Actions workflow?**  
   Defines a YAML file in `.github/workflows/`.  
   ```yaml
   name: Simple Workflow
   on: [push]
   jobs:
     hello:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make hello
   ```
   ```makefile
   hello:
   	@echo "Hello from Makefile!"
   ```

3. **What is the purpose of a Makefile in GitHub Actions?**  
   A Makefile defines tasks (e.g., build, test) to simplify command execution in workflows.  
   ```makefile
   test:
   	python -m pytest
   ```

4. **How do you trigger a GitHub Actions workflow?**  
   Uses events like `push` or `pull_request`.  
   ```yaml
   name: Trigger Workflow
   on:
     push:
       branches: [main]
   jobs:
     trigger:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make check
   ```
   ```makefile
   check:
   	@echo "Triggered workflow!"
   ```

5. **What is the `runs-on` keyword in GitHub Actions?**  
   Specifies the runner environment (e.g., `ubuntu-latest`).  
   ```yaml
   name: Runner Example
   on: [push]
   jobs:
     run:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make info
   ```
   ```makefile
   info:
   	uname -a
   ```

6. **How do you check workflow syntax?**  
   Uses GitHub’s workflow editor or `act` locally.  
   ```yaml
   name: Syntax Check
   on: [push]
   jobs:
     syntax:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make validate
   ```
   ```makefile
   validate:
   	@echo "Validating workflow..."
   ```

#### Intermediate
7. **How do you use environment variables in GitHub Actions?**  
   Defines variables in workflow YAML.  
   ```yaml
   name: Env Variables
   on: [push]
   jobs:
     env:
       runs-on: ubuntu-latest
       env:
         MODEL_NAME: my-model
       steps:
         - uses: actions/checkout@v3
         - run: make train
   ```
   ```makefile
   train:
   	@echo "Training $(MODEL_NAME)"
   ```

8. **How do you cache dependencies in GitHub Actions?**  
   Uses `actions/cache` to cache Python dependencies.  
   ```yaml
   name: Cache Dependencies
   on: [push]
   jobs:
     cache:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/cache@v3
           with:
             path: ~/.cache/pip
             key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
         - run: make install
   ```
   ```makefile
   install:
   	pip install -r requirements.txt
   ```

9. **How do you run a Makefile in GitHub Actions?**  
   Executes `make` commands in workflow steps.  
   ```yaml
   name: Run Makefile
   on: [push]
   jobs:
     make:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test
   ```
   ```makefile
   test:
   	python -m pytest tests/
   ```

10. **How do you set up a Python environment in GitHub Actions?**  
    Uses `actions/setup-python`.  
    ```yaml
    name: Python Setup
    on: [push]
    jobs:
      python:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v4
            with:
              python-version: '3.9'
          - run: make setup
    ```
    ```makefile
    setup:
    	pip install -r requirements.txt
    ```

11. **How do you handle workflow failures?**  
    Uses `continue-on-error` or conditional steps.  
    ```yaml
    name: Handle Failure
    on: [push]
    jobs:
      handle:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make lint
            continue-on-error: true
    ```
    ```makefile
    lint:
    	flake8 .
    ```

12. **How do you view workflow logs?**  
    Checks logs in GitHub’s Actions tab.  
    ```yaml
    name: Log Workflow
    on: [push]
    jobs:
      log:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make log
    ```
    ```makefile
    log:
    	@echo "Logging workflow..."
    ```

#### Advanced
13. **How do you create matrix builds in GitHub Actions?**  
    Runs jobs across multiple configurations.  
    ```yaml
    name: Matrix Build
    on: [push]
    jobs:
      matrix:
        runs-on: ubuntu-latest
        strategy:
          matrix:
            python-version: ['3.8', '3.9']
        steps:
          - uses: actions/checkout@v3
          - uses: actions/setup-python@v4
            with:
              python-version: ${{ matrix.python-version }}
          - run: make test
    ```
    ```makefile
    test:
    	python -m pytest
    ```

14. **How do you use secrets in GitHub Actions?**  
    Accesses repository secrets for sensitive data.  
    ```yaml
    name: Secrets
    on: [push]
    jobs:
      secrets:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make deploy
            env:
              API_KEY: ${{ secrets.API_KEY }}
    ```
    ```makefile
    deploy:
    	@echo "Deploying with API_KEY=$(API_KEY)"
    ```

15. **How do you optimize GitHub Actions performance?**  
    Caches dependencies and minimizes steps.  
    ```yaml
    name: Optimize Workflow
    on: [push]
    jobs:
      optimize:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/cache@v3
            with:
              path: ~/.cache/pip
              key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
          - run: make quick
    ```
    ```makefile
    quick:
    	pip install -r requirements.txt && python -m pytest --durations=0
    ```

16. **How do you create reusable workflows?**  
    Uses `workflow_call` for reusable workflows.  
    ```yaml
    name: Reusable Workflow
    on:
      workflow_call:
    jobs:
      reuse:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make build
    ```
    ```makefile
    build:
    	python setup.py build
    ```

17. **How do you debug GitHub Actions workflows?**  
    Uses `github-script` or debug logs.  
    ```yaml
    name: Debug Workflow
    on: [push]
    jobs:
      debug:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make debug
    ```
    ```makefile
    debug:
    	@echo "Debugging..." && env
    ```

18. **How do you monitor workflow performance?**  
    Tracks execution time in logs.  
    ```yaml
    name: Monitor Workflow
    on: [push]
    jobs:
      monitor:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make time
    ```
    ```makefile
    time:
    	@time python -m pytest
    ```

## Workflow Configuration

### Basic
19. **How do you define workflow triggers?**  
   Uses `on` to specify events.  
   ```yaml
   name: Trigger Config
   on:
     push:
       branches: [main]
     pull_request:
       branches: [main]
   jobs:
     config:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make check
   ```
   ```makefile
   check:
   	@echo "Checking triggers..."
   ```

20. **How do you specify job dependencies?**  
   Uses `needs` to define job order.  
   ```yaml
   name: Job Dependencies
   on: [push]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make build
     test:
       runs-on: ubuntu-latest
       needs: build
       steps:
         - uses: actions/checkout@v3
         - run: make test
   ```
   ```makefile
   build:
   	python setup.py build
   test:
   	python -m pytest
   ```

21. **How do you configure runner environments?**  
   Specifies OS and container.  
   ```yaml
   name: Runner Config
   on: [push]
   jobs:
     run:
       runs-on: ubuntu-latest
       container: python:3.9
       steps:
         - uses: actions/checkout@v3
         - run: make run
   ```
   ```makefile
   run:
   	python main.py
   ```

22. **How do you add custom step names?**  
   Uses `name` in steps.  
   ```yaml
   name: Step Names
   on: [push]
   jobs:
     steps:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout Code
           uses: actions/checkout@v3
         - name: Run Makefile
           run: make custom
   ```
   ```makefile
   custom:
   	@echo "Custom step executed"
   ```

23. **How do you skip workflows for certain commits?**  
   Uses `[ci skip]` in commit messages.  
   ```yaml
   name: Skip Workflow
   on: [push]
   jobs:
     skip:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make skip
   ```
   ```makefile
   skip:
   	@echo "Check commit message for [ci skip]"
   ```

24. **How do you configure workflow timeouts?**  
   Uses `timeout-minutes`.  
   ```yaml
   name: Timeout Config
   on: [push]
   jobs:
     timeout:
       runs-on: ubuntu-latest
       timeout-minutes: 5
       steps:
         - uses: actions/checkout@v3
         - run: make long
   ```
   ```makefile
   long:
   	@sleep 60 && echo "Long task"
   ```

#### Intermediate
25. **How do you use conditional steps in workflows?**  
   Uses `if` to control step execution.  
   ```yaml
   name: Conditional Steps
   on: [push]
   jobs:
     cond:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test
           if: github.event_name == 'push'
   ```
   ```makefile
   test:
   	python -m pytest
   ```

26. **How do you configure parallel jobs?**  
   Runs multiple jobs concurrently.  
   ```yaml
   name: Parallel Jobs
   on: [push]
   jobs:
     job1:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make task1
     job2:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make task2
   ```
   ```makefile
   task1:
   	@echo "Task 1"
   task2:
   	@echo "Task 2"
   ```

27. **How do you share artifacts between jobs?**  
   Uses `actions/upload-artifact` and `actions/download-artifact`.  
   ```yaml
   name: Share Artifacts
   on: [push]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make build
         - uses: actions/upload-artifact@v3
           with:
             name: model
             path: model.pkl
     test:
       runs-on: ubuntu-latest
       needs: build
       steps:
         - uses: actions/download-artifact@v3
           with:
             name: model
         - run: make test
   ```
   ```makefile
   build:
   	python train.py
   test:
   	python test.py
   ```

28. **How do you configure custom runners?**  
   Uses self-hosted runners.  
   ```yaml
   name: Custom Runner
   on: [push]
   jobs:
     custom:
       runs-on: self-hosted
       steps:
         - uses: actions/checkout@v3
         - run: make run
   ```
   ```makefile
   run:
   	python main.py
   ```

29. **How do you schedule workflows?**  
   Uses `schedule` with cron syntax.  
   ```yaml
   name: Scheduled Workflow
   on:
     schedule:
       - cron: '0 0 * * *'
   jobs:
     schedule:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make daily
   ```
   ```makefile
   daily:
   	@echo "Daily task"
   ```

30. **How do you manage workflow permissions?**  
   Uses `permissions` to restrict access.  
   ```yaml
   name: Workflow Permissions
   on: [push]
   permissions:
     contents: read
   jobs:
     perms:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make secure
   ```
   ```makefile
   secure:
   	@echo "Running with restricted permissions"
   ```

#### Advanced
31. **How do you create dynamic workflow configurations?**  
   Uses `matrix` with dynamic inputs.  
   ```yaml
   name: Dynamic Workflow
   on: [push]
   jobs:
     dynamic:
       runs-on: ubuntu-latest
       strategy:
         matrix:
           config: ['small', 'large']
       steps:
         - uses: actions/checkout@v3
         - run: make run-config
           env:
             CONFIG: ${{ matrix.config }}
   ```
   ```makefile
   run-config:
   	@echo "Running with $(CONFIG)"
   ```

32. **How do you handle multi-stage workflows?**  
   Uses multiple jobs with dependencies.  
   ```yaml
   name: Multi-Stage Workflow
   on: [push]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make build
     test:
       runs-on: ubuntu-latest
       needs: build
       steps:
         - uses: actions/checkout@v3
         - run: make test
     deploy:
       runs-on: ubuntu-latest
       needs: test
       steps:
         - uses: actions/checkout@v3
         - run: make deploy
   ```
   ```makefile
   build:
   	python setup.py build
   test:
   	python -m pytest
   deploy:
   	@echo "Deploying..."
   ```

33. **How do you optimize workflow resource usage?**  
   Uses smaller runners and caching.  
   ```yaml
   name: Optimize Resources
   on: [push]
   jobs:
     optimize:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/cache@v3
           with:
             path: ~/.cache/pip
             key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
         - run: make fast
   ```
   ```makefile
   fast:
   	pip install -r requirements.txt && python -m pytest -n 2
   ```

34. **How do you create event-driven workflows?**  
   Uses `workflow_dispatch` for manual triggers.  
   ```yaml
   name: Event-Driven Workflow
   on:
     workflow_dispatch:
       inputs:
         env:
           description: 'Environment'
           required: true
   jobs:
     event:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make run-env
           env:
             ENV: ${{ github.event.inputs.env }}
   ```
   ```makefile
   run-env:
   	@echo "Running in $(ENV)"
   ```

35. **How do you integrate external APIs in workflows?**  
   Uses `curl` or scripts to call APIs.  
   ```yaml
   name: API Integration
   on: [push]
   jobs:
     api:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make call-api
           env:
             API_KEY: ${{ secrets.API_KEY }}
   ```
   ```makefile
   call-api:
   	curl -H "Authorization: Bearer $(API_KEY)" https://api.example.com
   ```

36. **How do you visualize workflow performance?**  
   Tracks job execution times.  
   ```yaml
   name: Workflow Performance
   on: [push]
   jobs:
     perf:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make perf
   ```
   ```makefile
   perf:
   	@time make test
   test:
   	python -m pytest
   ```

## Makefile Integration

### Basic
37. **How do you create a basic Makefile for GitHub Actions?**  
   Defines simple tasks.  
   ```makefile
   all:
   	@echo "Running all tasks"
   test:
   	python -m pytest
   ```

38. **How do you run Makefile tasks in GitHub Actions?**  
   Executes `make` in workflow steps.  
   ```yaml
   name: Makefile Run
   on: [push]
   jobs:
     make:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make lint
   ```
   ```makefile
   lint:
   	flake8 .
   ```

39. **How do you install Make in a workflow?**  
   Installs `make` on the runner.  
   ```yaml
   name: Install Make
   on: [push]
   jobs:
     install:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: sudo apt-get update && sudo apt-get install -y make
         - run: make test
   ```
   ```makefile
   test:
   	python -m pytest
   ```

40. **How do you pass variables to a Makefile?**  
   Uses environment variables.  
   ```yaml
   name: Makefile Variables
   on: [push]
   jobs:
     vars:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make build
           env:
             MODEL: my-model
   ```
   ```makefile
   build:
   	@echo "Building $(MODEL)"
   ```

41. **How do you create Makefile dependencies?**  
   Defines task dependencies.  
   ```makefile
   all: test lint
   test:
   	python -m pytest
   lint:
   	flake8 .
   ```

42. **How do you check Makefile syntax?**  
   Uses `make -n`.  
   ```yaml
   name: Makefile Syntax
   on: [push]
   jobs:
     syntax:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make -n test
   ```
   ```makefile
   test:
   	python -m pytest
   ```

#### Intermediate
43. **How do you create a Makefile for Python projects?**  
   Includes linting, testing, and building.  
   ```makefile
   install:
   	pip install -r requirements.txt
   lint:
   	flake8 .
   test:
   	python -m pytest
   ```

44. **How do you use Makefile for Docker builds?**  
   Defines Docker build tasks.  
   ```yaml
   name: Docker Build
   on: [push]
   jobs:
     docker:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make docker-build
   ```
   ```makefile
   docker-build:
   	docker build -t my-model .
   ```

45. **How do you handle Makefile errors in workflows?**  
   Checks exit codes.  
   ```yaml
   name: Makefile Errors
   on: [push]
   jobs:
     error:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make lint || exit 1
   ```
   ```makefile
   lint:
   	flake8 .
   ```

46. **How do you create a Makefile for ML training?**  
   Defines training tasks.  
   ```makefile
   train:
   	python train.py --model my-model
   evaluate:
   	python evaluate.py
   ```

47. **How do you optimize Makefile tasks?**  
   Uses parallel execution.  
   ```yaml
   name: Optimize Makefile
   on: [push]
   jobs:
     optimize:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make -j2 test
   ```
   ```makefile
   test:
   	python -m pytest
   ```

48. **How do you integrate Makefile with virtualenv?**  
   Manages Python environments.  
   ```yaml
   name: Virtualenv Makefile
   on: [push]
   jobs:
     venv:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make setup
   ```
   ```makefile
   setup:
   	python -m venv venv
   	. venv/bin/activate && pip install -r requirements.txt
   ```

#### Advanced
49. **How do you create a complex Makefile for ML pipelines?**  
   Includes multiple stages.  
   ```makefile
   all: install train evaluate
   install:
   	pip install -r requirements.txt
   train:
   	python train.py
   evaluate:
   	python evaluate.py
   ```

50. **How do you use Makefile for multi-environment builds?**  
   Defines environment-specific tasks.  
   ```yaml
   name: Multi-Env Makefile
   on: [push]
   jobs:
     multi:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make build-prod
           env:
             ENV: prod
   ```
   ```makefile
   build-prod:
   	@echo "Building for $(ENV)"
   	python build.py --env $(ENV)
   ```

51. **How do you create a Makefile for model versioning?**  
   Tags models with versions.  
   ```makefile
   version:
   	@echo "Tagging model v$(VERSION)"
   	python tag_model.py --version $(VERSION)
   ```

52. **How do you optimize Makefile for large projects?**  
   Minimizes task overhead.  
   ```yaml
   name: Large Project Makefile
   on: [push]
   jobs:
     large:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make fast-build
   ```
   ```makefile
   fast-build:
   	python -m compileall .
   ```

53. **How do you create a Makefile for artifact management?**  
   Manages model artifacts.  
   ```makefile
   artifacts:
   	zip -r model.zip model.pkl
   ```

54. **How do you visualize Makefile task performance?**  
   Tracks task execution time.  
   ```yaml
   name: Makefile Performance
   on: [push]
   jobs:
     perf:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make perf
   ```
   ```makefile
   perf:
   	@time make test
   test:
   	python -m pytest
   ```

## CI/CD for AI/ML

### Basic
55. **How do you set up a CI pipeline for an ML project?**  
   Runs linting and testing.  
   ```yaml
   name: ML CI
   on: [push]
   jobs:
     ci:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-python@v4
           with:
             python-version: '3.9'
         - run: make ci
   ```
   ```makefile
   ci: install lint test
   install:
   	pip install -r requirements.txt
   lint:
   	flake8 .
   test:
   	python -m pytest
   ```

56. **How do you automate model training in CI/CD?**  
   Runs training script.  
   ```yaml
   name: Train Model
   on: [push]
   jobs:
     train:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make train
   ```
   ```makefile
   train:
   	python train.py
   ```

57. **How do you test ML models in GitHub Actions?**  
   Runs evaluation script.  
   ```yaml
   name: Test Model
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make evaluate
   ```
   ```makefile
   evaluate:
   	python evaluate.py
   ```

58. **How do you build Docker images for ML models?**  
   Uses Docker in workflow.  
   ```yaml
   name: Build Docker
   on: [push]
   jobs:
     docker:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make docker-build
   ```
   ```makefile
   docker-build:
   	docker build -t ml-model .
   ```

59. **How do you cache ML dependencies in CI/CD?**  
   Caches Python packages.  
   ```yaml
   name: Cache ML Deps
   on: [push]
   jobs:
     cache:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/cache@v3
           with:
             path: ~/.cache/pip
             key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
         - run: make install
   ```
   ```makefile
   install:
   	pip install -r requirements.txt
   ```

60. **How do you validate ML data in CI?**  
   Runs data validation script.  
   ```yaml
   name: Validate Data
   on: [push]
   jobs:
     validate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make validate
   ```
   ```makefile
   validate:
   	python validate_data.py
   ```

#### Intermediate
61. **How do you automate model evaluation in CI/CD?**  
   Runs metrics calculation.  
   ```yaml
   name: Evaluate Model
   on: [push]
   jobs:
     eval:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make metrics
   ```
   ```makefile
   metrics:
   	python calculate_metrics.py
   ```

62. **How do you integrate linting in ML CI pipelines?**  
   Runs `flake8` for code quality.  
   ```yaml
   name: Linting ML
   on: [push]
   jobs:
     lint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make lint
   ```
   ```makefile
   lint:
   	flake8 .
   ```

63. **How do you handle large ML datasets in CI?**  
   Downloads datasets from storage.  
   ```yaml
   name: Large Dataset
   on: [push]
   jobs:
     data:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make download
           env:
             DATA_URL: ${{ secrets.DATA_URL }}
   ```
   ```makefile
   download:
   	wget $(DATA_URL) -O data.zip
   ```

64. **How do you run parallel ML tests in CI?**  
   Uses `pytest-xdist`.  
   ```yaml
   name: Parallel Tests
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test-parallel
   ```
   ```makefile
   test-parallel:
   	python -m pytest -n auto
   ```

65. **How do you automate ML model versioning?**  
   Tags models with Git tags.  
   ```yaml
   name: Model Versioning
   on: [push]
   jobs:
     version:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make version
           env:
             VERSION: 1.0.0
   ```
   ```makefile
   version:
   	python tag_model.py --version $(VERSION)
   ```

66. **How do you monitor CI pipeline performance?**  
   Tracks job durations.  
   ```yaml
   name: CI Performance
   on: [push]
   jobs:
     perf:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make perf
   ```
   ```makefile
   perf:
   	@time make test
   test:
   	python -m pytest
   ```

#### Advanced
67. **How do you create a multi-stage ML CI/CD pipeline?**  
   Includes build, test, and deploy.  
   ```yaml
   name: ML CI/CD
   on: [push]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make build
     test:
       runs-on: ubuntu-latest
       needs: build
       steps:
         - uses: actions/checkout@v3
         - run: make test
     deploy:
       runs-on: ubuntu-latest
       needs: test
       steps:
         - uses: actions/checkout@v3
         - run: make deploy
   ```
   ```makefile
   build:
   	python train.py
   test:
   	python evaluate.py
   deploy:
   	python deploy.py
   ```

68. **How do you optimize ML CI/CD pipelines?**  
   Uses caching and parallelization.  
   ```yaml
   name: Optimize ML CI/CD
   on: [push]
   jobs:
     optimize:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/cache@v3
           with:
             path: ~/.cache/pip
             key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
         - run: make fast-ci
   ```
   ```makefile
   fast-ci:
   	pip install -r requirements.txt && python -m pytest -n auto
   ```

69. **How do you handle GPU runners for ML training?**  
   Uses GPU-enabled runners (mock).  
   ```yaml
   name: GPU Training
   on: [push]
   jobs:
     train:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make train-gpu
   ```
   ```makefile
   train-gpu:
   	python train.py --device cuda
   ```

70. **How do you automate hyperparameter tuning in CI?**  
   Runs tuning script.  
   ```yaml
   name: Hyperparameter Tuning
   on: [push]
   jobs:
     tune:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make tune
   ```
   ```makefile
   tune:
   	python tune.py
   ```

71. **How do you create a model registry in CI/CD?**  
   Pushes models to a registry.  
   ```yaml
   name: Model Registry
   on: [push]
   jobs:
     registry:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make push-model
           env:
             REGISTRY_URL: ${{ secrets.REGISTRY_URL }}
   ```
   ```makefile
   push-model:
   	python push_model.py --url $(REGISTRY_URL)
   ```

72. **How do you visualize ML CI/CD performance?**  
   Tracks pipeline execution time.  
   ```yaml
   name: ML CI/CD Performance
   on: [push]
   jobs:
     perf:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make perf
   ```
   ```makefile
   perf:
   	@time make ci
   ci:
   	python -m pytest
   ```

## Testing Automation

### Basic
73. **How do you automate unit tests in GitHub Actions?**  
   Runs `pytest` for unit tests.  
   ```yaml
   name: Unit Tests
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test
   ```
   ```makefile
   test:
   	python -m pytest tests/unit/
   ```

74. **How do you run integration tests in CI?**  
   Runs integration test suite.  
   ```yaml
   name: Integration Tests
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make integration
   ```
   ```makefile
   integration:
   	python -m pytest tests/integration/
   ```

75. **How do you check code coverage in CI?**  
   Uses `pytest-cov`.  
   ```yaml
   name: Code Coverage
   on: [push]
   jobs:
     coverage:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make coverage
   ```
   ```makefile
   coverage:
   	python -m pytest --cov=src
   ```

76. **How do you automate linting in CI?**  
   Runs `flake8` for style checks.  
   ```yaml
   name: Linting
   on: [push]
   jobs:
     lint:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make lint
   ```
   ```makefile
   lint:
   	flake8 .
   ```

77. **How do you test Python dependencies?**  
   Checks `requirements.txt`.  
   ```yaml
   name: Dependency Test
   on: [push]
   jobs:
     deps:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make check-deps
   ```
   ```makefile
   check-deps:
   	pip check
   ```

78. **How do you validate test results in CI?**  
   Checks test exit code.  
   ```yaml
   name: Validate Tests
   on: [push]
   jobs:
     validate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test
   ```
   ```makefile
   test:
   	python -m pytest || exit 1
   ```

#### Intermediate
79. **How do you run tests across multiple Python versions?**  
   Uses matrix strategy.  
   ```yaml
   name: Multi-Python Tests
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       strategy:
         matrix:
           python-version: ['3.8', '3.9']
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-python@v4
           with:
             python-version: ${{ matrix.python-version }}
         - run: make test
   ```
   ```makefile
   test:
   	python -m pytest
   ```

80. **How do you automate test reporting in CI?**  
   Generates JUnit XML reports.  
   ```yaml
   name: Test Reporting
   on: [push]
   jobs:
     report:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test-report
         - uses: actions/upload-artifact@v3
           with:
             name: test-report
             path: report.xml
   ```
   ```makefile
   test-report:
   	python -m pytest --junitxml=report.xml
   ```

81. **How do you handle flaky tests in CI?**  
   Uses `pytest-rerunfailures`.  
   ```yaml
   name: Flaky Tests
   on: [push]
   jobs:
     flaky:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test-flaky
   ```
   ```makefile
   test-flaky:
   	python -m pytest --reruns 3
   ```

82. **How do you test ML model performance in CI?**  
   Runs evaluation metrics.  
   ```yaml
   name: Model Performance
   on: [push]
   jobs:
     perf:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make evaluate
   ```
   ```makefile
   evaluate:
   	python evaluate.py
   ```

83. **How do you automate dependency vulnerability checks?**  
   Uses `safety`.  
   ```yaml
   name: Vulnerability Check
   on: [push]
   jobs:
     vuln:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make check-vuln
   ```
   ```makefile
   check-vuln:
   	safety check
   ```

84. **How do you optimize test execution in CI?**  
   Uses parallel testing.  
   ```yaml
   name: Optimize Tests
   on: [push]
   jobs:
     optimize:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test-fast
   ```
   ```makefile
   test-fast:
   	python -m pytest -n auto
   ```

#### Advanced
85. **How do you create a test matrix for ML models?**  
   Tests multiple model configurations.  
   ```yaml
   name: Model Test Matrix
   on: [push]
   jobs:
     test:
       runs-on: ubuntu-latest
       strategy:
         matrix:
           model: ['rf', 'nn']
       steps:
         - uses: actions/checkout@v3
         - run: make test-model
           env:
             MODEL: ${{ matrix.model }}
   ```
   ```makefile
   test-model:
   	python test.py --model $(MODEL)
   ```

86. **How do you automate end-to-end ML tests?**  
   Runs full pipeline tests.  
   ```yaml
   name: E2E Tests
   on: [push]
   jobs:
     e2e:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make e2e
   ```
   ```makefile
   e2e:
   	python e2e_test.py
   ```

87. **How do you test model robustness in CI?**  
   Runs stress tests.  
   ```yaml
   name: Robustness Tests
   on: [push]
   jobs:
     robust:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make stress
   ```
   ```makefile
   stress:
   	python stress_test.py
   ```

88. **How do you automate test result notifications?**  
   Uses Slack notifications.  
   ```yaml
   name: Test Notifications
   on: [push]
   jobs:
     notify:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make test
         - uses: slackapi/slack-github-action@v1
           with:
             slack-bot-token: ${{ secrets.SLACK_TOKEN }}
             channel-id: 'test-channel'
             text: 'Tests completed!'
   ```
   ```makefile
   test:
   	python -m pytest
   ```

89. **How do you create a test coverage dashboard?**  
   Uploads coverage to Codecov.  
   ```yaml
   name: Coverage Dashboard
   on: [push]
   jobs:
     coverage:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make coverage
         - uses: codecov/codecov-action@v3
           with:
             files: ./coverage.xml
   ```
   ```makefile
   coverage:
   	python -m pytest --cov=src --cov-report=xml
   ```

90. **How do you visualize test performance?**  
   Tracks test execution time.  
   ```yaml
   name: Test Performance
   on: [push]
   jobs:
     perf:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make perf
   ```
   ```makefile
   perf:
   	@time python -m pytest
   ```

## Deployment Automation

### Basic
91. **How do you deploy an ML model with GitHub Actions?**  
   Pushes model to a server.  
   ```yaml
   name: Deploy Model
   on: [push]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make deploy
           env:
             SERVER: ${{ secrets.SERVER }}
   ```
   ```makefile
   deploy:
   	python deploy.py --server $(SERVER)
   ```

92. **How do you push Docker images to a registry?**  
   Uses Docker Hub.  
   ```yaml
   name: Push Docker
   on: [push]
   jobs:
     docker:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make docker-push
           env:
             DOCKER_USER: ${{ secrets.DOCKER_USER }}
             DOCKER_PASS: ${{ secrets.DOCKER_PASS }}
   ```
   ```makefile
   docker-push:
   	@echo "$(DOCKER_PASS)" | docker login -u $(DOCKER_USER) --password-stdin
   	docker push my-model
   ```

93. **How do you automate model artifact deployment?**  
   Uploads artifacts.  
   ```yaml
   name: Artifact Deployment
   on: [push]
   jobs:
     artifact:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make artifacts
         - uses: actions/upload-artifact@v3
           with:
             name: model
             path: model.zip
   ```
   ```makefile
   artifacts:
   	zip -r model.zip model.pkl
   ```

94. **How do you deploy to cloud platforms?**  
   Deploys to AWS (mock).  
   ```yaml
   name: Cloud Deploy
   on: [push]
   jobs:
     cloud:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make deploy-aws
           env:
             AWS_KEY: ${{ secrets.AWS_KEY }}
   ```
   ```makefile
   deploy-aws:
   	python deploy_aws.py --key $(AWS_KEY)
   ```

95. **How do you rollback deployments in CI/CD?**  
   Runs rollback script.  
   ```yaml
   name: Rollback Deploy
   on: [push]
   jobs:
     rollback:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make rollback
   ```
   ```makefile
   rollback:
   	python rollback.py
   ```

96. **How do you validate deployments in CI?**  
   Runs health check.  
   ```yaml
   name: Validate Deploy
   on: [push]
   jobs:
     validate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make health
   ```
   ```makefile
   health:
   	python health_check.py
   ```

#### Intermediate
97. **How do you automate blue-green deployments?**  
   Switches between environments.  
   ```yaml
   name: Blue-Green Deploy
   on: [push]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make blue-green
   ```
   ```makefile
   blue-green:
   	python deploy_blue_green.py
   ```

98. **How do you deploy ML models to Kubernetes?**  
   Uses `kubectl`.  
   ```yaml
   name: Kubernetes Deploy
   on: [push]
   jobs:
     k8s:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make k8s-deploy
           env:
             KUBE_CONFIG: ${{ secrets.KUBE_CONFIG }}
   ```
   ```makefile
   k8s-deploy:
   	python deploy_k8s.py --config $(KUBE_CONFIG)
   ```

99. **How do you handle multi-region deployments?**  
   Deploys to multiple regions.  
   ```yaml
   name: Multi-Region Deploy
   on: [push]
   jobs:
     multi:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make deploy-multi
   ```
   ```makefile
   deploy-multi:
   	python deploy_multi.py
   ```

100. **How do you automate model monitoring post-deployment?**  
    Runs monitoring script.  
    ```yaml
    name: Model Monitoring
    on: [push]
    jobs:
      monitor:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make monitor
    ```
    ```makefile
    monitor:
    	python monitor.py
    ```

101. **How do you manage deployment secrets?**  
    Uses GitHub Secrets.  
    ```yaml
    name: Deployment Secrets
    on: [push]
    jobs:
      secrets:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make deploy
            env:
              DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
    ```
    ```makefile
    deploy:
    	python deploy.py --key $(DEPLOY_KEY)
    ```

102. **How do you optimize deployment workflows?**  
    Minimizes deployment steps.  
    ```yaml
    name: Optimize Deploy
    on: [push]
    jobs:
      optimize:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make fast-deploy
    ```
    ```makefile
    fast-deploy:
    	python deploy.py --quick
    ```

#### Advanced
103. **How do you create a canary deployment for ML models?**  
    Deploys to a subset of users.  
    ```yaml
    name: Canary Deploy
    on: [push]
    jobs:
      canary:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make canary
    ```
    ```makefile
    canary:
    	python deploy_canary.py
    ```

104. **How do you automate A/B testing for ML models?**  
    Deploys multiple model versions.  
    ```yaml
    name: A/B Testing
    on: [push]
    jobs:
      ab:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make ab-test
    ```
    ```makefile
    ab-test:
    	python ab_test.py
    ```

105. **How do you handle zero-downtime deployments?**  
    Uses rolling updates.  
    ```yaml
    name: Zero-Downtime Deploy
    on: [push]
    jobs:
      zero:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make rolling
    ```
    ```makefile
    rolling:
    	python deploy_rolling.py
    ```

106. **How do you create a model rollback pipeline?**  
    Automates rollback on failure.  
    ```yaml
    name: Rollback Pipeline
    on: [push]
    jobs:
      rollback:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make deploy || make rollback
    ```
    ```makefile
    deploy:
    	python deploy.py
    rollback:
    	python rollback.py
    ```

107. **How do you deploy models to edge devices?**  
    Pushes to edge servers.  
    ```yaml
    name: Edge Deploy
    on: [push]
    jobs:
      edge:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make edge-deploy
    ```
    ```makefile
    edge-deploy:
    	python deploy_edge.py
    ```

108. **How do you visualize deployment performance?**  
    Tracks deployment time.  
    ```yaml
    name: Deploy Performance
    on: [push]
    jobs:
      perf:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make perf
    ```
    ```makefile
    perf:
    	@time make deploy
    deploy:
    	python deploy.py
    ```

## Advanced Workflows

### Basic
109. **How do you create a workflow for model retraining?**  
    Triggers retraining on data updates.  
    ```yaml
    name: Model Retraining
    on: [push]
    jobs:
      retrain:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make retrain
    ```
    ```makefile
    retrain:
    	python retrain.py
    ```

110. **How do you automate data preprocessing in workflows?**  
    Runs preprocessing script.  
    ```yaml
    name: Data Preprocessing
    on: [push]
    jobs:
      preprocess:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make preprocess
    ```
    ```makefile
    preprocess:
    	python preprocess.py
    ```

111. **How do you create a workflow for model validation?**  
    Validates model performance.  
    ```yaml
    name: Model Validation
    on: [push]
    jobs:
      validate:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make validate
    ```
    ```makefile
    validate:
    	python validate_model.py
    ```

112. **How do you automate model documentation?**  
    Generates docs with Sphinx.  
    ```yaml
    name: Model Docs
    on: [push]
    jobs:
      docs:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make docs
    ```
    ```makefile
    docs:
    	sphinx-build -b html docs/ docs/_build
    ```

113. **How do you create a workflow for data drift detection?**  
    Runs drift detection script.  
    ```yaml
    name: Data Drift
    on: [push]
    jobs:
      drift:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make drift
    ```
    ```makefile
    drift:
    	python detect_drift.py
    ```

114. **How do you visualize workflow complexity?**  
    Tracks step count.  
    ```yaml
    name: Workflow Complexity
    on: [push]
    jobs:
      complex:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make complex
    ```
    ```makefile
    complex:
    	@echo "Counting steps..."
    ```

#### Intermediate
115. **How do you create a workflow for model benchmarking?**  
    Compares model performance.  
    ```yaml
    name: Model Benchmark
    on: [push]
    jobs:
      benchmark:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make benchmark
    ```
    ```makefile
    benchmark:
    	python benchmark.py
    ```

116. **How do you automate model retraining triggers?**  
    Uses data change detection.  
    ```yaml
    name: Retrain Trigger
    on:
      push:
        paths:
          - 'data/**'
    jobs:
      retrain:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make retrain
    ```
    ```makefile
    retrain:
    	python retrain.py
    ```

117. **How do you create a workflow for model explainability?**  
    Generates SHAP plots.  
    ```yaml
    name: Model Explainability
    on: [push]
    jobs:
      explain:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make explain
    ```
    ```makefile
    explain:
    	python explain.py
    ```

118. **How do you automate model performance tracking?**  
    Logs metrics to a database.  
    ```yaml
    name: Performance Tracking
    on: [push]
    jobs:
      track:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make track
    ```
    ```makefile
    track:
    	python track_metrics.py
    ```

119. **How do you create a workflow for model fairness checks?**  
    Runs fairness analysis.  
    ```yaml
    name: Model Fairness
    on: [push]
    jobs:
      fairness:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make fairness
    ```
    ```makefile
    fairness:
    	python fairness.py
    ```

120. **How do you optimize advanced workflows?**  
    Minimizes steps and caches.  
    ```yaml
    name: Optimize Advanced
    on: [push]
    jobs:
      optimize:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - uses: actions/cache@v3
            with:
              path: ~/.cache/pip
              key: ${{ runner.os }}-pip-${{ hashFiles('requirements.txt') }}
          - run: make fast
    ```
    ```makefile
    fast:
    	pip install -r requirements.txt && python main.py
    ```

#### Advanced
121. **How do you create a workflow for model drift monitoring?**  
    Runs continuous drift checks.  
    ```yaml
    name: Drift Monitoring
    on:
      schedule:
        - cron: '0 0 * * *'
    jobs:
      drift:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make monitor-drift
    ```
    ```makefile
    monitor-drift:
    	python monitor_drift.py
    ```

122. **How do you automate model lifecycle management?**  
    Manages training, deployment, and retirement.  
    ```yaml
    name: Model Lifecycle
    on: [push]
    jobs:
      lifecycle:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make lifecycle
    ```
    ```makefile
    lifecycle:
    	python manage_lifecycle.py
    ```

123. **How do you create a workflow for multi-model deployment?**  
    Deploys multiple models.  
    ```yaml
    name: Multi-Model Deploy
    on: [push]
    jobs:
      multi:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make multi-deploy
    ```
    ```makefile
    multi-deploy:
    	python deploy_multi.py
    ```

124. **How do you automate model performance alerts?**  
    Sends alerts on metric drops.  
    ```yaml
    name: Performance Alerts
    on: [push]
    jobs:
      alert:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make alert
    ```
    ```makefile
    alert:
    	python alert_metrics.py
    ```

125. **How do you create a workflow for model experimentation?**  
    Runs experiments with different configs.  
    ```yaml
    name: Model Experiment
    on: [push]
    jobs:
      experiment:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make experiment
    ```
    ```makefile
    experiment:
    	python experiment.py
    ```

126. **How do you visualize advanced workflow performance?**  
    Tracks execution time.  
    ```yaml
    name: Advanced Workflow Perf
    on: [push]
    jobs:
      perf:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make perf
    ```
    ```makefile
    perf:
    	@time make run
    run:
    	python main.py
    ```

## Security & Best Practices

### Basic
127. **How do you secure GitHub Actions workflows?**  
    Uses secrets and permissions.  
    ```yaml
    name: Secure Workflow
    on: [push]
    permissions:
      contents: read
    jobs:
      secure:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure
            env:
              SECRET: ${{ secrets.MY_SECRET }}
    ```
    ```makefile
    secure:
    	@echo "Using $(SECRET)"
    ```

128. **How do you limit workflow permissions?**  
    Restricts access with `permissions`.  
    ```yaml
    name: Limit Permissions
    on: [push]
    permissions:
      contents: read
    jobs:
      limit:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make limit
    ```
    ```makefile
    limit:
    	@echo "Limited permissions"
    ```

129. **How do you use Dependabot with GitHub Actions?**  
    Updates dependencies.  
    ```yaml
    name: Dependabot
    on: [push]
    jobs:
      deps:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make update-deps
    ```
    ```makefile
    update-deps:
    	pip install -r requirements.txt
    ```

130. **How do you enforce code reviews in workflows?**  
    Requires PR approval.  
    ```yaml
    name: Code Review
    on:
      pull_request:
        branches: [main]
    jobs:
      review:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make check
    ```
    ```makefile
    check:
    	@echo "PR requires review"
    ```

131. **How do you validate workflow inputs?**  
    Checks `workflow_dispatch` inputs.  
    ```yaml
    name: Validate Inputs
    on:
      workflow_dispatch:
        inputs:
          env:
            required: true
    jobs:
      validate:
        runs-on: ubuntu最新
        steps:
          - uses: actions/checkout@v3
          - run: make validate
            env:
              ENV: ${{ github.event.inputs.env }}
    ```
    ```makefile
    validate:
    	@echo "Validating $(ENV)"
    ```

132. **How do you document workflows?**  
    Adds comments in YAML.  
    ```yaml
    name: Documented Workflow
    on: [push]
    jobs:
      doc:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          # Runs tests
          - run: make test
    ```
    ```makefile
    test:
    	python -m pytest
    ```

#### Intermediate
133. **How do you pin action versions?**  
    Uses specific versions for stability.  
    ```yaml
    name: Pin Actions
    on: [push]
    jobs:
      pin:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3.0.0
          - run: make run
    ```
    ```makefile
    run:
    	python main.py
    ```

134. **How do you audit workflow security?**  
    Checks for vulnerabilities.  
    ```yaml
    name: Audit Workflow
    on: [push]
    jobs:
      audit:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make audit
    ```
    ```makefile
    audit:
    	@echo "Auditing..."
    ```

135. **How do you handle secrets rotation?**  
    Updates secrets periodically.  
    ```yaml
    name: Secrets Rotation
    on: [push]
    jobs:
      rotate:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make rotate
            env:
              SECRET: ${{ secrets.MY_SECRET }}
    ```
    ```makefile
    rotate:
    	@echo "Rotating $(SECRET)"
    ```

136. **How do you enforce workflow best practices?**  
    Uses linters for YAML.  
    ```yaml
    name: Workflow Best Practices
    on: [push]
    jobs:
      best:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make lint-yaml
    ```
    ```makefile
    lint-yaml:
    	yamllint .github/workflows/*.yml
    ```

137. **How do you prevent workflow abuse?**  
    Limits runner usage.  
    ```yaml
    name: Prevent Abuse
    on: [push]
    jobs:
      limit:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make limit
    ```
    ```makefile
    limit:
    	@echo "Limiting usage"
    ```

138. **How do you monitor workflow security?**  
    Tracks suspicious activity.  
    ```yaml
    name: Monitor Security
    on: [push]
    jobs:
      monitor:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make monitor
    ```
    ```makefile
    monitor:
    	@echo "Monitoring..."
    ```

#### Advanced
139. **How do you create a secure multi-tenant workflow?**  
    Isolates tenant environments.  
    ```yaml
    name: Multi-Tenant Workflow
    on: [push]
    jobs:
      tenant:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make tenant
    ```
    ```makefile
    tenant:
    	python tenant_isolation.py
    ```

140. **How do you automate compliance checks in workflows?**  
    Runs compliance scripts.  
    ```yaml
    name: Compliance Checks
    on: [push]
    jobs:
      compliance:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make compliance
    ```
    ```makefile
    compliance:
    	python check_compliance.py
    ```

141. **How do you create a workflow for secrets encryption?**  
    Encrypts sensitive data.  
    ```yaml
    name: Secrets Encryption
    on: [push]
    jobs:
      encrypt:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make encrypt
    ```
    ```makefile
    encrypt:
    	python encrypt_secrets.py
    ```

142. **How do you enforce least privilege in workflows?**  
    Minimizes permissions.  
    ```yaml
    name: Least Privilege
    on: [push]
    permissions:
      contents: read
    jobs:
      privilege:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make privilege
    ```
    ```makefile
    privilege:
    	@echo "Minimal permissions"
    ```

143. **How do you create a workflow for audit logging?**  
    Logs all actions.  
    ```yaml
    name: Audit Logging
    on: [push]
    jobs:
      audit:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make audit
    ```
    ```makefile
    audit:
    	python log_audit.py
    ```

144. **How do you visualize security metrics?**  
    Tracks security check results.  
    ```yaml
    name: Security Metrics
    on: [push]
    jobs:
      metrics:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make metrics
    ```
    ```makefile
    metrics:
    	python security_metrics.py
    ```

145. **How do you create a workflow for dependency scanning?**  
    Uses `dependabot` or scanners.  
    ```yaml
    name: Dependency Scanning
    on: [push]
    jobs:
      scan:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make scan
    ```
    ```makefile
    scan:
    	python scan_deps.py
    ```

146. **How do you automate vulnerability remediation?**  
    Updates vulnerable packages.  
    ```yaml
    name: Vulnerability Remediation
    on: [push]
    jobs:
      remediate:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make remediate
    ```
    ```makefile
    remediate:
    	pip install --upgrade -r requirements.txt
    ```

147. **How do you create a workflow for secure model deployment?**  
    Encrypts model artifacts.  
    ```yaml
    name: Secure Model Deploy
    on: [push]
    jobs:
      secure:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-deploy
    ```
    ```makefile
    secure-deploy:
    	python deploy_secure.py
    ```

148. **How do you enforce compliance with ML regulations?**  
    Runs compliance checks.  
    ```yaml
    name: ML Compliance
    on: [push]
    jobs:
      compliance:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make ml-compliance
    ```
    ```makefile
    ml-compliance:
    	python check_ml_compliance.py
    ```

149. **How do you create a workflow for secure data handling?**  
    Encrypts sensitive data.  
    ```yaml
    name: Secure Data
    on: [push]
    jobs:
      data:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-data
    ```
    ```makefile
    secure-data:
    	python encrypt_data.py
    ```

150. **How do you automate security incident response?**  
    Triggers response scripts.  
    ```yaml
    name: Incident Response
    on: [push]
    jobs:
      response:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make respond
    ```
    ```makefile
    respond:
    	python incident_response.py
    ```

151. **How do you create a workflow for secure CI/CD pipelines?**  
    Combines security checks.  
    ```yaml
    name: Secure CI/CD
    on: [push]
    jobs:
      secure:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-ci
    ```
    ```makefile
    secure-ci:
    	python secure_pipeline.py
    ```

152. **How do you visualize compliance status?**  
    Tracks compliance metrics.  
    ```yaml
    name: Compliance Status
    on: [push]
    jobs:
      status:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make compliance-status
    ```
    ```makefile
    compliance-status:
    	python compliance_status.py
    ```

153. **How do you create a workflow for secure artifact storage?**  
    Encrypts and stores artifacts.  
    ```yaml
    name: Secure Artifacts
    on: [push]
    jobs:
      artifacts:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-artifacts
    ```
    ```makefile
    secure-artifacts:
    	python encrypt_artifacts.py
    ```

154. **How do you automate secure model versioning?**  
    Encrypts versioned models.  
    ```yaml
    name: Secure Versioning
    on: [push]
    jobs:
      version:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-version
    ```
    ```makefile
    secure-version:
    	python version_secure.py
    ```

155. **How do you create a workflow for secure data validation?**  
    Validates data securely.  
    ```yaml
    name: Secure Data Validation
    on: [push]
    jobs:
      validate:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-validate
    ```
    ```makefile
    secure-validate:
    	python validate_secure.py
    ```

156. **How do you enforce secure coding standards?**  
    Runs linters and scanners.  
    ```yaml
    name: Secure Coding
    on: [push]
    jobs:
      code:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-code
    ```
    ```makefile
    secure-code:
    	flake8 . && bandit -r .
    ```

157. **How do you create a workflow for secure model monitoring?**  
    Monitors models securely.  
    ```yaml
    name: Secure Monitoring
    on: [push]
    jobs:
      monitor:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-monitor
    ```
    ```makefile
    secure-monitor:
    	python monitor_secure.py
    ```

158. **How do you automate secure dependency management?**  
    Updates and scans dependencies.  
    ```yaml
    name: Secure Dependencies
    on: [push]
    jobs:
      deps:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-deps
    ```
    ```makefile
    secure-deps:
    	pip install --upgrade -r requirements.txt && safety check
    ```

159. **How do you create a workflow for secure model retraining?**  
    Retrains models securely.  
    ```yaml
    name: Secure Retraining
    on: [push]
    jobs:
      retrain:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v3
          - run: make secure-retrain
    ```
    ```makefile
    secure-retrain:
    	python retrain_secure.py
    ```

160. **How do you visualize security incident trends in GitHub Actions?**  
   Tracks and visualizes security incident metrics using a script.  
   ```yaml
   name: Incident Trends
   on: [push]
   jobs:
     trends:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make incident-trends
   ```
   ```makefile
   incident-trends:
   	python track_incidents.py
   ```

161. **How do you create a workflow for secure model evaluation?**  
   Runs secure evaluation with encrypted inputs.  
   ```yaml
   name: Secure Model Evaluation
   on: [push]
   jobs:
     evaluate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make secure-evaluate
           env:
             ENCRYPTED_DATA: ${{ secrets.ENCRYPTED_DATA }}
   ```
   ```makefile
   secure-evaluate:
   	python evaluate_secure.py --data $(ENCRYPTED_DATA)
   ```

162. **How do you automate secure model artifact signing?**  
   Signs model artifacts for integrity verification.  
   ```yaml
   name: Artifact Signing
   on: [push]
   jobs:
     sign:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make sign-artifact
   ```
   ```makefile
   sign-artifact:
   	python sign_artifact.py
   ```

163. **How do you create a workflow for secure data anonymization?**  
   Anonymizes sensitive data before processing.  
   ```yaml
   name: Data Anonymization
   on: [push]
   jobs:
     anonymize:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make anonymize-data
   ```
   ```makefile
   anonymize-data:
   	python anonymize_data.py
   ```

164. **How do you enforce secure workflow versioning?**  
   Tracks workflow versions for auditability.  
   ```yaml
   name: Workflow Versioning
   on: [push]
   jobs:
     version:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make version-workflow
           env:
             VERSION: 1.0.0
   ```
   ```makefile
   version-workflow:
   	python version_workflow.py --version $(VERSION)
   ```

165. **How do you create a workflow for secure model performance auditing?**  
   Audits model performance with secure logging.  
   ```yaml
   name: Performance Audit
   on: [push]
   jobs:
     audit:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make audit-performance
   ```
   ```makefile
   audit-performance:
   	python audit_performance.py
   ```

166. **How do you automate secure dependency auditing?**  
   Scans dependencies for vulnerabilities.  
   ```yaml
   name: Dependency Audit
   on: [push]
   jobs:
     audit:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make audit-deps
   ```
   ```makefile
   audit-deps:
   	safety check
   ```

167. **How do you create a workflow for secure model drift detection?**  
   Detects drift with encrypted data checks.  
   ```yaml
   name: Secure Drift Detection
   on: [push]
   jobs:
     drift:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make secure-drift
   ```
   ```makefile
   secure-drift:
   	python detect_drift_secure.py
   ```

168. **How do you enforce secure workflow execution isolation?**  
   Runs workflows in isolated environments.  
   ```yaml
   name: Workflow Isolation
   on: [push]
   jobs:
     isolate:
       runs-on: ubuntu-latest
       container: python:3.9
       steps:
         - uses: actions/checkout@v3
         - run: make isolate
   ```
   ```makefile
   isolate:
   	python run_isolated.py
   ```

169. **How do you create a workflow for secure compliance reporting?**  
   Generates compliance reports securely.  
   ```yaml
   name: Compliance Reporting
   on: [push]
   jobs:
     report:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make compliance-report
   ```
   ```makefile
   compliance-report:
   	python generate_compliance_report.py
   ```

170. **How do you automate secure model lifecycle management?**  
   Manages model lifecycle with secure transitions.  
   ```yaml
   name: Secure Model Lifecycle
   on: [push]
   jobs:
     lifecycle:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - run: make secure-lifecycle
   ```
   ```makefile
   secure-lifecycle:
   	python manage_lifecycle_secure.py
   ```