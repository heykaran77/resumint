# 🚀 Vercel Deployment Guide

## Full-Stack Deployment (Frontend + Backend on Vercel)

Your project is now configured for complete deployment on Vercel! Here's how to deploy:

---

## **Step 1: Prerequisites**

- Vercel account ([sign up here](https://vercel.com/signup))
- GitHub account with your repo pushed
- MongoDB Atlas account (cloud database)
- ImageKit account (for image management)
- OpenAI API key (for AI features)

---

## **Step 2: Set Up MongoDB Atlas**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0 for all)
5. Copy the connection string and save it for later

**Example connection string:**
```
mongodb+srv://username:password@cluster.mongodb.net/resume-builder?retryWrites=true&w=majority
```

---

## **Step 3: Get Your API Keys**

### ImageKit
1. Go to [ImageKit Dashboard](https://imagekit.io/)
2. Get your:
   - Private Key
   - Public Key
   - URL Endpoint

### OpenAI
1. Go to [OpenAI API](https://platform.openai.com/api-keys)
2. Create an API key
3. Save it securely

---

## **Step 4: Deploy on Vercel**

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Click "Add New" → "Project"**

3. **Import your GitHub repository**
   - Select your `resumint` repository
   - Click "Import"

4. **Configure Project Settings**
   - Framework Preset: `Other`
   - Root Directory: `.`
   - Build Command: Keep default
   - Output Directory: Keep default

5. **Add Environment Variables**
   Click "Environment Variables" and add all these:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | Your MongoDB connection string |
   | `JWT_SECRET` | Any random secret string (e.g., `your-super-secret-key-12345`) |
   | `IMAGEKIT_PRIVATE_KEY` | Your ImageKit private key |
   | `IMAGEKIT_PUBLIC_KEY` | Your ImageKit public key |
   | `IMAGEKIT_URL_ENDPOINT` | Your ImageKit URL endpoint |
   | `OPENAI_API_KEY` | Your OpenAI API key |
   | `FRONTEND_URL` | Your Vercel deployment URL (add after first deployment) |
   | `NODE_ENV` | `production` |

6. **Click "Deploy"**
   - Wait for the build to complete
   - You'll get a deployment URL (e.g., `https://your-app.vercel.app`)

---

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to project root
cd resume-builder

# Deploy
vercel

# For production deployment
vercel --prod
```

---

## **Step 5: Update Frontend URL (If Needed)**

After your first deployment:

1. Get your Vercel URL from the dashboard
2. Go to Vercel Project Settings → Environment Variables
3. Add/Update `FRONTEND_URL` with your deployment URL:
   ```
   https://your-app.vercel.app
   ```

---

## **Step 6: Test Your Deployment**

1. Visit your deployed app at the provided URL
2. Try signing up and creating a resume
3. Test image upload functionality
4. Test AI summary generation

---

## **Troubleshooting**

### Build Fails
- Check that all environment variables are set
- Ensure MongoDB URI is correct
- Check build logs in Vercel dashboard

### API Calls Fail (CORS Error)
- Verify `FRONTEND_URL` is set correctly
- Check that `allowedOrigins` in server.js includes your Vercel URL

### Database Connection Error
- Verify MongoDB URI in environment variables
- Check MongoDB IP whitelist includes Vercel's IP (use 0.0.0.0)
- Confirm database user credentials

### Image Upload Not Working
- Verify ImageKit credentials are correct
- Check ImageKit account has remaining quota

---

## **Project Structure for Vercel**

```
resume-builder/
├── api/
│   └── index.js          # Vercel serverless function entry point
├── client/               # Frontend React app
│   ├── src/
│   └── package.json
├── server/               # Backend Express app
│   ├── server.js
│   ├── package.json
│   └── configs/
├── vercel.json          # Vercel configuration
├── .vercelignore        # Files to ignore during deployment
└── package.json         # Root package.json
```

---

## **Environment Variables Reference**

```
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/resume-builder

# JWT
JWT_SECRET=your-secret-key-here

# ImageKit
IMAGEKIT_PRIVATE_KEY=private_key_xxx
IMAGEKIT_PUBLIC_KEY=public_key_xxx
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/xxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# Frontend
FRONTEND_URL=https://your-app.vercel.app

# Node Environment
NODE_ENV=production
PORT=3000
```

---

## **Monitoring & Logs**

1. **View Logs:**
   - Go to Vercel Dashboard → Select Project → Functions
   - Click any function to see real-time logs

2. **Monitor Performance:**
   - Vercel Dashboard shows response times and errors
   - Check "Deployments" tab for build history

---

## **Custom Domain (Optional)**

1. Buy a domain (GoDaddy, Namecheap, etc.)
2. In Vercel Dashboard → Settings → Domains
3. Add your custom domain
4. Update DNS records according to Vercel's instructions

---

## **Rollback to Previous Version**

If something breaks:
1. Vercel Dashboard → Deployments
2. Find the previous working deployment
3. Click the three dots → "Promote to Production"

---

## **Next Steps**

- Set up automatic deployments from GitHub
- Configure custom domain
- Set up monitoring and alerts
- Add analytics to track usage

---

**Your app is now deployed on Vercel! 🎉**

For more help, visit [Vercel Documentation](https://vercel.com/docs)
