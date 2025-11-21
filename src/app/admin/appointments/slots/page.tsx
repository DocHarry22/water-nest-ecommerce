"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";

interface AppointmentSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxBookings: number;
  bookedCount: number;
  serviceTypes: string[];
  notes?: string;
}

const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function AppointmentSlotsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [slots, setSlots] = useState<AppointmentSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    maxBookings: 1,
    serviceTypes: [] as string[],
    notes: "",
  });

  const serviceOptions = [
    { value: "installation", label: "Installation" },
    { value: "maintenance", label: "Maintenance" },
    { value: "repair", label: "Repair" },
    { value: "water-testing", label: "Water Testing" },
    { value: "consultation", label: "Consultation" },
  ];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }

    if (session?.user && (session.user.role === "ADMIN" || session.user.role === "STAFF")) {
      loadSlots();
    } else if (session?.user) {
      router.replace("/dashboard");
    }
  }, [session, status, router]);

  const loadSlots = async () => {
    try {
      const today = new Date();
      const startDate = formatLocalDate(today);
      const endDate = formatLocalDate(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)); // 90 days ahead
      
      const response = await fetch(`/api/appointments/slots?startDate=${startDate}&endDate=${endDate}`);
      
      if (response.ok) {
        const data = await response.json();
        setSlots(data.slots || []);
      }
    } catch (error) {
      console.error("Failed to load slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/appointments/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({
          date: "",
          startTime: "09:00",
          endTime: "10:00",
          maxBookings: 1,
          serviceTypes: [],
          notes: "",
        });
        loadSlots();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to create slot");
      }
    } catch (error) {
      console.error("Create slot error:", error);
      alert("Failed to create slot");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm("Are you sure you want to delete this time slot?")) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/slots?id=${slotId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadSlots();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete slot");
      }
    } catch (error) {
      console.error("Delete slot error:", error);
      alert("Failed to delete slot");
    }
  };

  const toggleServiceType = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceTypes: prev.serviceTypes.includes(service)
        ? prev.serviceTypes.filter(s => s !== service)
        : [...prev.serviceTypes, service],
    }));
  };

  const groupSlotsByDate = () => {
    const grouped: Record<string, AppointmentSlot[]> = {};
    
    slots.forEach(slot => {
      const dateKey = new Date(slot.date).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(slot);
    });

    return grouped;
  };

  if (loading && slots.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment slots...</p>
        </div>
      </div>
    );
  }

  const groupedSlots = groupSlotsByDate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Appointment Time Slots</h1>
            <p className="mt-2 text-gray-600">
              Manage available booking times for customer appointments
            </p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Time Slot
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Slots</p>
                  <p className="text-2xl font-bold text-gray-900">{slots.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    {slots.filter(s => s.bookedCount < s.maxBookings).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Fully Booked</p>
                  <p className="text-2xl font-bold text-red-600">
                    {slots.filter(s => s.bookedCount >= s.maxBookings).length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {slots.reduce((sum, s) => sum + s.bookedCount, 0)}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Slot Form */}
        {showAddForm && (
          <Card className="mb-8 border-sky-200">
            <CardHeader>
              <CardTitle>Create New Time Slot</CardTitle>
              <CardDescription>Add available appointment times for customers to book</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSlot} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      min={formatLocalDate(new Date())}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="maxBookings">Max Bookings per Slot</Label>
                  <Input
                    id="maxBookings"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.maxBookings}
                    onChange={(e) => setFormData({ ...formData, maxBookings: parseInt(e.target.value) })}
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Number of appointments that can be booked in this time slot
                  </p>
                </div>

                <div>
                  <Label>Service Types (leave empty for all services)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {serviceOptions.map(service => (
                      <Badge
                        key={service.value}
                        variant={formData.serviceTypes.includes(service.value) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleServiceType(service.value)}
                      >
                        {service.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Internal notes about this time slot"
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Slot"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Slots List */}
        <Card>
          <CardHeader>
            <CardTitle>Available Time Slots</CardTitle>
            <CardDescription>Manage and view all appointment time slots</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(groupedSlots).length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No time slots available</p>
                <p className="text-sm text-gray-500 mt-2">
                  Click &quot;Add Time Slot&quot; to create available appointment times
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {Object.entries(groupedSlots).map(([date, dateSlots]) => (
                  <div key={date} className="border-l-4 border-l-sky-500 pl-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">{date}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {dateSlots.map((slot) => (
                        <Card key={slot.id} className={`${slot.bookedCount >= slot.maxBookings ? 'bg-gray-50' : ''}`}>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-600" />
                                <span className="font-medium">
                                  {slot.startTime} - {slot.endTime}
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteSlot(slot.id)}
                                disabled={slot.bookedCount > 0}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Bookings:</span>
                                <Badge variant={slot.bookedCount >= slot.maxBookings ? "destructive" : "default"}>
                                  {slot.bookedCount} / {slot.maxBookings}
                                </Badge>
                              </div>

                              {slot.serviceTypes.length > 0 && (
                                <div>
                                  <p className="text-xs text-gray-600 mb-1">Services:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {slot.serviceTypes.map(service => (
                                      <Badge key={service} variant="outline" className="text-xs">
                                        {serviceOptions.find(s => s.value === service)?.label ?? service}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {slot.notes && (
                                <p className="text-xs text-gray-600 italic">{slot.notes}</p>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
