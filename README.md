# ThinkStorm

Frontend for the ThinkStorm Project.

## Installation

Install the necessary dependencies:

```bash
npm install
```

## Initial Setup for Local Development

1. **Create a `.env.local` file:**

   Before starting the project, create a `.env.local` file in the root directory of the project.

   ```bash
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
   ```

   The `NEXT_PUBLIC_API_BASE_URL` is used to define the base URL for the API. Update this URL according to your local development environment.

2. **Start the development server:**

   After setting up the `.env.local` file, start the development server with the following command:

   ```bash
   npm run dev
   ```

   This will start the project locally.

   - By default, you can access the frontend in your browser at `http://localhost:3000`.
   - If you configure a different port for your development server, update the URL accordingly in the `.env.local` file.
