# API Documentation

Base URL: `http://localhost:5000/api`

## Auth

- `POST /auth/register`
  - body: `{ "name": "John", "email": "john@example.com", "password": "User@123" }`
- `POST /auth/login`
  - body: `{ "email": "john@example.com", "password": "User@123" }`
- `GET /auth/me` (protected)

## Courses

- `GET /courses`
- `GET /courses/:id`
- `POST /courses` (admin)
  - body: `{ "title": "...", "description": "...", "videoUrl": "...", "price": 49 }`
- `DELETE /courses/:id` (admin)

## Enrollments

- `POST /enrollments` (protected)
  - body: `{ "courseId": "<courseId>" }`
- `GET /enrollments/me` (protected)

## Progress

- `PUT /progress` (protected)
  - body: `{ "courseId": "<courseId>", "percentage": 55 }`
- `GET /progress/me` (protected)
- `GET /progress/course/:id` (admin)

## Notifications

- `GET /notifications/me` (protected)
- `PATCH /notifications/:id/read` (protected)

## AI

- `POST /ai/chatbot` (protected)
  - body: `{ "message": "Suggest what to learn after React basics" }`
- `GET /ai/recommendations` (protected)

## Payments

- `POST /payments/checkout-session` (protected)
  - body: `{ "courseId": "<courseId>" }`
- `POST /payments/webhook` (Stripe webhook endpoint)

## Admin

- `GET /admin/stats` (admin)
- `GET /admin/users` (admin)
- `DELETE /admin/users/:id` (admin)

## Chat

- `GET /chat/conversation/:userId` (protected)

## Socket.IO Events

- Client -> Server:
  - `join:user` with `userId`
  - `chat:send` with `{ senderId, receiverId, message }`
- Server -> Client:
  - `chat:receive`
  - `chat:sent`
  - `notification:new`
