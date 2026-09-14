# Chitrokormo Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

You can run this project either **locally** or using **Docker**.

### Method 1: Docker (Recommended)

Run the project effortlessly without manual dependency installation.

1.  **Prerequisites**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop).
2.  **Run**:
    ```bash
    docker-compose up --build
    ```
3.  **Access**: Open [http://localhost:3000](http://localhost:3000).

👉 For detailed Docker instructions and troubleshooting, see [DOCKER_INSTRUCTIONS.md](./DOCKER_INSTRUCTIONS.md).

---

### Method 2: Local Development

If you prefer running it natively on your machine:

1.  **Prerequisites**:
    - Node.js (v22 LTS recommended)
    - npm

2.  **Install Dependencies**:

    ```bash
    npm ci
    ```

    > **Note**: Use `npm ci` to ensure you get the exact dependencies from `package-lock.json`.

3.  **Run Development Server**:

    ```bash
    npm run dev -- --turbo
    ```

    > **Important**: You **MUST** use the `--turbo` flag. Standard `npm run dev` (Webpack) currently fails due to CSS parsing issues with `animate.css`. Turbopack handles this correctly.

4.  **Access**: Open [http://localhost:3000](http://localhost:3000).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
