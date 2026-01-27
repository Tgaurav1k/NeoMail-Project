# ✅ Deployment Checklist

Use this checklist to ensure everything is set up correctly before and after deployment.

## Pre-Deployment Checklist

### Backend
- [x] `vercel.json` exists and is configured
- [x] CORS is configured for production
- [x] Environment variables are documented
- [x] Database connection string is ready
- [x] Serverless-friendly code (no `app.listen` in production)

### Frontend
- [x] Environment variables use `VITE_` prefix
- [x] API URLs use environment variables
- [x] Build command is configured (`npm run build`)
- [x] Output directory is `dist`

---

## Deployment Steps

### Step 1: Deploy Backend
1. [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. [ ] Click "Add New Project"
3. [ ] Import repository: `Tgaurav1k/NeoMail-Project`
4. [ ] Set Root Directory: `Backend`
5. [ ] Framework Preset: `Other`
6. [ ] Add Environment Variables:
   - [ ] `MONGO_URI`
   - [ ] `SECRET_KEY`
   - [ ] `JWT_EXPIRE=1d`
   - [ ] `FRONTEND_URL` (will update after frontend deploy)
   - [ ] `NODE_ENV=production`
7. [ ] Click "Deploy"
8. [ ] Copy Backend URL: `https://________________.vercel.app`

### Step 2: Deploy Frontend
1. [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. [ ] Click "Add New Project"
3. [ ] Import repository: `Tgaurav1k/NeoMail-Project`
4. [ ] Set Root Directory: `Frontend`
5. [ ] Framework Preset: `Vite`
6. [ ] Build Command: `npm run build`
7. [ ] Output Directory: `dist`
8. [ ] Add Environment Variable:
   - [ ] `VITE_API_URL` = (your backend URL from Step 1)
9. [ ] Click "Deploy"
10. [ ] Copy Frontend URL: `https://________________.vercel.app`

### Step 3: Update Backend CORS
1. [ ] Go to Backend project in Vercel
2. [ ] Settings → Environment Variables
3. [ ] Update `FRONTEND_URL` = (your frontend URL from Step 2)
4. [ ] Redeploy backend

---

## Post-Deployment Testing

### Backend Tests
- [ ] Visit backend URL → Should see "✅ Backend is up and responding!"
- [ ] Test API endpoint: `GET /api/v1/user/register` (should return error, not crash)
- [ ] Check Vercel function logs for errors

### Frontend Tests
- [ ] Visit frontend URL → Should load login page
- [ ] Try to sign up → Should work
- [ ] Try to login → Should work
- [ ] Send an email → Should work
- [ ] Receive an email → Should appear in inbox
- [ ] Check browser console for errors

### Integration Tests
- [ ] Login works end-to-end
- [ ] Email sending works
- [ ] Email receiving works
- [ ] Search functionality works
- [ ] Delete email works
- [ ] Logout works

---

## Common Issues & Fixes

### ❌ CORS Error
**Fix**: 
1. Check `FRONTEND_URL` in backend matches frontend URL exactly
2. Ensure no trailing slash
3. Redeploy backend after updating

### ❌ API Calls Return 404
**Fix**:
1. Verify `VITE_API_URL` in frontend matches backend URL
2. Check backend routes are correct
3. Ensure backend is deployed successfully

### ❌ Cookies Not Working
**Fix**:
1. Verify `withCredentials: true` in axios requests
2. Check CORS allows credentials
3. Ensure same-site cookie settings

### ❌ Build Fails
**Fix**:
1. Check Vercel build logs
2. Ensure all dependencies in `package.json`
3. Verify Node.js version (18+)
4. Check for syntax errors

---

## Environment Variables Reference

### Backend (.env or Vercel)
```env
MONGO_URI=mongodb+srv://tgaurav1k:Gaurav28@cluster0.s8vms5d.mongodb.net/NeoMail?appName=Cluster0
SECRET_KEY=MeriSecretKeyHaiYE
JWT_EXPIRE=1d
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (.env or Vercel)
```env
VITE_API_URL=https://your-backend.vercel.app
```

---

## URLs to Save

- **Backend URL**: `https://________________.vercel.app`
- **Frontend URL**: `https://________________.vercel.app`
- **GitHub Repo**: `https://github.com/Tgaurav1k/NeoMail-Project`

---

## Next Steps After Deployment

1. [ ] Test all features thoroughly
2. [ ] Share URLs with team/users
3. [ ] Monitor Vercel logs for errors
4. [ ] Set up custom domain (optional)
5. [ ] Enable Vercel Analytics (optional)

---

## 🎉 Deployment Complete!

Your NeoMail app is now live! 🚀
