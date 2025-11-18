"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, AlertCircle, Droplet, CheckCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
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

    if (!token) {
      setError("Invalid reset token");
      setLoading(false);
      return;
    }

    // Simulate password reset
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Password Reset Successful!
              </h2>
              <p className="text-green-700 mb-6">
                Your password has been successfully reset.
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
            Set New Password
          </h2>
          <p className="text-gray-600">
            Enter your new password below
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
            <CardDescription className="text-center">
              Choose a strong password for your account
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

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="text-gray-900 font-medium">
                  New Password *
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
                <p className="text-xs text-gray-600 mt-1">
                  Use at least 8 characters with a mix of letters, numbers & symbols
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-900 font-medium">
                  Confirm New Password *
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

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Resetting password..." : "Reset Password"}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link 
                href="/auth/login" 
                className="text-sm text-sky-600 hover:text-sky-700 font-medium"
              >
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
