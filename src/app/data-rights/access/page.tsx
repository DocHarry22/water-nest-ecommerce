"use client";

import { useState } from "react";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AccessRequestPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    accountEmail: "",
    idNumber: "",
    additionalInfo: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/data-rights/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Request submitted successfully! We'll contact you within 24 hours.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          accountEmail: "",
          idNumber: "",
          additionalInfo: "",
        });
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/data-rights" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Data Rights Portal
        </Link>

        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Access Request</h1>
              <p className="text-gray-600">Request a copy of your personal information</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-8">
          <p className="text-sm text-gray-700">
            <strong>What you&apos;ll receive:</strong> A comprehensive report containing all personal data we hold about you, 
            including account information, order history, and any communications.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-lg p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div>
              <Label htmlFor="email">Your Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">We&apos;ll send the data report to this email</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="082 XXX XXXX"
              />
            </div>

            <div>
              <Label htmlFor="accountEmail">Account Email (if different)</Label>
              <Input
                id="accountEmail"
                type="email"
                value={formData.accountEmail}
                onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                placeholder="account@example.com"
              />
              <p className="text-xs text-gray-500 mt-1">The email associated with your Water Nest account</p>
            </div>

            <div>
              <Label htmlFor="idNumber">ID Number (Last 4 digits) *</Label>
              <Input
                id="idNumber"
                type="text"
                required
                maxLength={4}
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                placeholder="1234"
              />
              <p className="text-xs text-gray-500 mt-1">For identity verification purposes</p>
            </div>

            <div>
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                rows={4}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Any specific information you're looking for or additional details..."
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
            <Link href="/data-rights" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By submitting this request, you confirm that you are the data subject or authorized representative.
          </p>
        </form>
      </div>
    </div>
  );
}
