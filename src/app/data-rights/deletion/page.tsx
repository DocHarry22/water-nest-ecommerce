"use client";

import { useState } from "react";
import { Trash2, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function DeletionRequestPage() {
  const [loading, setLoading] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acknowledged) {
      toast.error("Please acknowledge the consequences of data deletion");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/data-rights/deletion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Deletion request submitted! We'll process your request within 30 days.");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          idNumber: "",
          reason: "",
        });
        setAcknowledged(false);
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
            <div className="bg-red-100 p-3 rounded-lg mr-4">
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Deletion Request</h1>
              <p className="text-gray-600">Request permanent deletion of your personal data</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-8">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-700">
              <strong className="block mb-2">Important Information:</strong>
              <ul className="space-y-1 list-disc list-inside">
                <li>This action cannot be undone</li>
                <li>Your account will be permanently closed</li>
                <li>We may retain certain data for legal/accounting purposes (5 years)</li>
                <li>Active orders must be completed before deletion</li>
                <li>You will lose access to all services and benefits</li>
              </ul>
            </div>
          </div>
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
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
              />
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
              <p className="text-xs text-gray-500 mt-1">For identity verification</p>
            </div>

            <div>
              <Label htmlFor="reason">Reason for Deletion (Optional)</Label>
              <Textarea
                id="reason"
                rows={4}
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Help us improve by sharing why you're leaving..."
              />
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <label className="flex items-start cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-gray-700">
                  I understand that this action is permanent and irreversible. I acknowledge that my account and 
                  data will be permanently deleted, and I will lose access to all services.
                </span>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading || !acknowledged} variant="destructive" className="flex-1">
              {loading ? "Submitting..." : "Submit Deletion Request"}
            </Button>
            <Link href="/data-rights" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
