"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  MapPin,
  Clock,
  AlertTriangle,
  Trash2,
  Loader2,
  Shield,
} from "lucide-react";

interface Session {
  id: string;
  sessionToken: string;
  expires: string;
  ipAddress?: string;
  userAgent?: string;
  device?: string;
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  lastActive: string;
}

export default function ActiveSessionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [revoking, setRevoking] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/account/sessions");
      return;
    }

    if (status === "authenticated") {
      fetchSessions();
    }
  }, [status, router]);

  const fetchSessions = async () => {
    try {
      const response = await fetch("/api/account/sessions");
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setLoading(false);
    }
  };

  const revokeSession = async (sessionId: string) => {
    if (!confirm("Are you sure you want to revoke this session? The device will be logged out.")) {
      return;
    }

    setRevoking(sessionId);
    try {
      const response = await fetch(`/api/account/sessions?sessionId=${sessionId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchSessions();
      } else {
        alert("Failed to revoke session");
      }
    } catch (error) {
      console.error("Failed to revoke session:", error);
      alert("An error occurred");
    } finally {
      setRevoking(null);
    }
  };

  const revokeAllSessions = async () => {
    if (!confirm("Are you sure you want to revoke ALL sessions? You will be logged out and need to sign in again.")) {
      return;
    }

    try {
      const response = await fetch("/api/account/sessions?revokeAll=true", {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push("/auth/login");
      } else {
        alert("Failed to revoke sessions");
      }
    } catch (error) {
      console.error("Failed to revoke all sessions:", error);
      alert("An error occurred");
    }
  };

  const getDeviceIcon = (device?: string) => {
    switch (device?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-5 w-5" />;
      case "tablet":
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  };

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-sky-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-sky-600" />
            <h1 className="text-3xl font-bold text-gray-900">Active Sessions</h1>
          </div>
          <p className="text-gray-600">
            Manage devices and locations where you&apos;re signed in to your Water Nest account
          </p>
        </div>

        {/* Security Alert */}
        <Card className="mb-6 border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900">Security Tip</p>
                <p className="text-sm text-amber-700">
                  If you see a session you don&apos;t recognize, revoke it immediately and change your password.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Sessions</p>
                  <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
                </div>
                <Monitor className="h-8 w-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Account Email</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{session?.user?.email}</p>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center justify-center">
              <Button
                variant="destructive"
                onClick={revokeAllSessions}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Revoke All Sessions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sessions List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Active Sessions</CardTitle>
            <CardDescription>
              Sessions expire after 30 days of inactivity or when you sign out
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active sessions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sessions.map((sess, index) => (
                  <div
                    key={sess.id}
                    className={`p-4 border rounded-lg ${
                      index === 0 ? "border-sky-200 bg-sky-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-2 bg-white rounded-lg border">
                          {getDeviceIcon(sess.device)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-900">
                              {sess.browser || "Unknown Browser"} on {sess.os || "Unknown OS"}
                            </p>
                            {index === 0 && (
                              <Badge className="bg-sky-600">Current Session</Badge>
                            )}
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            {sess.device && (
                              <p className="flex items-center gap-2">
                                {getDeviceIcon(sess.device)}
                                {sess.device}
                              </p>
                            )}
                            {(sess.city || sess.country) && (
                              <p className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {sess.city}, {sess.country}
                              </p>
                            )}
                            {sess.ipAddress && (
                              <p className="flex items-center gap-2">
                                <Globe className="h-4 w-4" />
                                {sess.ipAddress}
                              </p>
                            )}
                            <p className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Last active: {getTimeAgo(sess.lastActive)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Expires: {new Date(sess.expires).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      {index !== 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => revokeSession(sess.id)}
                          disabled={revoking === sess.id}
                        >
                          {revoking === sess.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Revoke
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Recommendations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Security Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                Review your active sessions regularly
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                Revoke sessions from devices you no longer use
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                Always sign out when using shared or public computers
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                Enable two-factor authentication for added security (coming soon)
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
