"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Calendar, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";

interface AppointmentSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  maxBookings: number;
  bookedCount: number;
}

const SERVICE_TYPES = [
  { value: "installation", label: "System Installation", icon: "🔧" },
  { value: "maintenance", label: "Maintenance Service", icon: "🛠️" },
  { value: "repair", label: "Repair Service", icon: "⚠️" },
  { value: "water-testing", label: "Water Quality Testing", icon: "🧪" },
  { value: "consultation", label: "Technical Consultation", icon: "💡" },
];

const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

export default function BookAppointmentPage() {
  const { data: session } = useSession();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<Record<string, AppointmentSlot[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    serviceType: "",
    selectedDate: "",
    selectedSlot: null as AppointmentSlot | null,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
    },
    notes: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        firstName: session.user.name?.split(' ')[0] || "",
        lastName: session.user.name?.split(' ')[1] || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const loadAvailableSlots = useCallback(async () => {
    setLoading(true);
    try {
      const startDate = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ahead
      
      const response = await fetch(
        `/api/appointments/slots?startDate=${startDate}&endDate=${endDate}&serviceType=${formData.serviceType}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const slots = data.slots || [];
        
        // Group by date
        const grouped: Record<string, AppointmentSlot[]> = {};
        slots.forEach((slot: AppointmentSlot) => {
          const dateKey = new Date(slot.date).toISOString().split('T')[0];
          if (!grouped[dateKey]) {
            grouped[dateKey] = [];
          }
          grouped[dateKey].push(slot);
        });
        
        setAvailableSlots(grouped);
      }
    } catch (error) {
      console.error("Failed to load slots:", error);
    } finally {
      setLoading(false);
    }
  }, [formData.serviceType]);

  useEffect(() => {
    if (formData.serviceType) {
      loadAvailableSlots();
    }
  }, [formData.serviceType, loadAvailableSlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceType: formData.serviceType,
          date: formData.selectedSlot?.date,
          timeSlot: formData.selectedSlot?.startTime,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const error = await response.json();
        alert(error.error || "Failed to book appointment");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="border-green-200">
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Appointment Requested Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                We&apos;ve received your appointment request for{" "}
                <strong>{SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label}</strong>
              </p>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-sky-600 mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-sky-900">
                      {new Date(formData.selectedSlot!.date).toLocaleDateString("en-ZA", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sky-700">
                      {formData.selectedSlot?.startTime} - {formData.selectedSlot?.endTime}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-8">
                Our team will contact you shortly to confirm your appointment.
                You&apos;ll receive a confirmation email at <strong>{formData.email}</strong>
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => window.location.href = "/dashboard"}>
                  View My Appointments
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Book Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book an Appointment</h1>
          <p className="mt-2 text-gray-600">
            Schedule a service appointment with our expert team
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-sky-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="font-medium">Service</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-sky-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="font-medium">Date & Time</span>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 mx-2" />
            <div className={`flex items-center gap-2 ${step >= 3 ? 'text-sky-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-sky-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="font-medium">Details</span>
            </div>
          </div>
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Service Type</CardTitle>
              <CardDescription>Choose the type of service you need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICE_TYPES.map((service) => (
                  <Card
                    key={service.value}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      formData.serviceType === service.value
                        ? 'border-sky-600 border-2 bg-sky-50'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setFormData({ ...formData, serviceType: service.value })}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{service.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{service.label}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!formData.serviceType}
                  className="w-full"
                >
                  Continue to Date Selection
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>
                Choose an available appointment slot for{" "}
                <strong>{SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading available time slots...</p>
                </div>
              ) : Object.keys(availableSlots).length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No available time slots for this service</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Please check back later or contact us directly
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {Object.entries(availableSlots).map(([date, slots]) => (
                    <div key={date} className="border-l-4 border-l-sky-500 pl-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-3">
                        {new Date(date).toLocaleDateString("en-ZA", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {slots.map((slot) => (
                          <Button
                            key={slot.id}
                            variant={formData.selectedSlot?.id === slot.id ? "default" : "outline"}
                            className="h-auto py-3"
                            onClick={() => setFormData({ ...formData, selectedSlot: slot })}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {slot.startTime}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!formData.selectedSlot}
                  className="flex-1"
                >
                  Continue to Contact Details
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Contact Details */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Contact & Address Information</CardTitle>
              <CardDescription>Provide your details for the appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+27 82 123 4567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="street">Street Address *</Label>
                  <Input
                    id="street"
                    value={formData.address.street}
                    onChange={(e) => setFormData({
                      ...formData,
                      address: { ...formData.address, street: e.target.value }
                    })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.address.city}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, city: e.target.value }
                      })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <select
                      id="province"
                      value={formData.address.province}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, province: e.target.value }
                      })}
                      className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-gray-900"
                      required
                    >
                      <option value="">Select Province</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={formData.address.postalCode}
                      onChange={(e) => setFormData({
                        ...formData,
                        address: { ...formData.address, postalCode: e.target.value }
                      })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any specific requirements or additional information..."
                    rows={4}
                  />
                </div>

                {/* Summary */}
                <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                  <h4 className="font-semibold text-sky-900 mb-3">Appointment Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium text-gray-900">
                        {SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium text-gray-900">
                        {formData.selectedSlot && new Date(formData.selectedSlot.date).toLocaleDateString("en-ZA")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium text-gray-900">
                        {formData.selectedSlot?.startTime} - {formData.selectedSlot?.endTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Booking..." : "Confirm Appointment"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
