# Main Learning Points: Creating Custom Actions (Dockerfile)
# This Dockerfile defines the container for the custom action.

FROM alpine:latest

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh

# Make the script executable
RUN chmod +x /entrypoint.sh

# Define the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Place this file in the same directory as action.yml (e.g., .github/actions/custom-greeting/Dockerfile)