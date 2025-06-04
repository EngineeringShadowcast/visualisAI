# Use official Node.js image
FROM node:18.16.0

# Set the working directory inside the container
WORKDIR /Sheepdog-therapeutics

# Copy package.json to the working directory and install dependencies
COPY package.json ./
RUN npm install

# Copy all the other files
COPY . .

# Install the AWS CLI to interact with AWS Secrets Manager
RUN apt-get update && apt-get install -y awscli

# Accept build arguments for AWS credentials and ENV_IDENTIFIER
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_DEFAULT_REGION
ARG ENV_IDENTIFIER

# Set environment variables based on the passed build arguments
ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION
ENV ENV_IDENTIFIER=$ENV_IDENTIFIER

# Add the main script that fetches secrets, starts the app, and deletes itself
RUN echo '#!/bin/bash\n\
# Fetch secrets from AWS Secrets Manager\n\
SECRETS=$(aws secretsmanager get-secret-value --secret-id $ENV_IDENTIFIER --query SecretString --output text)\n\
# Create a .env file from the fetched secrets\n\
echo "$SECRETS" > .env\n\
# Start the application in the background\n\
npm start &\n\
# Self-delete the start-app.sh script after execution\n\
rm -- \"$0\"\n' > start-app.sh && chmod +x start-app.sh

# Add the clean-up script that deletes the .env and Dockerfile after the app starts
RUN echo '#!/bin/bash\n\
# Wait for the application to start\n\
sleep 10\n\
# Clean up the .env file and Dockerfile\n\
rm -f .env\n\
rm -f Dockerfile\n\
rm -f start-app.sh\n' > clean-up.sh && chmod +x clean-up.sh

# Start the application and clean-up scripts, then keep the container alive
CMD ["bash", "-c", "./start-app.sh & ./clean-up.sh & tail -f /dev/null"]
