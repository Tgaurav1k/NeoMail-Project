# 🔧 Fix Signup Failed on Vercel (Works on Localhost)

## The Problem

Your code works on localhost because:

- ✅ Backend runs on `http://localhost:8080`
- ✅ Frontend uses fallback: `import.meta.env.VITE_API_URL || "http://localhost:8080"`

On Vercel:

- ❌ `VITE_API_URL` is not set
- ❌ Falls back to `http://localhost:8080` (doesn't exist in production)
- ❌ Signup fails!

---

## ✅ Solution: Add Environment Variable in Vercel

### Step 1: Add VITE_API_URL to Frontend

1. **Go to [Vercel Dashboard**](https://vercel.com/dashboard)
2. **Click on your Frontend project** (`neo-mail-gauravj` or similar)
3. **Go to Settings** (top menu)
4. **Click "Environment Variables"** (left sidebar)
5. **Click "Add New"**
6. **Fill in:**
  ```
   Key: VITE_API_URL
   Value: https://neo-mail-project.vercel.app
  ```
  **[neo-mail-project.vercel.app](http://neo-mail-project.vercel.app)**
   ⚠️ **Important**: Replace `neo-mail-project.vercel.app` with YOUR actual backend URL!
7. **Select all environments:**
  - ✅ Production
  - ✅ Preview  
  - ✅ Development
8. **Click "Save"**

### Step 2: Redeploy Frontend

1. **Go to "Deployments" tab** (top menu)
2. **Find the latest deployment**
3. **Click the 3 dots (⋯)** on the right
4. **Click "Redeploy"**
5. **Wait 1-2 minutes** for deployment to complete

### Step 3: Update Backend CORS (if not done)

1. **Go to your Backend project** in Vercel
2. **Settings → Environment Variables**
3. **Add or Update:**
  ```
   Key: FRONTEND_URL
   Value: https://neo-mail-gauravj.vercel.app
  ```
   ⚠️ Replace with YOUR frontend URL!
4. **Redeploy backend**

---

## ✅ Test

1. Visit: `https://neo-mail-gauravj.vercel.app/signup`
2. Try signing up
3. Should work now! 🎉

---

## 🔍 How to Find Your URLs

### Backend URL:

- Go to Backend project in Vercel
- Look at the top - it shows: `https://your-backend-name.vercel.app`

### Frontend URL:

- Go to Frontend project in Vercel  
- Look at the top - it shows: `https://your-frontend-name.vercel.app`

---

## 📝 Environment Variables Checklist

### Frontend Project (Vercel):

```
✅ VITE_API_URL=https://your-backend-url.vercel.app
```

### Backend Project (Vercel):

```
✅ MONGO_URI=mongodb+srv://...
✅ SECRET_KEY=...
✅ JWT_EXPIRE=1d
✅ FRONTEND_URL=https://your-frontend-url.vercel.app
✅ NODE_ENV=production
```

---

## 🐛 Still Not Working?

### Check Browser Console (F12):

1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Try signing up
4. Look for errors:
  - **CORS error** → Backend `FRONTEND_URL` is wrong
  - **404 error** → Frontend `VITE_API_URL` is wrong
  - **Network error** → Backend is down

### Check Vercel Logs:

1. Frontend project → Deployments → Latest → Functions Logs
2. Backend project → Deployments → Latest → Functions Logs
3. Look for error messages

---

## 💡 Why This Happens

- **Localhost**: Code uses `http://localhost:8080` (hardcoded fallback)
- **Vercel**: Needs `VITE_API_URL` environment variable
- **Vite**: Only exposes variables starting with `VITE_` to the browser
- **Solution**: Set `VITE_API_URL` in Vercel dashboard

---

## ✅ After Fix

Your signup should work because:

- ✅ Frontend knows where backend is (`VITE_API_URL`)
- ✅ Backend allows frontend requests (`FRONTEND_URL` in CORS)
- ✅ All API calls go to production backend, not localhost

