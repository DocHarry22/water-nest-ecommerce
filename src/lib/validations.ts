import { z } from "zod";

// User schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Product schemas
export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  compareAtPrice: z.number().optional(),
  categoryId: z.string(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  sku: z.string().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  specifications: z.record(z.string(), z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

// Order schemas
export const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  shippingAddress: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().min(5, "Valid ZIP code required"),
    country: z.string().min(2, "Country is required"),
  }),
  billingAddress: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().min(5, "Valid ZIP code required"),
    country: z.string().min(2, "Country is required"),
  }).optional(),
  sameAsShipping: z.boolean().default(true),
  notes: z.string().optional(),
});

// Service booking schemas
export const bookingSchema = z.object({
  serviceId: z.string(),
  date: z.date(),
  timeSlot: z.string(),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    zipCode: z.string().min(5, "Valid ZIP code required"),
  }),
  notes: z.string().optional(),
});

// Quote request schemas
export const quoteRequestSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  company: z.string().optional(),
  projectType: z.string(),
  description: z.string().min(20, "Please provide more details about your project"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Review schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, "Title must be at least 5 characters"),
  comment: z.string().min(10, "Review must be at least 10 characters"),
  images: z.array(z.string()).optional(),
});

// Newsletter schema
export const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Water quality assessment schema
export const waterAssessmentSchema = z.object({
  location: z.string(),
  waterSource: z.enum(["municipal", "well", "other"]),
  issues: z.array(z.string()),
  hardness: z.number().optional(),
  chlorine: z.number().optional(),
  ph: z.number().optional(),
  tds: z.number().optional(),
  additionalNotes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type WaterAssessmentInput = z.infer<typeof waterAssessmentSchema>;
