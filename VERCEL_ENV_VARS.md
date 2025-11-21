# Vercel Environment Variables Setup

## 🔗 Add these at:
Vercel Dashboard → Your Project → Settings → Environment Variables

---

## ✅ Required Environment Variables

### Database (Production Only)
```
DATABASE_URL
postgresql://postgres.<PROJECT_ID>:<DB_PASSWORD>@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20
```

```
DIRECT_URL
postgresql://postgres:<DB_PASSWORD>@db.<PROJECT_ID>.supabase.co:5432/postgres
```

**Note:** Get your database credentials from Supabase Dashboard → Settings → Database

### NextAuth.js (All Environments)
```
NEXTAUTH_URL
<YOUR_VERCEL_DEPLOYMENT_URL>
```

```
NEXTAUTH_SECRET
<GENERATE_SECURE_SECRET>
```

**⚠️ IMPORTANT:** Generate a new secure secret:
- PowerShell: `$bytes = New-Object byte[] 32; [Security.Cryptography.RNGCryptoServiceProvider]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)`
- Linux/Mac: `openssl rand -base64 32`

---

## 📱 App Configuration (All Environments)
```
NEXT_PUBLIC_APP_URL
<YOUR_VERCEL_DEPLOYMENT_URL>
```

```
NEXT_PUBLIC_APP_NAME
Water Nest
```

---

## 🔐 OAuth Providers (Optional - for social login)
```
GOOGLE_CLIENT_ID
your-google-client-id
```

```
GOOGLE_CLIENT_SECRET
your-google-client-secret
```

```
FACEBOOK_CLIENT_ID
your-facebook-client-id
```

```
FACEBOOK_CLIENT_SECRET
your-facebook-client-secret
```

```
MICROSOFT_CLIENT_ID
your-microsoft-client-id
```

```
MICROSOFT_CLIENT_SECRET
your-microsoft-client-secret
```

---

## 📧 Email (Optional - for password reset)
```
EMAIL_SERVER
smtp://user:pass@smtp.example.com:587
```

```
EMAIL_FROM
noreply@waternest.com
```

---

## 💳 Payment Gateway (Optional)
```
STRIPE_PUBLIC_KEY
your-stripe-public-key
```

```
STRIPE_SECRET_KEY
your-stripe-secret-key
```

```
STRIPE_WEBHOOK_SECRET
your-stripe-webhook-secret
```

---

## ☁️ File Upload (Optional)
```
CLOUDINARY_CLOUD_NAME
your-cloud-name
```

```
CLOUDINARY_API_KEY
your-api-key
```

```
CLOUDINARY_API_SECRET
your-api-secret
```

---

## 📋 Setup Checklist

### Step 1: Add Required Variables (Must do first)
- [ ] DATABASE_URL
- [ ] DIRECT_URL
- [ ] NEXTAUTH_URL (set to your Vercel URL)
- [ ] NEXTAUTH_SECRET (generate new one for production)
- [ ] NEXT_PUBLIC_APP_URL
- [ ] NEXT_PUBLIC_APP_NAME

### Step 2: Redeploy
After adding environment variables, redeploy:
```bash
vercel --prod
```

Or trigger a redeploy from Vercel Dashboard

### Step 3: Test the Site
- [ ] Visit your production URL
- [ ] Register a new account at `/auth/register`
- [ ] Login with your credentials
- [ ] Test booking an appointment
- [ ] Access admin panel (if you're admin)

### Step 4: Create Admin User
Once deployed with env vars, create admin account:

**Option A: Via Registration Page**
1. Go to: `<YOUR_VERCEL_URL>/auth/register`
2. Register with email: admin@waternest.com
3. Manually update role in Supabase dashboard to 'ADMIN'

**Option B: Via Supabase Dashboard**
1. Go to: Supabase Dashboard → Table Editor → User table
2. Table Editor → User table
3. Insert row with:
   - email: admin@waternest.com
   - name: Admin User
   - role: ADMIN
   - password: (hash of 'admin123' - use bcrypt online tool)

---

## 🔒 Security Notes

1. **Change NEXTAUTH_SECRET in production!**
   ```bash
   # Generate a secure secret:
   openssl rand -base64 32
   ```

2. **Don't commit .env files to Git** (already in .gitignore)

3. **Set environment variables to "Production" scope only** (not Development/Preview unless needed)

4. **Enable Supabase RLS** (Row Level Security) - See RLS_SETUP_GUIDE.md

---

## 🚀 Quick Copy-Paste Format (for Vercel UI)

**Name:** DATABASE_URL  
**Value:** `<GET_FROM_SUPABASE_DASHBOARD>`  
**Environment:** Production

**Name:** DIRECT_URL  
**Value:** `<GET_FROM_SUPABASE_DASHBOARD>`  
**Environment:** Production

**Name:** NEXTAUTH_URL  
**Value:** `<YOUR_VERCEL_URL>`  
**Environment:** Production, Preview, Development

**Name:** NEXTAUTH_SECRET  
**Value:** `<GENERATE_NEW_SECRET>`  
**Environment:** Production, Preview, Development

**Name:** NEXT_PUBLIC_APP_URL  
**Value:** `<YOUR_VERCEL_URL>`  
**Environment:** Production, Preview, Development

**Name:** NEXT_PUBLIC_APP_NAME  
**Value:** `Water Nest`  
**Environment:** Production

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Verify all required env vars are set
4. Make sure to redeploy after adding env vars

**Vercel Dashboard:** https://vercel.com (Your Projects → water-nest-ecommerce)
**Supabase Dashboard:** https://supabase.com/dashboard (Your Project → Settings → Database)
