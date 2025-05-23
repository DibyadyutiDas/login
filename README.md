# Secure Authentication System

A full-stack authentication system with React, Node.js, Express, and MongoDB.

## Features

- User registration & login via email/password
- Password hashing with bcrypt
- JWT token authentication with "Remember Me" support
- Forgot password flow via email
- Reset password via secure token link
- Protected routes (JWT-based)
- Ready for OAuth integration (Google, GitHub)

## Project Structure

```
auth-app/
├── backend/               # Node.js + Express backend
│   ├── controllers/       # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   ├── utils/             # Utility functions
│   ├── .env               # Environment variables (create from .env.example)
│   ├── package.json       # Backend dependencies
│   └── server.js          # Express server setup
├── frontend/              # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── context/       # React context (auth)
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Main App component
│   │   └── main.tsx       # Entry point
│   ├── .env               # Environment variables (create from .env.example)
│   └── package.json       # Frontend dependencies
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your MongoDB connection string and other environment variables.

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set the API URL.

4. Start the development server:
   ```
   npm run dev
   ```

## Deployment

### Backend Deployment (Render.com)

1. Create a new Web Service on Render.com
2. Connect your GitHub repository
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables from your `.env` file

### Frontend Deployment (GitHub Pages)

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Build the project: `npm run build`
3. Deploy to GitHub Pages: `npm run deploy`

## Security Features

- Password hashing with bcrypt
- JWT for stateless authentication
- Rate limiting to prevent brute force attacks
- CORS protection
- XSS protection
- NoSQL injection protection
- Secure HTTP headers with Helmet
- Environment variables for sensitive information

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password with token
- `GET /api/auth/me` - Get current user (protected)
- `PATCH /api/auth/update-password` - Update password (protected)