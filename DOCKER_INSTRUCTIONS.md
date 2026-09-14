# Docker Instructions

This guide explains how to run the project using Docker. This ensures that the application runs consistently across different devices without needing to manually install Node.js versions or dependencies.

## Prerequisites

- **Docker Desktop**: Download and install from [docker.com](https://www.docker.com/products/docker-desktop).
- **Git** (Optional): To clone the repository if you haven't already.

## Quick Start

1.  **Open Terminal** (or Command Prompt/PowerShell) and navigate to the project directory:

    ```bash
    cd path/to/squadcart-themes
    ```

2.  **Run the Application**:
    Execute the following command to build and start the container:

    ```bash
    docker-compose up --build
    ```

    - The `--build` flag ensures that the image is rebuilt with any new changes.
    - You will see logs appearing in the terminal.

3.  **Access the App**:
    Open your browser and go to:
    [http://localhost:3000](http://localhost:3000)

4.  **Stop the App**:
    Press `Ctrl+C` in the terminal to stop the running container.
    To remove the containers entirely, run:
    ```bash
    docker-compose down
    ```

## Troubleshooting

- **Port Conflicts**: If port 3000 is already in use, you can change the mapping in `docker-compose.yml`:

  ```yaml
  ports:
    - "3001:3000" # Maps host port 3001 to container port 3000
  ```

  Then access at [http://localhost:3001](http://localhost:3001).

- **Rebuild**: If you make changes to `package.json` or the code and they don't appear, force a rebuild:

  ```bash
  docker-compose up --build --force-recreate
  ```

- **Slow Build on Windows**: The `npm ci` step (installing dependencies) might take several minutes to complete on Windows due to file system differences. **Please be patient and let it finish.**
