#!/bin/sh

# Main Learning Points: Creating Custom Actions (Entrypoint Script)
# This script runs inside the Docker container and prints the greeting.

# The argument passed to the Docker container
GREETING="$1"

echo "$GREETING"

# Place this file in the same directory as action.yml (e.g., .github/actions/custom-greeting/entrypoint.sh)