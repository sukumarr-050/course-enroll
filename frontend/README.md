# CourseHub Frontend

React + Tailwind + Framer Motion frontend connected to the CourseHub backend.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

3. Run the frontend:

```bash
npm run dev
```

## Connect with Backend (Local)

Backend `.env` should include:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173,http://127.0.0.1:5173
```

Then run backend and frontend together:

- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

## Production URLs

When deployed:

- `VITE_API_URL=https://<your-render-domain>/api`
- `VITE_SOCKET_URL=https://<your-render-domain>`
- Backend `CLIENT_URLS=https://<your-vercel-domain>`
