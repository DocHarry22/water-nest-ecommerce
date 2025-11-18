export const siteConfig = {
  name: "Water Nest",
  description: "Premium Water Treatment Solutions & Services",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  links: {
    twitter: "https://twitter.com/waternest",
    facebook: "https://facebook.com/waternest",
    instagram: "https://instagram.com/waternest",
    linkedin: "https://linkedin.com/company/waternest",
  },
  contact: {
    email: "info@waternest.com",
    phone: "+1 (555) 123-4567",
    address: "123 Water Street, City, State 12345",
  },
};

export const navConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Shop",
      href: "/shop",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  customerNav: [
    {
      title: "Dashboard",
      href: "/customer/dashboard",
    },
    {
      title: "Orders",
      href: "/customer/orders",
    },
    {
      title: "Appointments",
      href: "/customer/appointments",
    },
    {
      title: "Wishlist",
      href: "/customer/wishlist",
    },
    {
      title: "Profile",
      href: "/customer/profile",
    },
  ],
  adminNav: [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      title: "Products",
      href: "/admin/products",
    },
    {
      title: "Orders",
      href: "/admin/orders",
    },
    {
      title: "Customers",
      href: "/admin/customers",
    },
    {
      title: "Appointments",
      href: "/admin/appointments",
    },
    {
      title: "Inventory",
      href: "/admin/inventory",
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
    },
    {
      title: "Content",
      href: "/admin/content",
    },
    {
      title: "Settings",
      href: "/admin/settings",
    },
  ],
};

export const productCategories = [
  {
    id: "water-filters",
    name: "Water Filters",
    slug: "water-filters",
    description: "High-quality water filtration systems for home and office",
  },
  {
    id: "purification-systems",
    name: "Purification Systems",
    slug: "purification-systems",
    description: "Advanced water purification technology",
  },
  {
    id: "portable-treatment-plants",
    name: "Portable Treatment Plants",
    slug: "portable-treatment-plants",
    description: "Mobile and containerized water treatment solutions",
  },
  {
    id: "specialized-equipment",
    name: "Specialized Equipment",
    slug: "specialized-equipment",
    description: "Ice machines, softeners, hydrocoolers, hydroboils, and chemicals",
  },
  {
    id: "replacement-parts",
    name: "Replacement Parts",
    slug: "replacement-parts",
    description: "Filters, cartridges, and critical spares",
  },
  {
    id: "testing-kits",
    name: "Testing Kits",
    slug: "testing-kits",
    description: "Water quality testing and monitoring devices",
  },
  {
    id: "commercial-solutions",
    name: "Commercial Solutions",
    slug: "commercial-solutions",
    description: "Large-scale water treatment for businesses",
  },
];

export const serviceCategories = [
  {
    id: "installation",
    name: "Installation Services",
    slug: "installation",
    description: "Professional installation of water treatment systems",
  },
  {
    id: "borehole-drilling",
    name: "Borehole Drilling",
    slug: "borehole-drilling",
    description: "Complete borehole drilling and water source development",
  },
  {
    id: "portable-treatment",
    name: "Portable Treatment Plants",
    slug: "portable-treatment",
    description: "Mobile water treatment solutions - rental and sales",
  },
  {
    id: "wastewater-treatment",
    name: "Wastewater Treatment Plants",
    slug: "wastewater-treatment",
    description: "WWTP audit, operations, and maintenance services",
  },
  {
    id: "maintenance",
    name: "Maintenance & Repair",
    slug: "maintenance",
    description: "Regular maintenance and repair services",
  },
  {
    id: "water-testing",
    name: "Water Quality Testing",
    slug: "water-testing",
    description: "Comprehensive water analysis and testing",
  },
  {
    id: "consultation",
    name: "Consultation",
    slug: "consultation",
    description: "Expert advice on water treatment solutions",
  },
  {
    id: "emergency",
    name: "Emergency Services",
    slug: "emergency",
    description: "24/7 emergency water treatment support",
  },
];
