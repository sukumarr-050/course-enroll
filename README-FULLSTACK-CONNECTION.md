# Fullstack Connection Guide (Backend + Frontend)

This project is split into:

- `backend` (Express API + Socket.IO + Stripe + OpenAI)
- `frontend` (React + Tailwind + animations)

## 1) Configure Backend

In `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CLIENT_URLS=http://localhost:5173,http://127.0.0.1:5173
OPENAI_API_KEY=<your_openai_key>
OPENAI_MODEL=gpt-4o-mini
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_WEBHOOK_SECRET=<your_webhook_secret>
```

## 2) Configure Frontend

In `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 3) Start Both Apps

Open two terminals:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and calls backend on `http://localhost:5000/api`.

## 4) Verify Connection

1. Open frontend and register/login.
2. Courses page should load from backend (`GET /api/courses`).
3. Enroll in free course and check notification bell updates.
4. Open chat widget and send messages using another user ID.
5. For paid course checkout, Stripe should return to `/payment-success` or `/payment-cancel`.
