# 🔄 Neon Database Keep-Alive Setup

Prevents your Neon free tier database from auto-pausing after 5 minutes of inactivity.

## ⚡ Quick Start

### Option 1: Run Dev + Keep-Alive Together (Recommended)

```bash
npm run dev:keep-alive
```

This starts both:
- Next.js dev server on `http://localhost:3000`
- Keep-alive service (pings DB every 4 minutes)

---

### Option 2: Run Separately

**Terminal 1 - Dev Server:**
```bash
npm run dev
```

**Terminal 2 - Keep-Alive:**
```bash
npm run keep-alive
```

---

## 📊 What You'll See

```
🚀 Neon Keep-Alive Service Started
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Target: http://localhost:3000/api/keep-alive
⏱️  Interval: Every 4 minutes
🎯 Purpose: Prevent Neon database auto-pause
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 Ping #1 - 10:30:45 AM
📡 Pinging: http://localhost:3000/api/keep-alive
✅ Success (234ms)
📊 Status: alive
🗄️  Database: Online
📈 Stats: 1 success, 0 failed
⏰ Next ping in 4 minutes...
```

---

## 🌐 Deploy Keep-Alive (Production)

For deployed apps, use an external cron service:

### Option 1: Cron-Job.org (Free)

1. Go to: https://cron-job.org/en/
2. Create free account
3. Add new cron job:
   - **URL**: `https://your-app.vercel.app/api/keep-alive`
   - **Schedule**: Every 4 minutes (`*/4 * * * *`)
   - **Enable**: ✅

### Option 2: EasyCron (Free)

1. Go to: https://www.easycron.com
2. Create free account (up to 100 jobs)
3. Add cron expression:
   - **URL**: `https://your-app.vercel.app/api/keep-alive`
   - **When**: `*/4 * * * *` (every 4 minutes)

### Option 3: UptimeRobot (Free)

1. Go to: https://uptimerobot.com
2. Create monitor:
   - **Type**: HTTP(s)
   - **URL**: `https://your-app.vercel.app/api/keep-alive`
   - **Interval**: 5 minutes (minimum for free)

---

## 🧪 Test the API Manually

**Browser:**
```
http://localhost:3000/api/keep-alive
```

**PowerShell:**
```powershell
Invoke-WebRequest http://localhost:3000/api/keep-alive | Select-Object -Expand Content
```

**Expected Response:**
```json
{
  "status": "alive",
  "timestamp": "2025-11-18T10:30:45.123Z",
  "database": [
    {
      "ping": 1,
      "timestamp": "2025-11-18T10:30:45.120Z"
    }
  ]
}
```

---

## ⚙️ How It Works

1. **API Endpoint** (`/api/keep-alive`):
   - Runs simple SQL query: `SELECT 1`
   - Keeps database connection active

2. **Keep-Alive Script**:
   - Pings API every 4 minutes
   - Prevents 5-minute auto-pause
   - Shows real-time stats

3. **Neon Response**:
   - Database stays warm
   - No cold starts
   - Instant queries

---

## 💰 Cost

- ✅ **$0** - Completely free
- ✅ Uses Neon free tier
- ✅ No additional services needed
- ⚠️ Small compute usage (negligible on free tier)

---

## ❓ Troubleshooting

### Keep-alive fails
**Issue**: "Make sure your app is running"
**Fix**: Ensure `npm run dev` is running first

### Database still pauses
**Issue**: Pings not reaching database
**Fix**: 
1. Check `.env` has correct `DATABASE_URL`
2. Run `npm run db:check` to verify connection
3. Ensure interval is less than 5 minutes

### High latency
**Issue**: Slow ping times (>2000ms)
**Fix**: Database might be waking up from pause, wait one cycle

---

## 🔐 Security Note

The `/api/keep-alive` endpoint is public (no auth needed). This is intentional for cron services. It only runs a harmless `SELECT 1` query.

---

## 🚀 Production Deployment

### Vercel

Your API endpoint will be:
```
https://your-app.vercel.app/api/keep-alive
```

Set up cron-job.org to ping it every 4 minutes.

### Alternative: Vercel Cron Jobs

Add to `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/keep-alive",
    "schedule": "*/4 * * * *"
  }]
}
```

Requires Vercel Pro plan ($20/month).

---

## 📈 Stats Tracking

The keep-alive script tracks:
- ✅ Success count
- ❌ Failure count
- 📊 Total pings
- ⏱️ Response times

Press `Ctrl+C` to see final stats when stopping.

---

## 🎯 Next Steps

1. ✅ Run `npm run dev:keep-alive` 
2. ✅ Keep it running while developing
3. ✅ Deploy and set up cron-job.org for production
4. ✅ Never worry about database pausing again!

**Your Neon database will stay warm 24/7** 🔥
