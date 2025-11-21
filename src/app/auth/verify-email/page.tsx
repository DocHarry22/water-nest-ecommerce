"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Loader2, Droplet } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  const verifyEmail = async () => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed");
      }
    } catch (error) {
      console.error("Email verification error:", error);
      setStatus("error");
      setMessage("An error occurred during verification");
    }
  };

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      return;
    }

    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardContent className="pt-6 text-center py-12">
              <Loader2 className="h-16 w-16 text-sky-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Verifying Your Email
              </h2>
              <p className="text-gray-600">
                Please wait while we verify your email address...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6 text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Email Verified!
              </h2>
              <p className="text-green-700 mb-6">
                {message}
              </p>
              <p className="text-sm text-green-600 mb-6">
                Redirecting to login page...
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
        </div>

        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              Verification Failed
            </CardTitle>
            <CardDescription className="text-center text-red-700">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-red-600">
              The verification link may be expired or invalid.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/auth/login">
                <Button size="lg" className="w-full">
                  Go to Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" variant="outline" className="w-full">
                  Register Again
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Badge variant="secondary" className="bg-sky-100 text-sky-700">
            Need help? Contact support
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
