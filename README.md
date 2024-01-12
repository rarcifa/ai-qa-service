# AI Chatbot Service Documentation

![Version Badge](https://img.shields.io/badge/Version-v1.0.0-blue)
![Version Badge](https://img.shields.io/badge/Node-v18.0.0-yellow)
![Version Badge](https://img.shields.io/badge/NPM-v9.4.0-red)

## Overview

The AI Chatbot Service is a Node.js TypeScript application designed to host chatbot services utilizing the LangChain library and OpenAI integrations. This document provides detailed instructions on setting up, configuring, and running the service, including Docker containerization and security key generation.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up the Project](#setting-up-the-project)
3. [Running the Service](#running-the-service)
4. [Docker Setup](#docker-setup)
5. [Generating Security Keys](#generating-security-keys)
6. [Environment Variables](#environment-variables)
7. [Local Document Context](#local-document-context)
8. [Endpoints](#endpoints)
9. [VS Code Configuration](#vs-code-configuration)
10. [Testing](#testing)
11. [Links of Interest](#links-of-interest)

### Prerequisites

- Node.js v18.0.0 or later
- npm v9.4.0 or later
- Docker (for containerization)
- TypeScript knowledge (for development)

### Setting Up the Project

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies:

```bash
npm install
```

### Running the Service

1. Compile TypeScript files to JavaScript:

```bash
npm run build
```

2. Run the service in development mode:

```bash
npm run dev
```

### Docker

1. Build the Docker image using the provided Dockerfile:

```bash
docker build -f .docker/build.dockerfile -t ai-chatbot-service .
```

2. Run the service using Docker:

```bash
docker run -it --init \
  -e DB_HOST=your_db_host \
  -e DB_NAME=your_db_name \
  -e DB_USERNAME=your_db_username \
  -e DB_PASSWORD=your_db_password \
  -e NODE_ENV=your_node_env \
  -e OPENAI_API_KEY=your_openai_api_key \
  -e CHATBOT_READ_API_KEY=your_chatbot_read_api_key \
  -e CHATBOT_READ_API_SECRET=your_chatbot_read_api_secret \
  -e CHATBOT_WRITE_API_KEY=your_chatbot_write_api_key \
  -e CHATBOT_WRITE_API_SECRET=your_chatbot_write_api_secret \
  ai-chatbot-service
```

### Generating Security Keys

The `security` module in the application provides functions for generating secure API keys and secrets. It uses cryptographic functions for enhanced security.

1. To generate an API key:

```ts
const apiKey = security.generateApiKey();
```

2. To generate an API secret for a given key:

```ts
const apiSecret = security.generateApiSecret('your-key');
```

### Environment Variables

Set the following environment variables in a `.env` file:

- `DB_HOST`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD` for database configuration.
- `NODE_ENV` for setting the environment (development, production, etc.).
- `OPENAI_API_KEY` for OpenAI integration.
- `CHATBOT_READ_API_KEY`, `CHATBOT_READ_API_SECRET`, `CHATBOT_WRITE_API_KEY`, `CHATBOT_WRITE_API_SECRET` for chatbot service authentication. These keys can be generated with the previous functions (e.g. apiKey, apiSecret).

### Local Document Context

To provide contextual information to the LangChain library, you can place `.txt` or `.json` files in the `src/integrations/docs` folder. The content of these files will be used to create local vectors for enhanced chatbot responses.

- Utilize the createLoader function in LangChain to load these documents:

```ts
createLoader: (): DirectoryLoader => {
  return new DirectoryLoader('./src/integrations/docs', {
    '.json': (path) => new JSONLoader(path),
    '.txt': (path) => new TextLoader(path),
  });
};
```

### Endpoints

The service exposes various endpoints for chatbot interactions:

1. Health Check:

```bash
GET /healthcheck
```

2. Generate Query:

```bash
POST /api/v1/chatbot-service/generate/query
```

- Body example for POST request:

```bash
{
  "query": "Help me to get started with the cronos chain..."
}
```

### VS Code Configuration

For auto-formatting in VS Code, add the following settings to `.vscode/settings.json`:

```bash
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "prettier.printWidth": 120
}
```

### Testing

Run the test suite with the following command:

```bash
npm run test
```

### Links of interest

- [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Jest extension](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
