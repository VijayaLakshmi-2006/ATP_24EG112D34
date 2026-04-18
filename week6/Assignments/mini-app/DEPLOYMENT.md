# Deployment Guide

This guide covers deploying your Employee Management App to production.

## Prerequisites

1. MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
2. GitHub account with repo pushed
3. Railway account (https://railway.app/) or Heroku
4. Vercel account (https://vercel.com/)

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

### 1.1 Create a MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login and create a new project
3. Create a **Free Cluster**
4. Choose your region (closest to your location)
5. Wait for cluster creation (5-10 minutes)

### 1.2 Create Database User

1. Go to **Security** > **Database Access**
2. Click **Add New Database User**
3. Set username: `employeeuser` (or your choice)
4. Set password: (auto-generate and save it)
5. Add user

### 1.3 Add IP Address to Whitelist

1. Go to **Security** > **Network Access**
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for testing)
   - *Note: For production, use specific IPs*
4. Confirm

### 1.4 Get Connection String

1. Click **Databases** > **Connect**
2. Choose **Drivers** > **Node.js**
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `myFirstDatabase` with `employeedb`

**Example:**
```
mongodb+srv://employeeuser:password123@cluster0.jx8t9.mongodb.net/employeedb?retryWrites=true&w=majority
```

---

## Step 2: Deploy Backend to Railway

### 2.1 Push Code to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2.2 Deploy to Railway

1. Go to [Railway.app](https://railway.app/)
2. Sign up with GitHub
3. Click **Create New Project**
4. Select **Deploy from GitHub repo**
5. Choose your repository
6. Railway will auto-detect `package.json`

### 2.3 Set Environment Variables

1. In Railroad dashboard, go to **Variables**
2. Add these variables:

| Variable | Value |
|----------|-------|
| `DB_URL` | Your MongoDB Atlas connection string |
| `PORT` | 5000 |
| `FRONTEND_URL` | Your Vercel frontend URL (add after frontend deployment) |
| `NODE_ENV` | production |

### 2.4 Deploy

1. Click **Deploy** button
2. Wait for build to complete
3. Copy your backend URL (e.g., `https://yourapp-backend.railway.app`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Setup Frontend Environment

Create `.env.local` in frontend folder:

```
VITE_BACKEND_URL=https://yourapp-backend.railway.app
```

### 3.2 Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with GitHub
3. Click **Add New Project**
4. Import your GitHub repository
5. Select `frontend` directory as root

### 3.3 Set Environment Variables in Vercel

1. Go to **Settings** > **Environment Variables**
2. Add: `VITE_BACKEND_URL` = Your Railway backend URL
3. Click **Deploy**

### 3.4 Copy Vercel URL

After deployment, copy your Vercel URL (e.g., `https://yourapp.vercel.app`)

---

## Step 4: Update Backend CORS

Now that you have your Vercel frontend URL, update Railway:

1. Go to Railway dashboard
2. Update `FRONTEND_URL` = Your Vercel URL
3. Redeploy

---

## Testing Your Deployment

1. Open your Vercel URL in browser
2. Test all CRUD operations:
   - Create employee
   - View employees
   - Edit employee
   - Delete employee

---

## Troubleshooting

### Backend not connecting to database
- Check MongoDB Atlas connection string in `DB_URL`
- Verify IP whitelist allows connections
- Check Network tab in browser for API errors

### Frontend can't reach backend
- Verify `VITE_BACKEND_URL` is correct
- Check CORS settings in backend: `process.env.FRONTEND_URL` must match your Vercel URL
- Check browser console for errors

### Build fails on Vercel
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors
- Review build logs in Vercel dashboard

---

## Local Development Environment

Create `.env.local` files for local development:

**Backend** (`backend/.env.local`):
```
DB_URL=mongodb://localhost:27017/employeedb
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env.local`):
```
VITE_BACKEND_URL=http://localhost:5000
```

Then run:
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

---

## Useful Links

- [Railway Documentation](https://docs.railway.app/)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com/)
- [Express Deployment](https://expressjs.com/en/advanced/best-practice-security.html)
