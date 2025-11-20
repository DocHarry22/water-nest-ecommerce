# How to Enable Row Level Security (RLS) on Supabase

## ⚠️ The Warning

Supabase is alerting you that your tables are publicly accessible without Row Level Security (RLS) enabled. This is a security risk.

## 🔒 Quick Fix - Run in Supabase SQL Editor

1. **Go to your Supabase Dashboard**
   - Navigate to: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and paste this SQL** (from `scripts/enable-rls.sql`):

```sql
-- Enable Row Level Security on all tables
ALTER TABLE "Account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "VerificationToken" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Cart" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CartItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Order" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Wishlist" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WishlistItem" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Coupon" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Newsletter" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Appointment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Quote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WaterQualityAssessment" ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role (your backend) full access
CREATE POLICY "Service role can manage accounts" ON "Account" FOR ALL USING (true);
CREATE POLICY "Service role can manage sessions" ON "Session" FOR ALL USING (true);
CREATE POLICY "Service role can manage users" ON "User" FOR ALL USING (true);
CREATE POLICY "Service role can manage verification tokens" ON "VerificationToken" FOR ALL USING (true);
CREATE POLICY "Service role can manage categories" ON "Category" FOR ALL USING (true);
CREATE POLICY "Service role can manage products" ON "Product" FOR ALL USING (true);
CREATE POLICY "Service role can manage carts" ON "Cart" FOR ALL USING (true);
CREATE POLICY "Service role can manage cart items" ON "CartItem" FOR ALL USING (true);
CREATE POLICY "Service role can manage orders" ON "Order" FOR ALL USING (true);
CREATE POLICY "Service role can manage order items" ON "OrderItem" FOR ALL USING (true);
CREATE POLICY "Service role can manage payments" ON "Payment" FOR ALL USING (true);
CREATE POLICY "Service role can manage reviews" ON "Review" FOR ALL USING (true);
CREATE POLICY "Service role can manage wishlists" ON "Wishlist" FOR ALL USING (true);
CREATE POLICY "Service role can manage wishlist items" ON "WishlistItem" FOR ALL USING (true);
CREATE POLICY "Service role can manage blog posts" ON "BlogPost" FOR ALL USING (true);
CREATE POLICY "Service role can manage coupons" ON "Coupon" FOR ALL USING (true);
CREATE POLICY "Service role can manage newsletter" ON "Newsletter" FOR ALL USING (true);
CREATE POLICY "Service role can manage appointments" ON "Appointment" FOR ALL USING (true);
CREATE POLICY "Service role can manage quotes" ON "Quote" FOR ALL USING (true);
CREATE POLICY "Service role can manage assessments" ON "WaterQualityAssessment" FOR ALL USING (true);
```

4. **Click "Run"** (or press Ctrl+Enter)

5. **Verify** - The warning should disappear from your Supabase dashboard

## ✅ What This Does

- **Enables RLS** on all tables - prevents direct public access
- **Creates policies** that allow your Next.js backend (service role) full access
- **Blocks** unauthorized direct database access via Supabase API
- **Forces** all data access to go through your Next.js API routes (which is secure)

## 🔐 Security Benefits

✅ Users can't query your database directly via Supabase API  
✅ All authentication/authorization happens in your Next.js backend  
✅ Cart, orders, and user data are protected  
✅ Only your backend (with service role key) can access data

## ⚡ Will This Break Anything?

**No!** Your app will continue working exactly as before because:
- Your Prisma client uses the connection pooler with service role credentials
- Service role bypasses RLS policies automatically
- This only blocks unauthenticated public access

## 📚 Learn More

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Row Level Security Best Practices](https://supabase.com/docs/guides/database/postgres/row-level-security)
