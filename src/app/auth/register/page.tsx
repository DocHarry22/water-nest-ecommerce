"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock, User, Building, Phone, AlertCircle, Droplet, Chrome, CheckCircle, Facebook } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (!formData.acceptTerms) {
      setError("You must accept the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      // Register user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          company: formData.company,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "google" | "facebook" | "microsoft-entra-id") => {
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl: "/" });
    } catch (err) {
      console.error(`${provider} sign up error:`, err);
      setError("Failed to sign up with social provider");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Account Created Successfully!
              </h2>
              <p className="text-green-700 mb-6">
                We&apos;ve sent a verification email to {formData.email}
              </p>
              <Link href="/auth/login">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Sign In Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-sky-600 rounded-full flex items-center justify-center">
              <Droplet className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Water Nest</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join thousands of satisfied customers
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-900">Error</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Name Field */}
              <div>
                <Label htmlFor="name" className="text-gray-900 font-medium">
                  Full Name *
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="name"
                    type="text"
                    required
                    placeholder="John Doe"
                    className="pl-10 placeholder:text-gray-500"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-gray-900 font-medium">
                  Email Address *
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="pl-10 placeholder:text-gray-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <Label htmlFor="phone" className="text-gray-900 font-medium">
                  Phone Number
                </Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+27 11 123 4567"
                    className="pl-10 placeholder:text-gray-500"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Company Field */}
              <div>
                <Label htmlFor="company" className="text-gray-900 font-medium">
                  Company Name
                </Label>
                <div className="relative mt-1">
                  <Building className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your Company"
                    className="pl-10 placeholder:text-gray-500"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="text-gray-900 font-medium">
                  Password *
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Minimum 8 characters"
                    className="pl-10 placeholder:text-gray-500"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">
                  Confirm Password *
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    placeholder="Re-enter password"
                    className="pl-10 placeholder:text-gray-500"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-600 mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="/terms" className="text-sky-600 hover:text-sky-700 font-medium">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-sky-600 hover:text-sky-700 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Signup Options */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => handleSocialSignUp("google")}
                disabled={loading}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Sign up with Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => handleSocialSignUp("facebook")}
                disabled={loading}
              >
                <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                Sign up with Facebook
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => handleSocialSignUp("microsoft-entra-id")}
                disabled={loading}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
                  <path d="M0 0h11v11H0V0z" fill="#F25022"/>
                  <path d="M12 0h11v11H12V0z" fill="#7FBA00"/>
                  <path d="M0 12h11v11H0V12z" fill="#00A4EF"/>
                  <path d="M12 12h11v11H12V12z" fill="#FFB900"/>
                </svg>
                Sign up with Microsoft
              </Button>
            </div>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-sky-600 hover:text-sky-700">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center">
          <Badge variant="secondary" className="bg-sky-100 text-sky-700">
            Your data is protected with industry-standard encryption
          </Badge>
        </div>
      </div>
    </div>
  );
}
