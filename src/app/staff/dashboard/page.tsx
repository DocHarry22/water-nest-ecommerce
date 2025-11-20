"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Users,
  ShoppingCart,
  TrendingUp,
  Clock,
  CheckCircle,
  Wrench,
  Calendar,
  Eye,
  AlertCircle
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface Appointment {
  id: string;
  type: string;
  status: string;
  date: string;
  customer: {
    name: string;
    phone: string;
  };
}

export default function StaffDashboardPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todayOrders: 0,
    pendingOrders: 0,
    todayAppointments: 0,
    activeCustomers: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login?callbackUrl=/dashboard");
    }

    if (session?.user?.role !== "STAFF" && session?.user?.role !== "ADMIN") {
      redirect("/dashboard");
    }

    if (session?.user) {
      loadStaffData();
    }
  }, [session, status]);

  const loadStaffData = async () => {
    try {
      // Load all orders (staff can see all)
      const ordersRes = await fetch("/api/admin/orders");
      
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        const allOrders = ordersData.orders || [];
        setOrders(allOrders.slice(0, 10)); // Show latest 10
        
        // Calculate stats
        const today = new Date().toDateString();
        const todayOrders = allOrders.filter((o: Order) => 
          new Date(o.createdAt).toDateString() === today
        ).length;
        
        const pending = allOrders.filter((o: Order) => 
          o.status === "PENDING" || o.status === "PROCESSING"
        ).length;

        setStats({
          todayOrders,
          pendingOrders: pending,
          todayAppointments: 0, // Placeholder
          activeCustomers: 0, // Placeholder
        });
      }
    } catch (error) {
      console.error("Failed to load staff data:", error);
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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        loadStaffData(); // Reload data
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading staff dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-blue-100 text-blue-800 border-0">Staff Portal</Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session?.user?.name || "Staff Member"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-sky-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.todayOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-sky-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.todayAppointments}</p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Customers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Package className="h-6 w-6" />
                <span>View All Orders</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Appointments</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Customer List</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>Reports</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl">
            <TabsTrigger value="orders">
              <Package className="h-4 w-4 mr-2" />
              Recent Orders
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <CheckCircle className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders - Staff View</CardTitle>
                <CardDescription>View and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No orders to display</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border-l-4 border-l-sky-500">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-gray-600">
                                Customer: <span className="font-medium">{order.user.name}</span>
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleString("en-ZA")}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 text-lg">R{order.total.toFixed(2)}</p>
                              <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                            </div>
                          </div>

                          <div className="border-t pt-4 mt-4 flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.location.href = `/admin/orders`}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            
                            {order.status === "PENDING" && (
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "PROCESSING")}
                              >
                                Mark Processing
                              </Button>
                            )}
                            
                            {order.status === "PROCESSING" && (
                              <Button 
                                variant="default" 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => updateOrderStatus(order.id, "SHIPPED")}
                              >
                                Mark Shipped
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Appointments</CardTitle>
                <CardDescription>Manage installations and service calls</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No appointments scheduled</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Appointments will appear here when customers book services
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Today's Tasks</CardTitle>
                <CardDescription>Your assigned tasks and priorities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="checkbox" className="h-4 w-4" />
                    <div className="flex-1">
                      <p className="font-medium">Process pending orders</p>
                      <p className="text-sm text-gray-600">{stats.pendingOrders} orders awaiting processing</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 border-0">High</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="checkbox" className="h-4 w-4" />
                    <div className="flex-1">
                      <p className="font-medium">Follow up on shipped orders</p>
                      <p className="text-sm text-gray-600">Check delivery status</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-0">Medium</Badge>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="checkbox" className="h-4 w-4" />
                    <div className="flex-1">
                      <p className="font-medium">Update inventory levels</p>
                      <p className="text-sm text-gray-600">Check stock for popular items</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 border-0">Low</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Alert Card */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">
                  {stats.pendingOrders} order(s) require attention
                </p>
                <p className="text-sm text-yellow-800 mt-1">
                  Please process pending orders to ensure timely delivery
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
