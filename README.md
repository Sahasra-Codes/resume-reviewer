# Resume Reviewer

A React frontend powered by Vite and a Node.js / Express backend.

## Requirements

Node.js 22.12+ and npm.

## Get started

```sh
npm install
npm run dev
```

Frontend: http://localhost:5173

Backend: http://localhost:3001/api/health

On Windows, use `npm.cmd` if PowerShell blocks `npm.ps1`.

## Structure

```text
frontend/
  src/App.jsx       React application
  src/main.jsx      Entry point
  src/index.css     Styles
  vite.config.js    Development API proxy
backend/
  src/app.js        Express application and routes
  src/server.js     Server entry point
  .env.example      Environment variable template
```

The frontend forwards `/api` requests to the backend during development. To configure the backend, copy `backend/.env.example` to `backend/.env`. If you change the backend port, update the proxy in `frontend/vite.config.js` too.

## Commands

- `npm run dev`: run both development servers.
- `npm run build`: build the frontend into `frontend/dist`.
- `npm start`: run the backend.
- `npm run preview --workspace frontend`: preview the frontend build locally (API proxy is development-only).

For deployment, host `frontend/dist` as static files and route `/api` requests to the backend.
