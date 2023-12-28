# Backend Local Setup

## Prerequisites

Before setting up the local environment for the backend, ensure that you have the following prerequisites installed:

- **Node.js 16+**: Make sure you have Node.js installed. You can download it from [https://nodejs.org/](https://nodejs.org/).

- **Serverless Framework**: Install the Serverless Framework globally using the following command:

  ```bash
  npm install -g serverless
  ```

- **Docker**: Make sure Docker is installed on your machine. You can download it from [https://www.docker.com/](https://www.docker.com/).

## Configuration

Before running the backend, create an environment file (` .env`) in the root directory with the necessary configuration variables. Example:

```env
OPENSEA_API_KEY=
CHAIN=ethereum
```

Make sure to replace `OPENSEA_API_KEY` with your actual OpenSea API key.

## Local Setup

To set up the local environment, follow these steps:

1. **Run Setup Script:**

   Execute the following command to run the setup script:

   ```bash
   sh localSetup.sh
   ```

2. **Start the Backend:**

   Start the backend using the following command:

   ```bash
   npm start
   ```

The backend is now running locally with the specified configurations. You can access it at [http://localhost:your_port](http://localhost:your_port).

Feel free to reach out if you encounter any issues or have further questions!
