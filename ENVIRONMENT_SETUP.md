# Environment Variables Setup Guide

This document provides a complete guide for setting up environment variables for the Water Nest E-commerce application across different environments.

## 🔐 Security Notice

**NEVER commit real secrets to version control.** This file contains placeholders only. Use Vercel's environment variables dashboard or `.env.local` for actual values.

---

## Required Environment Variables

### 🗄️ Database (All Environments)

#### Production & Preview
```bash
# Transaction pooler (port 6543) - Use for runtime queries with connection pooling
DATABASE_URL="postgresql://USER:PASSWORD@REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection (port 5432) - Use for migrations and schema changes
DIRECT_URL="postgresql://USER:PASSWORD@db.PROJECT_REF.supabase.com:5432/postgres"
```

#### Development
```bash
# Can use pooler for both if direct port is blocked by firewall
DATABASE_URL="postgresql://USER:PASSWORD@REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://USER:PASSWORD@REGION.pooler.supabase.com:5432/postgres"
```

**Note:** Port 5432 may be blocked by corporate firewalls. Use VPN, mobile hotspot, or deploy migrations from Vercel if needed.

---

### 🔑 Authentication (All Environments)

```bash
# NextAuth Configuration
NEXTAUTH_URL="https://your-domain.com"  # Production URL or http://localhost:3000 for dev
NEXTAUTH_SECRET="your-secret-here"      # Generate: openssl rand -base64 32

# Stack Auth (if using)
NEXT_PUBLIC_STACK_PROJECT_ID="your-project-id"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pck_xxxxx"
STACK_SECRET_SERVER_KEY="ssk_xxxxx"
```

**Scopes:**
- `NEXTAUTH_URL`: Production, Preview, Development
- `NEXTAUTH_SECRET`: Production, Preview, Development (use different secrets per environment)

---

### 🌐 OAuth Providers (Production & Preview)

```bash
# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxx"

# Facebook OAuth
FACEBOOK_CLIENT_ID="your-facebook-app-id"
FACEBOOK_CLIENT_SECRET="your-facebook-app-secret"

# Microsoft OAuth
MICROSOFT_CLIENT_ID="your-microsoft-client-id"
MICROSOFT_CLIENT_SECRET="your-microsoft-client-secret"
```

**Setup Instructions:**
- Google: https://console.cloud.google.com/apis/credentials
- Facebook: https://developers.facebook.com/apps
- Microsoft: https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps

---

### 📧 Email Service (Production & Preview)

```bash
# Resend (Recommended)
RESEND_API_KEY="re_xxxxx"

# Or SendGrid
SENDGRID_API_KEY="SG.xxxxx"

# Email From Address
EMAIL_FROM="noreply@waternest.com"
```

**Get API Key:**
- Resend: https://resend.com/api-keys (Free tier: 3,000 emails/month)
- SendGrid: https://sendgrid.com/

---

### 💳 Payment Gateway (Production & Preview)

```bash
# Stripe
STRIPE_PUBLIC_KEY="pk_live_xxxxx"           # Production only
STRIPE_SECRET_KEY="sk_live_xxxxx"           # Production only
STRIPE_WEBHOOK_SECRET="whsec_xxxxx"         # Production only

# For Preview/Development
STRIPE_PUBLIC_KEY="pk_test_xxxxx"
STRIPE_SECRET_KEY="sk_test_xxxxx"
STRIPE_WEBHOOK_SECRET="whsec_test_xxxxx"
```

**Setup:**
1. Create account at https://stripe.com
2. Get API keys from Dashboard → Developers → API keys
3. Set up webhook endpoint: `https://your-domain.com/api/webhooks/stripe`
4. Get webhook secret from Webhooks section

---

### 🚦 Rate Limiting (Production)

```bash
# Upstash Redis (for production rate limiting)
UPSTASH_REDIS_REST_URL="https://your-region-xxxxx.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"
```

**Setup:**
1. Sign up at https://upstash.com (Free tier: 10,000 requests/day)
2. Create Redis database
3. Copy REST URL and token from database dashboard

**Note:** Development uses in-memory rate limiting (no Redis required)

---

### 📦 File Upload (Optional)

