# 🚀 NeoMail Deployment Guide

This guide will help you deploy your NeoMail application to production.

## 📋 Prerequisites

- GitHub account (your code is already there)
- Vercel account (free tier works)
- MongoDB Atlas account (you already have this)

---

## 🎯 Deployment Strategy

- **Backend**: Deploy to Vercel (Serverless Functions)
- **Frontend**: Deploy to Vercel (Static Site)
- **Database**: MongoDB Atlas (already configured)

---

## 🔧 Step 1: Deploy Backend to Vercel

### 1.1 Prepare Backend for Deployment

Your backend is already configured with `vercel.json`. Let's verify it's correct.

### 1.2 Deploy Backend

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Import your GitHub repository**: `Tgaurav1k/NeoMail-Project`
4. **Configure Project**:
   - **Root Directory**: Select `Backend` folder
   - **Framework Preset**: Other
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://tgaurav1k:Gaurav28@cluster0.s8vms5d.mongodb.net/NeoMail?appName=Cluster0
   SECRET_KEY=MeriSecretKeyHaiYE
   JWT_EXPIRE=1d
   FRONTEND_URL=https://your-frontend-url.vercel.app
   NODE_ENV=production
   ```

6. **Click "Deploy"**

7. **Copy your Backend URL** (e.g., `https://neomail-backend.vercel.app`)

---

## 🎨 Step 2: Deploy Frontend to Vercel

### 2.1 Update Frontend Configuration

The frontend needs to know your backend URL. We'll use environment variables.

### 2.2 Deploy Frontend

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"** (again)
3. **Import the same GitHub repository**: `Tgaurav1k/NeoMail-Project`
4. **Configure Project**:
   - **Root Directory**: Select `Frontend` folder
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. **Add Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

6. **Click "Deploy"**

7. **Copy your Frontend URL** (e.g., `https://neomail-frontend.vercel.app`)

---

## 🔄 Step 3: Update Backend CORS

After deploying frontend, update the backend environment variable:

1. Go to your **Backend project** in Vercel
2. Go to **Settings → Environment Variables**
3. Update `FRONTEND_URL` to your frontend URL:
   ```
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
4. **Redeploy** the backend (Vercel will auto-redeploy or click "Redeploy")

---

## ✅ Step 4: Verify Deployment

### Test Backend:
- Visit: `https://your-backend-url.vercel.app/`
- Should see: `✅ Backend is up and responding!`

### Test Frontend:
- Visit: `https://your-frontend-url.vercel.app`
- Try logging in with existing credentials

---

## 🔐 Environment Variables Summary

### Backend (Vercel):
```
MONGO_URI=mongodb+srv://tgaurav1k:Gaurav28@cluster0.s8vms5d.mongodb.net/NeoMail?appName=Cluster0
SECRET_KEY=MeriSecretKeyHaiYE
JWT_EXPIRE=1d
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

### Frontend (Vercel):
```
VITE_API_URL=https://your-backend-url.vercel.app
```

---

## 🐛 Troubleshooting

### Issue: CORS Errors
- **Solution**: Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check that CORS is configured correctly in `Backend/index.js`

### Issue: API Calls Failing
- **Solution**: Verify `VITE_API_URL` in frontend matches your backend URL
- Check browser console for errors

### Issue: Cookies Not Working
- **Solution**: Ensure `withCredentials: true` is set in axios requests
- Check that CORS allows credentials

### Issue: Build Fails
- **Solution**: Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)

---

## 📝 Quick Deploy Commands (Alternative: Vercel CLI)

If you prefer using CLI:

### Install Vercel CLI:
```bash
npm i -g vercel
```

### Deploy Backend:
```bash
cd Backend
vercel
```

### Deploy Frontend:
```bash
cd Frontend
vercel
```

---

## 🎉 Success!

Once deployed, your NeoMail app will be live at:
- **Frontend**: `https://your-frontend-url.vercel.app`
- **Backend**: `https://your-backend-url.vercel.app`

Share these URLs with users to access your email application!

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
