import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Categories
  console.log('Creating categories...');
  const waterTreatmentCategory = await prisma.category.upsert({
    where: { slug: 'water-treatment' },
    update: {},
    create: {
      name: 'Water Treatment',
      slug: 'water-treatment',
      description: 'Complete water treatment systems and solutions',
      published: true,
    },
  });

  const filtersCategory = await prisma.category.upsert({
    where: { slug: 'filters' },
    update: {},
    create: {
      name: 'Filters & Cartridges',
      slug: 'filters',
      description: 'Replacement filters and cartridges for all systems',
      published: true,
    },
  });

  const servicesCategory = await prisma.category.upsert({
    where: { slug: 'services' },
    update: {},
    create: {
      name: 'Services',
      slug: 'services',
      description: 'Professional water treatment services',
      published: true,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'chemicals' },
    update: {},
    create: {
      name: 'Chemicals',
      slug: 'chemicals',
      description: 'Water treatment chemicals and additives',
      published: true,
    },
  });

  // Create Products
  console.log('Creating products...');
  
  const roSystem = await prisma.product.upsert({
    where: { slug: 'reverse-osmosis-system-5-stage' },
    update: {},
    create: {
      name: 'Reverse Osmosis System - 5 Stage',
      slug: 'reverse-osmosis-system-5-stage',
      description: 'Complete 5-stage reverse osmosis water filtration system. Removes up to 99% of contaminants including chlorine, fluoride, heavy metals, and dissolved solids. Includes sediment filter, carbon filters, RO membrane, and post-carbon filter. Perfect for homes and small businesses.',
      shortDescription: 'Professional-grade 5-stage RO system for pure drinking water',
      price: 4500.00,
      compareAtPrice: 5500.00,
      cost: 2800.00,
      sku: 'RO-5STAGE-001',
      stock: 25,
      categoryId: waterTreatmentCategory.id,
      type: 'PHYSICAL',
      featured: true,
      published: true,
      images: [
        'https://images.unsplash.com/photo-1625245488600-f89d8c6b42c1?w=800',
        'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=800',
      ],
      specifications: {
        capacity: '50 GPD',
        stages: 5,
        dimensions: '14" x 5" x 17"',
        warranty: '3 years',
        certifications: ['NSF/ANSI 58', 'WQA Gold Seal'],
      },
      tags: ['reverse-osmosis', 'filtration', 'drinking-water', 'featured'],
      weight: 8.5,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'water-softener-32000-grain' },
    update: {},
    create: {
      name: 'Water Softener - 32,000 Grain',
      slug: 'water-softener-32000-grain',
      description: 'High-efficiency water softener system designed to remove hard water minerals. Digital control head with automatic regeneration. Ideal for families of 3-4 people. Reduces scale buildup, extends appliance life, and improves water quality.',
      shortDescription: '32,000 grain capacity softener for whole-home protection',
      price: 12500.00,
      compareAtPrice: 15000.00,
      cost: 8000.00,
      sku: 'WS-32K-001',
      stock: 15,
      categoryId: waterTreatmentCategory.id,
      type: 'PHYSICAL',
      featured: true,
      published: true,
      images: [
        'https://images.unsplash.com/photo-1585129777188-94600bc7953b?w=800',
      ],
      specifications: {
        capacity: '32,000 grains',
        flowRate: '10 GPM',
        saltCapacity: '250 lbs',
        regeneration: 'Automatic',
        warranty: '5 years',
      },
      tags: ['water-softener', 'hard-water', 'whole-home'],
      weight: 85.0,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'sediment-filter-5-micron' },
    update: {},
    create: {
      name: 'Sediment Filter - 5 Micron (3-Pack)',
      slug: 'sediment-filter-5-micron',
      description: '5-micron sediment pre-filters. Removes dirt, rust, sand, and particles. Compatible with standard 10-inch housings. Long-lasting performance. Pack of 3 filters.',
      shortDescription: 'High-quality 5-micron sediment filters',
      price: 450.00,
      cost: 200.00,
      sku: 'SF-5M-3PK',
      stock: 150,
      categoryId: filtersCategory.id,
      type: 'PHYSICAL',
      featured: false,
      published: true,
      images: [
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
      ],
      specifications: {
        micron: '5',
        length: '10 inches',
        material: 'Polypropylene',
        lifespan: '3-6 months',
      },
      tags: ['filter', 'sediment', 'replacement'],
      weight: 0.5,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'carbon-block-filter' },
    update: {},
    create: {
      name: 'Carbon Block Filter - Premium',
      slug: 'carbon-block-filter',
      description: 'Premium activated carbon block filter. Removes chlorine, bad taste, odor, and organic contaminants. NSF certified. Compatible with standard 10-inch housings.',
      shortDescription: 'Premium carbon filter for taste and odor removal',
      price: 650.00,
      cost: 300.00,
      sku: 'CBF-10-001',
      stock: 100,
      categoryId: filtersCategory.id,
      type: 'PHYSICAL',
      featured: false,
      published: true,
      images: [
        'https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=800',
      ],
      specifications: {
        length: '10 inches',
        material: 'Activated Carbon',
        certification: 'NSF/ANSI 42',
        lifespan: '6 months',
      },
      tags: ['filter', 'carbon', 'chlorine-removal'],
      weight: 0.8,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'water-quality-testing' },
    update: {},
    create: {
      name: 'Comprehensive Water Quality Testing',
      slug: 'water-quality-testing',
      description: 'Professional water testing service. Tests for 20+ parameters including bacteria, minerals, pH, hardness, and contaminants. Includes detailed report with recommendations. Results within 5-7 business days.',
      shortDescription: 'Professional water analysis and testing',
      price: 850.00,
      cost: 400.00,
      sku: 'SVC-TEST-001',
      stock: 999,
      categoryId: servicesCategory.id,
      type: 'SERVICE',
      featured: true,
      published: true,
      images: [
        'https://images.unsplash.com/photo-1581093458791-9d42e3c7e441?w=800',
      ],
      specifications: {
        parameters: '20+',
        turnaround: '5-7 business days',
        format: 'Digital PDF report',
      },
      tags: ['testing', 'service', 'analysis'],
      weight: 0,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'borehole-chlorination' },
    update: {},
    create: {
      name: 'Borehole Chlorination Service',
      slug: 'borehole-chlorination',
      description: 'Professional borehole chlorination and disinfection service. Includes bacteria testing before and after treatment, complete chlorination procedure, and water quality certification. Essential for maintaining safe drinking water from boreholes.',
      shortDescription: 'Complete borehole disinfection and testing',
      price: 2500.00,
      cost: 1200.00,
      sku: 'SVC-CHLOR-001',
      stock: 999,
      categoryId: servicesCategory.id,
      type: 'SERVICE',
      featured: false,
      published: true,
      images: [
        'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=800',
      ],
      specifications: {
        duration: '2-4 hours',
        includes: ['Pre-test', 'Chlorination', 'Post-test', 'Certificate'],
        validity: 'Annual',
      },
      tags: ['service', 'borehole', 'chlorination', 'testing'],
      weight: 0,
    },
  });

  // Create Admin User
  console.log('Creating admin user...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@waternest.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@waternest.com',
      password: hashedPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
      phone: '+27 53 723 3000',
    },
  });

  // Create Staff User
  console.log('Creating staff user...');
  const staffPassword = await bcrypt.hash('staff123', 10);
  
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@waternest.com' },
    update: {},
    create: {
      name: 'Staff User',
      email: 'staff@waternest.com',
      password: staffPassword,
      role: 'STAFF',
      emailVerified: new Date(),
      phone: '+27 53 723 3001',
    },
  });

  // Create Sample Customer
  console.log('Creating sample customer...');
  const customerPassword = await bcrypt.hash('customer123', 10);
  
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'John Smith',
      email: 'customer@example.com',
      password: customerPassword,
      role: 'CUSTOMER',
      emailVerified: new Date(),
      phone: '+27 82 123 4567',
    },
  });

  // Create Sample Reviews
  console.log('Creating sample reviews...');
  await prisma.review.create({
    data: {
      productId: roSystem.id,
      userId: customer.id,
      rating: 5,
      title: 'Excellent water quality!',
      comment: 'The RO system has transformed our water quality. Installation was straightforward and the water tastes amazing. Highly recommend!',
      verified: true,
      published: true,
      helpfulCount: 12,
    },
  });

  // Create Newsletter Subscribers
  console.log('Creating newsletter subscribers...');
  await prisma.newsletter.createMany({
    data: [
      { email: 'subscriber1@example.com' },
      { email: 'subscriber2@example.com' },
      { email: 'subscriber3@example.com' },
    ],
    skipDuplicates: true,
  });

  // Create Sample Coupon
  console.log('Creating sample coupon...');
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {},
    create: {
      code: 'WELCOME10',
      description: '10% off your first order',
      type: 'PERCENTAGE',
      value: 10,
      minPurchase: 1000,
      maxDiscount: 2000,
      usageLimit: 100,
      active: true,
      expiresAt: new Date('2026-12-31'),
    },
  });

  // Create Blog Posts
  console.log('Creating blog posts...');
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'The Ultimate Guide to Home Water Filtration Systems',
        slug: 'ultimate-guide-home-water-filtration',
        excerpt: 'Discover everything you need to know about choosing the right water filtration system for your home.',
        content: `Water quality is essential for the health and wellbeing of your family. In this comprehensive guide, we'll explore different types of home water filtration systems and help you choose the best one for your needs.

## Types of Water Filtration Systems

### 1. Reverse Osmosis Systems
Reverse osmosis (RO) systems are among the most effective water filtration methods available. They remove up to 99% of contaminants including:
- Heavy metals
- Fluoride
- Chlorine
- Dissolved solids
- Bacteria and viruses

### 2. Carbon Filters
Activated carbon filters are excellent for removing chlorine, sediment, and organic compounds that affect taste and odor.

### 3. UV Purification
UV systems use ultraviolet light to kill bacteria and viruses without adding chemicals to your water.

## Choosing the Right System

Consider these factors when selecting a water filtration system:
1. Water quality test results
2. Family size and water usage
3. Budget
4. Maintenance requirements
5. Installation space

Contact Water Nest today for a free water quality assessment and personalized recommendations!`,
        authorId: adminUser.id,
        published: true,
        featured: true,
        tags: ['water filtration', 'home improvement', 'health'],
        coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=1200',
        publishedAt: new Date('2025-11-10'),
      },
      {
        title: 'Why Regular Water Testing is Essential for Your Business',
        slug: 'why-regular-water-testing-essential',
        excerpt: 'Learn why regular water quality testing is crucial for businesses and how it can save you money in the long run.',
        content: `Regular water testing is not just a regulatory requirement—it's a smart business decision that can protect your equipment, ensure product quality, and safeguard your reputation.

## Benefits of Regular Water Testing

### 1. Equipment Protection
Poor water quality can damage expensive equipment:
- Scale buildup in boilers and cooling systems
- Corrosion of pipes and fixtures
- Reduced efficiency of water-using appliances

### 2. Compliance and Safety
Regular testing ensures you meet:
- Health department regulations
- Environmental standards
- Industry-specific requirements

### 3. Cost Savings
Early detection of water quality issues can prevent:
- Costly equipment repairs
- Production downtime
- Product recalls
- Legal liabilities

## What to Test For

Depending on your industry, you may need to test for:
- pH levels
- Total dissolved solids (TDS)
- Hardness
- Chlorine levels
- Bacteria and pathogens
- Heavy metals
- Organic compounds

## Testing Frequency

We recommend:
- Monthly testing for high-risk industries
- Quarterly testing for most businesses
- Annual comprehensive analysis
- Immediate testing if you notice changes in water appearance, taste, or odor

Schedule your water quality assessment with Water Nest today!`,
        authorId: adminUser.id,
        published: true,
        tags: ['water testing', 'business', 'compliance'],
        coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200',
        publishedAt: new Date('2025-11-08'),
      },
      {
        title: '5 Signs Your Water Softener Needs Maintenance',
        slug: 'signs-water-softener-needs-maintenance',
        excerpt: 'Is your water softener not performing as well as it used to? Here are 5 telltale signs it needs professional maintenance.',
        content: `Water softeners are essential for protecting your plumbing and appliances from hard water damage. But like any equipment, they require regular maintenance to function properly.

## 5 Warning Signs

### 1. Hard Water Symptoms Return
If you notice:
- Scale buildup on fixtures
- Soap scum in shower
- Spots on dishes
- Stiff laundry

Your softener may not be regenerating properly.

### 2. Salt Bridge Formation
A hard crust of salt forms above the water in the brine tank, preventing proper regeneration.

### 3. Reduced Water Pressure
Resin beads can clog or deteriorate over time, reducing water flow.

### 4. Salt Mushing
Salt dissolves and forms thick sludge at the bottom of the brine tank.

### 5. Discolored or Cloudy Water
May indicate resin bed problems or bacterial growth in the tank.

## Maintenance Schedule

- Monthly: Check salt levels
- Quarterly: Clean brine tank
- Annually: Professional inspection
- Every 5-10 years: Replace resin bed

Don't wait for a complete breakdown—schedule preventive maintenance with Water Nest today!`,
        authorId: staffUser.id,
        published: true,
        tags: ['water softener', 'maintenance', 'troubleshooting'],
        coverImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200',
        publishedAt: new Date('2025-11-05'),
      },
      {
        title: 'Borehole Water vs Municipal Water: Which is Better?',
        slug: 'borehole-vs-municipal-water',
        excerpt: 'Comparing the pros and cons of borehole water and municipal supply to help you make an informed decision.',
        content: `Many homeowners and businesses are considering borehole water as an alternative to municipal supply. Let's examine the advantages and disadvantages of each option.

## Borehole Water

### Advantages:
- Independence from municipal supply
- No monthly water bills
- Often better mineral content
- Reliable supply during outages
- Long-term cost savings

### Disadvantages:
- High initial drilling costs
- Quality varies by location
- Requires filtration and treatment
- Maintenance responsibility
- Not available everywhere

## Municipal Water

### Advantages:
- Regulated quality standards
- No upfront capital investment
- Professional maintenance
- Widely available
- Guaranteed supply (mostly)

### Disadvantages:
- Monthly bills
- Subject to restrictions
- Chlorine and additives
- Potential supply interruptions
- Price increases

## Cost Comparison

**Borehole Installation**: R50,000 - R150,000
- Drilling
- Pump and tank
- Filtration system
- Electrical work

**Municipal Supply**: R500 - R3,000/month
- Depends on usage
- Increasing rates
- Connection fees

**Break-even**: Typically 3-5 years for residential, 1-3 years for commercial

## Making Your Decision

Consider:
1. Your location and water table depth
2. Current water usage and costs
3. Quality of municipal supply
4. Long-term plans for property
5. Environmental concerns

Contact Water Nest for a free borehole feasibility assessment!`,
        authorId: adminUser.id,
        published: true,
        featured: true,
        tags: ['borehole', 'municipal water', 'comparison'],
        coverImage: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200',
        publishedAt: new Date('2025-11-01'),
      },
      {
        title: 'Understanding Water Quality: What Do the Numbers Mean?',
        slug: 'understanding-water-quality-numbers',
        excerpt: 'A beginner-friendly guide to interpreting your water quality test results and understanding what they mean for your health.',
        content: `Received your water quality test results but confused by all the numbers? This guide will help you understand what each parameter means and why it matters.

## Key Water Quality Parameters

### pH (6.5 - 8.5)
- Measures acidity or alkalinity
- Affects taste and corrosion
- Too low: Corrosive, metallic taste
- Too high: Bitter taste, scale formation

### TDS - Total Dissolved Solids (< 500 mg/L)
- Minerals, salts, metals in water
- Affects taste and appearance
- High levels may indicate contamination

### Hardness (< 120 mg/L)
- Calcium and magnesium content
- Causes scale buildup
- Affects soap effectiveness

### Chlorine (0.5 - 4 mg/L)
- Disinfectant in municipal water
- Safe but affects taste
- Can be removed with carbon filters

### Bacteria (0 CFU/mL)
- E. coli and coliform bacteria
- Any detection requires immediate action
- Indicates contamination

### Nitrates (< 10 mg/L)
- From fertilizers and waste
- Dangerous for infants
- Common in agricultural areas

### Heavy Metals
- Lead: < 0.015 mg/L
- Arsenic: < 0.01 mg/L
- Mercury: < 0.002 mg/L
- Harmful at any level

## What to Do With Your Results

### If Results Are Normal:
- Continue regular testing
- Maintain filtration systems
- Monitor for changes

### If Results Show Problems:
1. Stop drinking the water
2. Identify the source
3. Install appropriate treatment
4. Retest after treatment

### Common Solutions:
- pH adjustment: Neutralizing filters
- High TDS: Reverse osmosis
- Hardness: Water softener
- Bacteria: UV sterilization or chlorination
- Heavy metals: Specialized filters

## Testing Frequency

- Private wells: Every 6-12 months
- Boreholes: Annually
- After repairs or flooding: Immediately
- If taste/odor changes: Immediately

Get professional water testing and treatment recommendations from Water Nest!`,
        authorId: staffUser.id,
        published: true,
        tags: ['water quality', 'testing', 'education'],
        coverImage: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200',
        publishedAt: new Date('2025-10-28'),
      },
    ],
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
