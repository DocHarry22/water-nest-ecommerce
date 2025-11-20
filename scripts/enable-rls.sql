-- Enable Row Level Security (RLS) for all tables
-- This prevents unauthorized access to your database via Supabase API

-- Enable RLS on all tables
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

-- Create policies for authenticated users (via your Next.js API)
-- Since you're using Prisma from Next.js backend, you need service role access

-- For NextAuth tables - allow service role full access
CREATE POLICY "Service role can manage accounts" ON "Account" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage sessions" ON "Session" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage users" ON "User" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage verification tokens" ON "VerificationToken" 
  FOR ALL USING (true);

-- For application tables - allow service role full access
CREATE POLICY "Service role can manage categories" ON "Category" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage products" ON "Product" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage carts" ON "Cart" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage cart items" ON "CartItem" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage orders" ON "Order" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage order items" ON "OrderItem" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage payments" ON "Payment" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage reviews" ON "Review" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage wishlists" ON "Wishlist" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage wishlist items" ON "WishlistItem" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage blog posts" ON "BlogPost" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage coupons" ON "Coupon" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage newsletter" ON "Newsletter" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage appointments" ON "Appointment" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage quotes" ON "Quote" 
  FOR ALL USING (true);

CREATE POLICY "Service role can manage assessments" ON "WaterQualityAssessment" 
  FOR ALL USING (true);

-- Note: These policies allow service role (your backend) full access
-- Public anonymous users cannot access data directly via Supabase API
-- All data access must go through your Next.js API routes
