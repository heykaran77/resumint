# 🚀 Vercel Deployment Guide: MERN Stack Monorepo

## Successfully Deploying Frontend + Backend in a Single Vercel Project

This guide documents the exact process used to successfully deploy a **MERN monorepo** (both React frontend and Express backend) on Vercel as a single project.

---

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Step-by-Step Setup](#step-by-step-setup)
3. [Configuration Files](#configuration-files)
4. [Environment Variables](#environment-variables)
5. [Deployment Process](#deployment-process)
6. [Troubleshooting](#troubleshooting)
7. [Key Learnings](#key-learnings)

---

## 🏗️ Project Structure

The monorepo structure is organized as follows:

```
resume-builder/
├── api/                          # Vercel API routes (serverless functions)
│   └── index.js                 # Express app handler
├── client/                       # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── configs/
│   │       └── api.js           # API client configuration
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── server/                       # Express Backend
│   ├── server.js                # Main Express app
│   ├── package.json
│   ├── configs/
│   │   ├── db.js               # MongoDB connection
│   │   ├── ai.js
│   │   └── imageKit.js
│   ├── controllers/            # Business logic
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API routes
│   └── middlewares/            # Custom middleware
├── package.json                # Root package.json
├── vercel.json                 # Vercel configuration
└── README.md
```

---

## 📝 Step-by-Step Setup

### Step 1: Create Root Package.json

Create a `package.json` at the project root to help Vercel understand the project structure:

```json
{
  "name": "resume-builder",
  "version": "1.0.0",
  "description": "A full-stack MERN resume builder application",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "concurrently \"npm --prefix client run dev\" \"npm --prefix server run server\"",
    "build": "npm --prefix client run build",
    "start": "npm --prefix server start"
  },
  "keywords": ["resume", "builder", "MERN"],
  "author": "Your Name",
  "license": "ISC",
  "devDependencies": {
    "concurrently": "^9.1.2"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

**Purpose:** Tells Vercel how to run build and start commands for the monorepo.

---

### Step 2: Configure Vercel.json

Create `vercel.json` at the project root:

```json
{
  "buildCommand": "npm --prefix client run build",
  "outputDirectory": "client/dist",
  "installCommand": "npm install && npm --prefix server install"
}
```

**Key Configuration:**

- `buildCommand`: Builds only the frontend (React with Vite)
- `outputDirectory`: Points to the client's build output
- `installCommand`: Installs dependencies for both root, client, and server

---

### Step 3: Create API Handler

Create `api/index.js` to connect the Express backend:

```javascript
import app from "../server/server.js";

export default app;
```

**Purpose:** Vercel automatically routes `/api/*` requests to this handler, which delegates to your Express app.

---

### Step 4: Configure Express Server

Update `server/server.js` to export the Express app:

```javascript
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL || "https://your-frontend.vercel.app",
];

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// For local development only
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
  });
}

export default app;
```

**Important Points:**

- Uses `await connectDB()` at the top level
- Exports the app for Vercel serverless functions
- Only listens on a port in development mode
- CORS includes the frontend URL from environment variables

---

### Step 5: Configure Frontend API Client

Update `client/src/configs/api.js` to use correct API endpoints:

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || `${window.location.origin}/api`,
});

export default api;
```

**Key Points:**

- Uses `VITE_API_URL` environment variable in production
- Falls back to same origin (`/api`) for dynamic deployments
- Uses Axios for all API calls

---

### Step 6: Case-Sensitive Import Paths

Ensure all imports use correct file casing. Linux (Vercel's OS) is case-sensitive:

```javascript
// ✅ Correct (if file is UserController.js)
import { registerUser } from "../controllers/UserController.js";

// ❌ Wrong (will fail on Vercel)
import { registerUser } from "../controllers/userController.js";
```

---

## ⚙️ Configuration Files

### vercel.json

```json
{
  "buildCommand": "npm --prefix client run build",
  "outputDirectory": "client/dist",
  "installCommand": "npm install && npm --prefix server install"
}
```

### package.json (Root)

Minimal setup with dev/build scripts for local development.

### client/package.json

Standard Vite + React setup:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### server/package.json

Node.js/Express setup:

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  }
}
```

---

## 🔐 Environment Variables

### In Vercel Dashboard

Go to **Project Settings → Environment Variables** and add:

| Variable | Value | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Your MongoDB Atlas URL | Database connection |
| `JWT_SECRET` | Your secret key | JWT token signing |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | Image management |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key | Client-side image uploads |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit endpoint | Image serving |
| `OPENAI_API_KEY` | Your OpenAI API key | AI features |
| `FRONTEND_URL` | `https://your-app.vercel.app` | CORS configuration |
| `NODE_ENV` | `production` | Environment flag |

### In Local Development

Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
IMAGEKIT_PRIVATE_KEY=xxx
IMAGEKIT_PUBLIC_KEY=xxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/xxx
OPENAI_API_KEY=sk-xxx
NODE_ENV=development
```

---

## 🚀 Deployment Process

### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Project

In the import dialog:

- **Framework Preset:** Other
- **Root Directory:** `.` (leave as is)
- **Build Command:** Keep default (uses vercel.json)
- **Output Directory:** Keep default (uses vercel.json)

### Step 4: Add Environment Variables

1. Click "Environment Variables"
2. Add all variables from the table above
3. Click "Deploy"

### Step 5: Monitor Build

1. Vercel will start building
2. Watch the build logs for errors
3. Once complete, you'll get a deployment URL

### Step 6: Verify Deployment

1. Visit your Vercel URL
2. Test frontend: Should load the React app
3. Test backend: Try making an API request from the browser console:
   ```javascript
   fetch("/api/health")
     .then((r) => r.json())
     .then(console.log);
   ```

---

## 🐛 Troubleshooting

### Issue: Module Not Found

**Error:** `Cannot find module '/var/task/server/controllers/userController.js'`

**Solution:** Check file casing. Linux is case-sensitive:

- ✅ `UserController.js` (Correct)
- ❌ `userController.js` (Wrong if file is capitalized)

### Issue: Double /api in URLs

**Error:** Requests going to `/api/api/users`

**Solution:** In `api.js`, use correct base URL:

```javascript
baseURL: import.meta.env.VITE_API_URL || `${window.location.origin}/api`;
```

### Issue: CORS Errors

**Error:** `Access-Control-Allow-Origin` missing

**Solution:** Ensure `FRONTEND_URL` is set in Vercel environment variables and matches your actual deployment URL.

### Issue: Database Connection Fails

**Error:** `MONGODB_URI env variable not set`

**Solution:**

1. Verify `MONGODB_URI` is in Vercel environment variables
2. Check MongoDB IP whitelist (allow 0.0.0.0 or Vercel's IPs)
3. Verify database user credentials

### Issue: 500 Internal Server Error

**Solution:**

1. Check Vercel function logs
2. Verify all required environment variables are set
3. Check for unhandled promise rejections in server code

---

## 🎓 Key Learnings

### 1. **Monorepo Structure**

- Root `package.json` helps Vercel coordinate builds
- `vercel.json` tells Vercel how to build each part
- `/api` folder is special in Vercel for serverless functions

### 2. **Build vs Runtime**

- Build: Vite compiles React to static files
- Runtime: Vercel routes `/api/*` to Express serverless functions
- Frontend served as static assets, backend as functions

### 3. **Case Sensitivity**

- Windows: Case-insensitive file system
- Linux/Vercel: Case-sensitive
- Always match exact file names in imports

### 4. **CORS Configuration**

- Both frontend and backend need to agree on origin
- `FRONTEND_URL` environment variable crucial for production
- Wildcard origins don't work with credentials

### 5. **Environment Variables**

- Must be set in Vercel dashboard, not in code
- Different values per environment (development vs production)
- Critical for API endpoints, API keys, database URLs

### 6. **Express as Middleware**

- Export Express app, not start server
- Vercel handles request routing to `/api` handler
- Local development starts server normally

---

## ✅ Success Checklist

Before deploying, ensure:

- [ ] Root `package.json` exists with proper scripts
- [ ] `vercel.json` configured with correct build/output paths
- [ ] `api/index.js` exports Express app
- [ ] `server/server.js` exports app and awaits DB connection
- [ ] Frontend uses correct API base URL
- [ ] All imports use correct file casing
- [ ] MongoDB Atlas allows Vercel IPs
- [ ] All required environment variables set in Vercel
- [ ] CORS origins include frontend URL
- [ ] Code pushed to GitHub

---

## 🎯 Architecture Overview

```
User Browser (Client)
        ↓
   Vercel CDN
        ↓
┌─────────────────────┐
│  Vercel Project     │
├─────────────────────┤
│ Frontend (Static)   │ ← client/dist/
│ Served from CDN     │
├─────────────────────┤
│ API Routes (/api/*) │ → api/index.js
│ Serverless         │ → server/server.js
│ Functions          │ → MongoDB
└─────────────────────┘
```

---

## 📚 Additional Resources

- [Vercel Docs](https://vercel.com/docs)
- [Express with Vercel](https://vercel.com/guides/using-express-with-vercel)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vite Documentation](https://vitejs.dev/)

---

## 🎉 Conclusion

By following this setup, you've successfully deployed a **full-stack MERN application** on a **single Vercel project** with:

- ✅ React frontend served as static files
- ✅ Express backend as serverless functions
- ✅ Automatic deployments from GitHub
- ✅ Environment-specific configuration
- ✅ Scalable and cost-effective hosting

Your application is now **live, scalable, and production-ready!** 🚀

---

**Need help?** Check the [Troubleshooting](#troubleshooting) section or refer to Vercel's documentation.
