-- Insert blog posts
-- First, get the admin user ID
DO $$
DECLARE
  admin_id text;
  staff_id text;
BEGIN
  -- Get admin user ID
  SELECT id INTO admin_id FROM users WHERE email = 'admin@waternest.com' LIMIT 1;
  
  -- Get staff user ID (create if doesn't exist)
  SELECT id INTO staff_id FROM users WHERE email = 'staff@waternest.com' LIMIT 1;
  
  IF staff_id IS NULL THEN
    INSERT INTO users (id, name, email, password, role, "emailVerified", phone, "createdAt", "updatedAt")
    VALUES (
      gen_random_uuid()::text,
      'Staff User',
      'staff@waternest.com',
      '$2a$10$YourHashedPasswordHere', -- You'll need to hash 'staff123'
      'STAFF',
      NOW(),
      '+27 53 723 3001',
      NOW(),
      NOW()
    )
    RETURNING id INTO staff_id;
  END IF;

  -- Insert blog posts
  INSERT INTO blog_posts (id, title, slug, excerpt, content, "authorId", published, featured, tags, "coverImage", "publishedAt", "createdAt", "updatedAt")
  VALUES
  (
    gen_random_uuid()::text,
    'The Ultimate Guide to Home Water Filtration Systems',
    'ultimate-guide-home-water-filtration',
    'Discover everything you need to know about choosing the right water filtration system for your home.',
    'Water quality is essential for the health and wellbeing of your family...',
    admin_id,
    true,
    true,
    ARRAY['water filtration', 'home improvement', 'health'],
    'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200',
    '2025-11-10'::timestamp,
    NOW(),
    NOW()
  ),
  (
    gen_random_uuid()::text,
    'Why Regular Water Testing is Essential for Your Business',
    'why-regular-water-testing-essential',
    'Learn why regular water quality testing is crucial for businesses and how it can save you money in the long run.',
    'Regular water testing is not just a regulatory requirement...',
    admin_id,
    true,
    false,
    ARRAY['water testing', 'business', 'compliance'],
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200',
    '2025-11-08'::timestamp,
    NOW(),
    NOW()
  );
END $$;
