# Credit Card Application

## How to Run Manually

### 1. Server

The server handles the backend logic and API.

1.  Open a terminal.
2.  Navigate to the `server` folder:
    ```bash
    cd server
    ```
3.  Install dependencies (first time only):
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The server usually runs on `http://localhost:3001`.

### 2. Client

The client is the React frontend application.

1.  Open a **new** terminal window (keep the server running).
2.  Navigate to the `client` folder:
    ```bash
    cd client
    ```
3.  Install dependencies (first time only):
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The client usually runs on `http://localhost:5173`.

## Notes

- Ensure you have `Node.js` installed.
- If you see port conflicts (e.g., "EADDRINUSE"), make sure no other instances of the app are running.
