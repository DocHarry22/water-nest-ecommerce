"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Package, 
  Users, 
  FileText, 
  ShoppingCart, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  BarChart3
} from "lucide-react";

interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/admin");
      return;
    }

    if (session?.user?.role !== "ADMIN") {
      router.push("/");
      return;
    }

    fetchDashboardStats();
  }, [session, status, router]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (session?.user?.role !== "ADMIN") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {session?.user?.name}</p>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  R{stats?.totalRevenue?.toLocaleString() || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.totalOrders || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.pendingOrders || 0}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.totalProducts || 0}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.totalUsers || 0}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats?.lowStockProducts || 0}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-purple-100 p-2 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Products</p>
                <p className="text-sm text-gray-600">Add, edit, or remove</p>
              </div>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Users</p>
                <p className="text-sm text-gray-600">Roles & permissions</p>
              </div>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-blue-100 p-2 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">View Orders</p>
                <p className="text-sm text-gray-600">Process & fulfill</p>
              </div>
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-green-100 p-2 rounded-lg">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Blogs</p>
                <p className="text-sm text-gray-600">Create & publish</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <BarChart3 className="h-5 w-5 text-gray-600" />
              <p className="text-sm text-gray-700">
                System running smoothly. All services operational.
              </p>
            </div>
            {stats?.lowStockProducts && stats.lowStockProducts > 0 && (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  {stats.lowStockProducts} product{stats.lowStockProducts !== 1 ? 's' : ''} running low on stock. 
                  <Link href="/admin/products" className="ml-1 underline font-medium">
                    Review inventory
                  </Link>
                </p>
              </div>
            )}
            {stats?.pendingOrders && stats.pendingOrders > 0 && (
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                <p className="text-sm text-blue-800">
                  {stats.pendingOrders} order{stats.pendingOrders !== 1 ? 's' : ''} awaiting processing.
                  <Link href="/admin/orders" className="ml-1 underline font-medium">
                    View orders
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
