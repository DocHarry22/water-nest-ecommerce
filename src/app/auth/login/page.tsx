"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Lock, AlertCircle, Droplet, Chrome, Facebook } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "facebook" | "microsoft-entra-id") => {
    setLoading(true);
    try {
      await signIn(provider, { callbackUrl });
    } catch (err) {
      console.error(`${provider} sign in error:`, err);
      setError("Failed to sign in with social provider");
      setLoading(false);
    }
  };

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
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your account
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

              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-gray-900 font-medium">
                  Email Address
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

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password" className="text-gray-900 font-medium">
                    Password
                  </Label>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="pl-10 placeholder:text-gray-500"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 border-gray-300 rounded focus:ring-sky-600"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
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

            {/* Social Login Options */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => handleSocialSignIn("google")}
                disabled={loading}
              >
                <Chrome className="mr-2 h-5 w-5" />
                Sign in with Google
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => handleSocialSignIn("facebook")}
                disabled={loading}
              >
                <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                Sign in with Facebook
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => handleSocialSignIn("microsoft-entra-id")}
                disabled={loading}
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 23 23" fill="none">
                  <path d="M0 0h11v11H0V0z" fill="#F25022"/>
                  <path d="M12 0h11v11H12V0z" fill="#7FBA00"/>
                  <path d="M0 12h11v11H0V12z" fill="#00A4EF"/>
                  <path d="M12 12h11v11H12V12z" fill="#FFB900"/>
                </svg>
                Sign in with Microsoft
              </Button>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="font-medium text-sky-600 hover:text-sky-700">
                  Create an account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center">
          <Badge variant="secondary" className="bg-sky-100 text-sky-700">
            Secure login with 256-bit SSL encryption
          </Badge>
        </div>
      </div>
    </div>
  );
}
