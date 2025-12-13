# PixCraft AI - Intelligent Creative Generation Platform

A complete full-stack AI-powered creative generation platform for retailers and brands to create professional marketing creatives.

## 🚀 Features

- **AI Image Generation** (Gemini API)
- **AI Image Editor** (Canva API + Gemini Vision)
- **Authentication System** (JWT + bcrypt)
- **User Dashboard**
- **Favorites Management**
- **Admin Panel**
- **Profile Settings**
- **Role-based Access Control**

## 📁 Project Structure

```
pixcraft-ai/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB
- Gemini API Key
- Canva API Key
- Cloudinary Account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`

5. Start the server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`

5. Start the development server:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## 🔑 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pixcraft
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
GEMINI_API_KEY=your_gemini_api_key
CANVA_API_KEY=your_canva_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 👤 Default Admin Account

After first run, create admin user via MongoDB or registration, then update role to 'admin':

```javascript
db.users.updateOne(
  { email: "admin@pixcraft.ai" },
  { $set: { role: "admin" } }
)
```

## 🎨 Tech Stack

### Frontend
- React 18 + TypeScript
- React Router v6
- Axios
- Framer Motion
- React Hot Toast
- TailwindCSS

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- express-validator
- Cloudinary
- Gemini AI API
- Canva API

## 📝 API Endpoints

### Auth
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout user

### AI
- POST `/api/ai/generate` - Generate AI images
- POST `/api/ai/edit` - Edit images with AI

### User
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile
- PUT `/api/users/password` - Change password

### Favorites
- GET `/api/favorites` - Get user favorites
- POST `/api/favorites` - Add to favorites
- DELETE `/api/favorites/:id` - Remove from favorites

### Admin
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id` - Update user
- DELETE `/api/admin/users/:id` - Delete user
- GET `/api/admin/stats` - Get system stats
- GET `/api/admin/logs` - Get AI usage logs

## 🔒 Security Features

- JWT token authentication (7-day expiry)
- Password hashing with bcrypt
- Role-based access control
- Protected routes
- Input validation
- CORS configuration
- Rate limiting ready

## 📄 License

MIT License

## 🤝 Support

For support, email support@pixcraft.ai
