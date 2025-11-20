"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Package, 
  CreditCard, 
  Settings, 
  ShoppingBag,
  Clock,
  CheckCircle,
  Eye
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string | null;
  }[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    completedOrders: 0,
  });

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login?callbackUrl=/dashboard");
    }

    // Redirect staff to staff dashboard
    if (session?.user?.role === "STAFF") {
      redirect("/staff/dashboard");
    }

    // Redirect admin to admin dashboard
    if (session?.user?.role === "ADMIN") {
      redirect("/admin/dashboard");
    }

    if (session?.user) {
      setProfileData({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: "",
      });
      loadDashboardData();
    }
  }, [session, status]);

  const loadDashboardData = async () => {
    try {
      const ordersRes = await fetch("/api/orders");

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
        
        // Calculate stats
        const total = ordersData.orders?.reduce((sum: number, o: Order) => sum + o.total, 0) || 0;
        const pending = ordersData.orders?.filter((o: Order) => 
          o.status === "PENDING" || o.status === "PROCESSING"
        ).length || 0;
        const completed = ordersData.orders?.filter((o: Order) => 
          o.status === "DELIVERED"
        ).length || 0;

        setStats({
          totalOrders: ordersData.orders?.length || 0,
          totalSpent: total,
          pendingOrders: pending,
          completedOrders: completed,
        });
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { color: string; text: string }> = {
      PENDING: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      PROCESSING: { color: "bg-blue-100 text-blue-800", text: "Processing" },
      SHIPPED: { color: "bg-purple-100 text-purple-800", text: "Shipped" },
      DELIVERED: { color: "bg-green-100 text-green-800", text: "Delivered" },
      CANCELLED: { color: "bg-red-100 text-red-800", text: "Cancelled" },
    };
    
    const variant = variants[status] || variants.PENDING;
    return (
      <Badge className={`${variant.color} border-0`}>
        {variant.text}
      </Badge>
    );
  };

  const getPaymentBadge = (status: string) => {
    const variants: Record<string, { color: string; text: string }> = {
      PENDING: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      COMPLETED: { color: "bg-green-100 text-green-800", text: "Paid" },
      FAILED: { color: "bg-red-100 text-red-800", text: "Failed" },
    };
    
    const variant = variants[status] || variants.PENDING;
    return (
      <Badge className={`${variant.color} border-0`}>
        {variant.text}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session?.user?.name || "Customer"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">R{stats.totalSpent.toFixed(2)}</p>
                </div>
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History & Delivery Tracking</CardTitle>
                <CardDescription>View and track all your orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No orders yet</p>
                    <Button className="mt-4" onClick={() => window.location.href = "/shop"}>
                      Start Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleDateString("en-ZA", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900">R{order.total.toFixed(2)}</p>
                              <div className="flex gap-2 mt-2">
                                {getStatusBadge(order.status)}
                                {getPaymentBadge(order.paymentStatus)}
                              </div>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                              {order.items.length} item(s)
                            </p>
                            <div className="space-y-2">
                              {order.items.slice(0, 2).map((item) => (
                                <div key={item.id} className="flex items-center gap-3 text-sm">
                                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center shrink-0">
                                    {item.image ? (
                                      <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover rounded" />
                                    ) : (
                                      <Package className="h-6 w-6 text-gray-400" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-gray-900">{item.name}</p>
                                    <p className="text-gray-600">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-medium">R{item.price.toFixed(2)}</p>
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <p className="text-sm text-gray-600">
                                  +{order.items.length - 2} more item(s)
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="border-t pt-4 mt-4">
                            <Button variant="outline" size="sm" className="w-full">
                              <Eye className="h-4 w-4 mr-2" />
                              View Order Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-gray-600 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+27 82 123 4567"
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="order-updates">Order updates</Label>
                      <input type="checkbox" id="order-updates" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="promotions">Promotions and offers</Label>
                      <input type="checkbox" id="promotions" className="h-4 w-4" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="newsletter">Newsletter</Label>
                      <input type="checkbox" id="newsletter" className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-red-600 mb-4">Danger Zone</h3>
                  <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
