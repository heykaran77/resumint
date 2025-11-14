# 🚀 Vercel Deployment Guide

## Full-Stack Deployment on Vercel

This project is configured to deploy both frontend and backend on Vercel as a single application.

---

## 📋 Pre-Deployment Checklist

- ✅ Git repository initialized and pushed to GitHub
- ✅ All environment variables configured
- ✅ MongoDB Atlas account with database
- ✅ ImageKit account with credentials
- ✅ OpenAI API key (for AI features)
- ✅ Vercel account created

---

## 🔧 Configuration Files Created

1. **`vercel.json`** - Vercel build configuration
2. **`api/index.js`** - Serverless backend entry point
3. **`.env.example`** - Environment variable template
4. **`client/.env.example`** - Frontend env template

---

## 📝 Step 1: Set Up Environment Variables Locally

### Create `.env` in root (server):
```bash
cp .env.example .env
```

Edit `.env` and add your actual values:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster-name.mongodb.net/resume-builder
JWT_SECRET=your-super-secret-jwt-key-change-this
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_id
OPENAI_API_KEY=your_openai_api_key
FRONTEND_URL=http://localhost:5173
```

### Create `client/.env.local` (optional for local testing):
```bash
VITE_API_URL=http://localhost:3000/api
```

---

## 🔐 Step 2: Push to GitHub

```bash
# Stage all changes
git add .

# Commit changes
git commit -m "Configure for Vercel deployment"

# Push to GitHub
git push origin main
```

**Note:** Do NOT commit `.env` files. They should be in `.gitignore` already.

---

## 🌐 Step 3: Deploy on Vercel

### Option 1: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Find your GitHub repository and click **"Import"**
5. **Configure Project:**
   - Root Directory: `./` (leave default)
   - Framework Preset: **Vite**
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install && cd server && npm install`

6. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add all your environment variables from `.env`:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `IMAGEKIT_PRIVATE_KEY`
     - `IMAGEKIT_PUBLIC_KEY`
     - `IMAGEKIT_URL_ENDPOINT`
     - `OPENAI_API_KEY`
     - `FRONTEND_URL` = `https://your-app.vercel.app` (you'll get the URL after first deploy)

7. Click **"Deploy"** and wait for completion

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project root
vercel

# Follow the prompts and add environment variables when asked
```

---

## 📍 Step 4: Update Frontend API URL

After deployment, Vercel will give you a URL like `https://your-app.vercel.app`

1. Go back to Vercel Dashboard
2. Go to your project settings
3. Add/Update this environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. **Redeploy** the project for changes to take effect

---

## 🔗 API Endpoints After Deployment

Your API will be available at:
```
https://your-app.vercel.app/api/users
https://your-app.vercel.app/api/resumes
https://your-app.vercel.app/api/ai
```

Frontend will automatically use these endpoints when you set `VITE_API_URL` environment variable in Vercel.

---

## 🧪 Testing After Deployment

1. Visit `https://your-app.vercel.app`
2. Test the following:
   - ✅ Page loads correctly
   - ✅ User registration works
   - ✅ Login functionality works
   - ✅ Resume creation and saving works
   - ✅ Image uploads work
   - ✅ Template switching works
   - ✅ AI features work

---

## 🐛 Troubleshooting

### Issue: "Cannot POST /api/users"
**Solution:** Check if `FRONTEND_URL` environment variable is set correctly

### Issue: "CORS Error"
**Solution:** Verify `allowedOrigins` in `api/index.js` includes your Vercel URL

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Check `MONGODB_URI` is correct
- Verify MongoDB Atlas network access includes `0.0.0.0/0`
- Test connection string locally first

### Issue: "Image upload fails"
**Solution:** Verify ImageKit credentials are correct and not expired

### Issue: "Build fails"
**Solution:** Check the build logs in Vercel dashboard → Deployments

---

## 📊 Monitoring

View your deployment logs and metrics:
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Deployments"** to see deployment history
4. Click **"Logs"** for runtime errors
5. Click **"Analytics"** to monitor usage

---

## 🔄 Making Updates

After any code changes:

```bash
git add .
git commit -m "Your update message"
git push origin main
```

Vercel will automatically redeploy your changes!

---

## 📱 Domain Setup (Optional)

To use a custom domain:
1. Go to project **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed
4. Update `FRONTEND_URL` in environment variables

---

## 🎉 You're Done!

Your full-stack resume builder is now live on Vercel!

**Share your URL:** `https://your-app.vercel.app`

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Express Docs: https://expressjs.com
- React Docs: https://react.dev
