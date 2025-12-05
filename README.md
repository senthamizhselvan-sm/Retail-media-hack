<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# Retail Application - Full Stack Authentication

A complete full-stack application with Next.js frontend and Node.js backend featuring user authentication with MongoDB.

## Project Structure

```
retail/
├── backend/                 # Node.js Express backend
│   ├── models/
│   │   └── User.js         # User model with MongoDB schema
│   ├── routes/
│   │   └── auth.js         # Authentication routes
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env                # Environment variables
└── frontend/
    └── Retail-hack-frontend/  # Next.js frontend
        ├── src/
        │   ├── app/
        │   │   ├── (auth)/
        │   │   │   ├── login/
        │   │   │   └── signup/
        │   │   └── layout.tsx
        │   └── lib/
        │       └── api/
        │           ├── index.ts    # API configuration
        │           └── auth.ts     # Auth API functions
        ├── package.json
        └── .env.local          # Frontend environment variables
```

## Features

- **User Authentication**: Complete registration and login system
- **Password Security**: bcrypt hashing for password protection
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Server-side validation with express-validator
- **Error Handling**: Comprehensive error handling and user feedback
- **Toast Notifications**: Real-time feedback for user actions
- **Responsive Design**: Mobile-friendly authentication pages

## Prerequisites

Before running this application, make sure you have installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) running on localhost:27017
- npm or yarn package manager

## Installation & Setup

### 1. Clone and Navigate to Project
```bash
cd e:/retail
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables (already created)
# Edit .env file if needed to customize JWT_SECRET

# Start the backend server
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Setup Frontend

Open a new terminal and run:

```bash
# Navigate to frontend directory
cd frontend/Retail-hack-frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 4. Setup MongoDB

Make sure MongoDB is running on your local machine:

```bash
# Start MongoDB service (Windows)
mongod

# Or if you have MongoDB as a Windows service
net start MongoDB
```

The application will automatically create a database called `retail-app`.

## API Endpoints

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/logout` - Logout user (protected)

### Request/Response Examples

**Register User:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "isActive": true
    }
  }
}
```

**Login User:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/retail-app
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

1. **Start MongoDB** (if not running as a service)
2. **Start Backend**: `cd backend && npm run dev`
3. **Start Frontend**: `cd frontend/Retail-hack-frontend && npm run dev`
4. **Access Application**: Open `http://localhost:3000` in your browser

## Usage

1. **Register**: Go to `http://localhost:3000/signup` to create a new account
2. **Login**: Go to `http://localhost:3000/login` to sign in
3. **Navigate**: After successful authentication, you'll be redirected to the home page

## Features Included

- ✅ User Registration with validation
- ✅ User Login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Protected routes with middleware
- ✅ Error handling and validation
- ✅ Toast notifications
- ✅ Responsive design
- ✅ API integration
- ✅ Token storage in localStorage
- ✅ Automatic token refresh on requests

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT token generation
- **express-validator** - Input validation
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Tailwind CSS** - Styling (configured)
- **React** - UI library

## Database Schema

### User Model
```javascript
{
  name: String (required, min: 2 chars),
  email: String (required, unique, valid email),
  password: String (required, min: 6 chars, hashed),
  role: String (enum: ['user', 'admin'], default: 'user'),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Password hashing with bcrypt (10 rounds)
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- CORS configuration
- Environment variables for sensitive data

## Development Notes

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB connection on localhost:27017
- JWT tokens expire in 7 days
- Automatic API error handling with interceptors

## Troubleshooting

**Common Issues:**

1. **MongoDB Connection Error**: Ensure MongoDB is running on localhost:27017
2. **Port Already in Use**: Change ports in environment variables
3. **CORS Issues**: Check if backend CORS is configured for frontend URL
4. **JWT Token Issues**: Verify JWT_SECRET is set in backend .env

## Next Steps

You can extend this application by adding:
- Password reset functionality
- Email verification
- User profile management
- Role-based access control
- OAuth integration (Google, Facebook)
- User dashboard
- Admin panel
>>>>>>> f2daaffbd2d36cf270061d650812ae37fc8e4a88
