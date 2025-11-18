# Water Nest E-Commerce Platform

A comprehensive, full-stack e-commerce platform for Water Nest - specializing in water treatment solutions, purification systems, and related services.

## 🚀 Technology Stack

### Core
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5

### Key Libraries
- **UI Components**: Custom components built with Radix UI primitives
- **Form Handling**: React Hook Form + Zod validation
- **Payment Processing**: Stripe
- **Email**: SendGrid/Resend
- **Icons**: Lucide React
- **Charts**: Recharts
- **Date Handling**: date-fns

## 📁 Project Structure

```
water-nest-ecommerce/
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── api/             # API routes
│   │   ├── auth/            # Authentication pages
│   │   ├── admin/           # Admin panel
│   │   ├── customer/        # Customer dashboard
│   │   ├── products/        # Product pages
│   │   ├── services/        # Services pages
│   │   └── layout.tsx       # Root layout
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   └── layout/         # Layout components
│   ├── lib/                 # Utility functions
│   │   ├── auth.ts         # NextAuth configuration
│   │   ├── prisma.ts       # Prisma client
│   │   ├── utils.ts        # Helper functions
│   │   └── validations.ts  # Zod schemas
│   ├── config/             # Configuration files
│   │   └── site.ts         # Site configuration
│   └── types/              # TypeScript type definitions
├── .env                     # Environment variables
└── package.json            # Dependencies
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/waternest"
     NEXTAUTH_URL="http://localhost:3000"
     NEXTAUTH_SECRET="your-secret-key"
     ```

3. **Set up the database**
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

The platform includes comprehensive models for:
- **User Management**: Users, Accounts, Sessions
- **Products**: Products, Categories, Variants, Inventory
- **Orders**: Orders, Order Items, Payments
- **Shopping**: Cart, Wishlist
- **Services**: Appointments, Quotes
- **Content**: Blog Posts, Reviews
- **Marketing**: Coupons, Newsletters
- **Custom**: Water Quality Assessments

## 🎨 Features Implemented (Tasks 1-4)

### ✅ Task 1: Project Setup & Configuration
- [x] Next.js 15 with TypeScript
- [x] Tailwind CSS v4 configuration
- [x] ESLint setup
- [x] Environment variables
- [x] Project structure with App Router
- [x] Git repository initialized

### ✅ Task 2: Database Schema Design & Setup
- [x] Comprehensive Prisma schema
- [x] User authentication models
- [x] Product and inventory models
- [x] Order and payment models
- [x] Shopping cart and wishlist
- [x] Appointment and quote systems
- [x] Review and rating system
- [x] Blog and content models
- [x] Water assessment models
- [x] Prisma Client generated

### ✅ Task 3: Authentication System Implementation
- [x] NextAuth.js v5 configuration
- [x] Credentials provider (email/password)
- [x] Google OAuth provider
- [x] JWT session strategy
- [x] Role-based access control (CUSTOMER, ADMIN, STAFF)
- [x] Protected routes setup
- [x] Session management
- [x] TypeScript type definitions

### ✅ Task 4: Core UI Components Library
- [x] Button component with variants
- [x] Input component
- [x] Textarea component
- [x] Card components (Card, CardHeader, CardTitle, etc.)
- [x] Badge component with variants
- [x] Loading spinner
- [x] Skeleton loader
- [x] Navbar with navigation
- [x] Footer with links and newsletter
- [x] Utility functions (cn, formatCurrency, formatDate, etc.)

## 🌐 Available Routes

### Public Routes
- `/` - Home page with hero section and featured products
- `/products` - Product catalog
- `/services` - Services catalog
- `/about` - About page
- `/contact` - Contact page
- `/shop` - Shop page

### Authentication
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Customer Dashboard
- `/customer/dashboard` - Customer overview
- `/customer/orders` - Order history
- `/customer/appointments` - Service appointments
- `/customer/profile` - Profile management

### Admin Panel
- `/admin/dashboard` - Admin overview
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/customers` - Customer management
- `/admin/appointments` - Appointment management
- `/admin/analytics` - Analytics and reports

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio (database GUI)
npx prisma generate  # Generate Prisma Client
npx prisma migrate dev  # Run migrations
npx prisma db push   # Push schema to database
```

## 🎯 Next Steps

Continue with remaining tasks (5-47) to build out:
- Complete home page with dynamic content
- Product catalog with filtering and search
- Shopping cart and checkout flow
- Payment integration with Stripe
- Customer and admin dashboards
- Service booking system
- And much more...

## 📝 Configuration Files

### Site Configuration (`src/config/site.ts`)
- Site metadata and branding
- Navigation menus (main, customer, admin)
- Product categories
- Service categories
- Contact information
- Social media links

### Validation Schemas (`src/lib/validations.ts`)
- Login and registration
- Product management
- Order checkout
- Service booking
- Quote requests
- Reviews and ratings
- Newsletter subscription
- Water quality assessment

## 🔒 Environment Variables

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - NextAuth secret key

Optional variables:
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `STRIPE_SECRET_KEY` - Stripe payments
- `EMAIL_SERVER_*` - Email service configuration

## 🖼️ Image Usage

The website uses high-quality stock images from Unsplash for:
- Hero sections
- Product demonstrations
- Service showcases
- Background imagery
- Feature illustrations

All images are optimized using Next.js Image component for performance.

## 📄 License

Copyright © 2025 Water Nest. All rights reserved.

## 👥 Support

For support, email info@waternest.com or visit our contact page.

---

Built with ❤️ using Next.js 15, TypeScript, and Tailwind CSS