```bash
# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="xxxxx"
CLOUDINARY_API_SECRET="xxxxx"
```

**Setup:** https://cloudinary.com/

---

### 🌍 Public Variables (All Environments)

```bash
# Application Configuration
NEXT_PUBLIC_APP_URL="https://your-domain.com"  # Or http://localhost:3000 for dev
NEXT_PUBLIC_APP_NAME="Water Nest"
```

**Note:** `NEXT_PUBLIC_*` variables are exposed to the browser. Never put secrets here.

---

## 📋 Environment Setup Checklist

### Development Environment

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add database credentials (pooler URLs work best)
- [ ] Set `NEXTAUTH_URL=http://localhost:3000`
- [ ] Generate development `NEXTAUTH_SECRET`
- [ ] Add test Stripe keys (optional for local development)
- [ ] Run `npm install`
- [ ] Run `npx prisma generate`
- [ ] Test connection with `npm run dev`

### Preview Environment (Vercel)

- [ ] Add all production variables to Vercel
- [ ] Scope variables to "Preview" environment
- [ ] Use test/staging credentials where applicable
- [ ] Set preview URL in `NEXTAUTH_URL`
- [ ] Enable deployment protection if needed

### Production Environment (Vercel)

- [ ] Rotate all secrets before deploying
- [ ] Add production database URLs
- [ ] Add production OAuth credentials
- [ ] Add production Stripe keys
- [ ] Add email service API key
- [ ] Add Upstash Redis credentials
- [ ] Set production URL in `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`
- [ ] Scope all variables to "Production" environment
- [ ] Test deployment thoroughly
- [ ] Monitor error logs after deployment

---

## 🔒 Security Best Practices

### Secret Management

1. **Never commit secrets** to version control
2. **Use different secrets** for each environment
3. **Rotate secrets** after any security incident
4. **Limit secret access** to essential team members only
5. **Use Vercel's secrets management** instead of .env files in production

### Secret Rotation Schedule

- `NEXTAUTH_SECRET`: Rotate every 90 days or after breach
- Database passwords: Rotate every 180 days or after breach
- OAuth secrets: Rotate when provider credentials are compromised
- Stripe keys: Use test keys for development, rotate if exposed
- API keys: Monitor usage and rotate if suspicious activity detected

### Git Protection

Add to `.gitignore`:
```
.env
.env.local
.env.production
.env.*.local
```

Check git history:
```bash
git log --all --full-history -- .env*
```

If secrets were committed, rotate them immediately and consider:
```bash
# Remove from history (destructive - coordinate with team)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

---

## 🚀 Vercel Deployment

### Using Vercel CLI

```bash
# Add secret to specific environment
vercel env add VARIABLE_NAME production

# Remove old secret
vercel env rm VARIABLE_NAME production

# Pull environment variables locally
vercel env pull .env.local
```

### Using Vercel Dashboard

1. Go to Project Settings → Environment Variables
2. Add each variable with appropriate scope:
   - **Production**: Live production environment
   - **Preview**: Pull request deployments
   - **Development**: Local development with `vercel dev`
3. Redeploy after adding/changing variables

---

## 🔍 Variable Sensitivity Matrix

| Variable | Sensitive | Public | Rotate Frequency |
|----------|-----------|--------|------------------|
| `DATABASE_URL` | ✅ High | ❌ | 180 days |
| `NEXTAUTH_SECRET` | ✅ High | ❌ | 90 days |
| `STRIPE_SECRET_KEY` | ✅ High | ❌ | On compromise |
| `RESEND_API_KEY` | ✅ Medium | ❌ | On compromise |
| `OAUTH_*_SECRET` | ✅ High | ❌ | On compromise |
| `STRIPE_PUBLIC_KEY` | ⚠️ Low | ✅ | Never |
| `NEXT_PUBLIC_*` | ⚠️ None | ✅ | As needed |

---

## 📞 Support

If you need help with environment configuration:

1. Check Vercel deployment logs
2. Verify all required variables are set
3. Ensure variable scopes match deployment type
4. Test database connectivity separately
5. Check API key validity with provider dashboards

---

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

---

*Last Updated: November 21, 2025*
*Version: 2.0*
