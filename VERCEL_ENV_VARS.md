# Vercel Environment Variables Setup

## 🔗 Add these at:
https://vercel.com/docharry22s-projects/water-nest-ecommerce/settings/environment-variables

---

## ✅ Required Environment Variables

### Database (Required)
```
DATABASE_URL
postgresql://postgres.rgfloeshqjbjfdarwdxn:TNTfgZyrdvx1CTqu@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20
```

```
DIRECT_URL
postgresql://postgres:TNTfgZyrdvx1CTqu@db.rgfloeshqjbjfdarwdxn.supabase.co:5432/postgres
```

### NextAuth.js (Required)
```
NEXTAUTH_URL
https://water-nest-ecommerce-bvgyo01xz-docharry22s-projects.vercel.app
```

```
NEXTAUTH_SECRET
development-secret-change-in-production
```

**⚠️ IMPORTANT:** Generate a new secure secret for production:
Run: `openssl rand -base64 32` and use that value instead

---

## 📱 App Configuration
```
NEXT_PUBLIC_APP_URL
https://water-nest-ecommerce-bvgyo01xz-docharry22s-projects.vercel.app
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
1. Go to: https://water-nest-ecommerce-bvgyo01xz-docharry22s-projects.vercel.app/auth/register
2. Register with email: admin@waternest.com
3. Manually update role in Supabase dashboard to 'ADMIN'

**Option B: Via Supabase Dashboard**
1. Go to: https://supabase.com/dashboard/project/rgfloeshqjbjfdarwdxn
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
**Value:** `postgresql://postgres.rgfloeshqjbjfdarwdxn:TNTfgZyrdvx1CTqu@aws-0-eu-west-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=10&pool_timeout=20`  
**Environment:** Production

**Name:** DIRECT_URL  
**Value:** `postgresql://postgres:TNTfgZyrdvx1CTqu@db.rgfloeshqjbjfdarwdxn.supabase.co:5432/postgres`  
**Environment:** Production

**Name:** NEXTAUTH_URL  
**Value:** `https://water-nest-ecommerce-bvgyo01xz-docharry22s-projects.vercel.app`  
**Environment:** Production

**Name:** NEXTAUTH_SECRET  
**Value:** `[GENERATE NEW SECRET - see security notes above]`  
**Environment:** Production

**Name:** NEXT_PUBLIC_APP_URL  
**Value:** `https://water-nest-ecommerce-bvgyo01xz-docharry22s-projects.vercel.app`  
**Environment:** Production

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

**Your site URL:** https://water-nest-ecommerce-bvgyo01xz-docharry22s-projects.vercel.app
**Vercel Dashboard:** https://vercel.com/docharry22s-projects/water-nest-ecommerce
**Supabase Dashboard:** https://supabase.com/dashboard/project/rgfloeshqjbjfdarwdxn
