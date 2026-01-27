# ⚡ Quick Deploy Reference

## 🚀 Fast Deployment Steps

### 1️⃣ Deploy Backend (5 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import: `Tgaurav1k/NeoMail-Project`
3. **Root Directory**: `Backend`
4. **Framework**: Other
5. **Environment Variables**:
   ```
   MONGO_URI=mongodb+srv://tgaurav1k:Gaurav28@cluster0.s8vms5d.mongodb.net/NeoMail?appName=Cluster0
   SECRET_KEY=MeriSecretKeyHaiYE
   JWT_EXPIRE=1d
   FRONTEND_URL=https://UPDATE-AFTER-FRONTEND-DEPLOY.vercel.app
   NODE_ENV=production
   ```
6. Deploy → Copy URL: `https://________.vercel.app`

---

### 2️⃣ Deploy Frontend (5 minutes)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import: `Tgaurav1k/NeoMail-Project`
3. **Root Directory**: `Frontend`
4. **Framework**: Vite
5. **Environment Variable**:
   ```
   VITE_API_URL=https://YOUR-BACKEND-URL.vercel.app
   ```
6. Deploy → Copy URL: `https://________.vercel.app`

---

### 3️⃣ Update Backend CORS (2 minutes)

1. Backend Project → Settings → Environment Variables
2. Update `FRONTEND_URL` = Your frontend URL
3. Redeploy

---

## ✅ Done!

**Test**: Visit frontend URL and login!

---

## 📞 Need Help?

- Check `DEPLOYMENT_GUIDE.md` for detailed instructions
- Check `DEPLOYMENT_CHECKLIST.md` for step-by-step checklist
