# Course Enrollment and Progress Tracking Backend

Production-ready backend built with Node.js, Express.js, MongoDB (Mongoose), JWT auth, Socket.IO, Stripe payments, and OpenAI integration.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication + Role-based access
- Socket.IO for real-time chat/notifications
- Stripe Checkout + Webhooks
- OpenAI API for chatbot and recommendations

## Folder Structure

```text
backend/
  docs/
    API.md
  src/
    config/
      db.js
      openai.js
      stripe.js
    controllers/
      adminController.js
      aiController.js
      authController.js
      chatController.js
      courseController.js
      enrollmentController.js
      notificationController.js
      paymentController.js
      progressController.js
    middleware/
      authMiddleware.js
      errorMiddleware.js
    models/
      ChatMessage.js
      Course.js
      Enrollment.js
      Notification.js
      Progress.js
      User.js
    routes/
      adminRoutes.js
      aiRoutes.js
      authRoutes.js
      chatRoutes.js
      courseRoutes.js
      enrollmentRoutes.js
      notificationRoutes.js
      paymentRoutes.js
      progressRoutes.js
    scripts/
      seed.js
    services/
      socket.js
    utils/
      generateToken.js
    app.js
    server.js
  .env.example
  package.json
```

## Features Included

- JWT Register/Login and protected routes
- Role-based authorization (`admin`, `user`)
- Course CRUD (create/delete/view)
- Enrollment flow with paid/free course handling
- Progress tracking with percentage updates
- Notifications (stored in DB + real-time Socket.IO events)
- User-to-user real-time chat
- Stripe checkout and webhook handling
- OpenAI chatbot endpoint
- OpenAI personalized recommendation endpoint
- Admin analytics (`usersCount`, `coursesCount`, `avgProgress`)

## Setup Commands

```bash
npm install
cp .env.example .env
npm run dev
```

Seed test data:

```bash
npm run seed
```

## Environment Variables

Create `.env` from `.env.example` and configure:

- `PORT`
- `NODE_ENV`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Local Run

1. Start backend: `npm run dev`
2. Health check: `GET http://localhost:5000/api/health`
3. Use API endpoints from `docs/API.md`

## Sample Test Data

Inserted by `npm run seed`:

- Admin: `admin@example.com` / `Admin@123`
- User: `john@example.com` / `User@123`
- Courses:
  - React for Beginners (paid)
  - Node.js API Masterclass (free)
- One initial enrollment and progress record

## Deployment

### 1) MongoDB Atlas

1. Create Atlas project and cluster.
2. Create DB user and whitelist IP (`0.0.0.0/0` for testing, restricted IPs for production).
3. Copy connection string and set as `MONGODB_URI`.

### 2) Backend on Render

1. Push backend code to GitHub repository.
2. In Render, create a **Web Service** from the repo.
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add env vars from `.env.example`.
5. Set `CLIENT_URL` to deployed frontend URL.
6. Add Stripe webhook endpoint:
   - `https://<render-service>/api/payments/webhook`
7. Deploy and verify `/api/health`.

### 3) Frontend on Vercel (connection guide)

In your frontend `.env`:

- `VITE_API_URL=https://<render-service>/api`

Ensure CORS `CLIENT_URL` on backend matches your Vercel domain.

### 4) Expo Mobile App (connection guide)

In Expo app config:

- `EXPO_PUBLIC_API_URL=https://<render-service>/api`

Use this URL for auth/course/video APIs from mobile app.

## Stripe Notes

- For local webhook testing use Stripe CLI:
  - `stripe listen --forward-to localhost:5000/api/payments/webhook`
- Copy webhook secret to `STRIPE_WEBHOOK_SECRET`.

## Security/Production Notes

- Use strong `JWT_SECRET`.
- Restrict CORS origin to exact frontend domains.
- Use HTTPS in production.
- Add request rate limiting and input validation for hardening.

## API Reference

Full endpoint reference is available in `docs/API.md`.
