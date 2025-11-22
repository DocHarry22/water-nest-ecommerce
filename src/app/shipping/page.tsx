import { Metadata } from "next";
import { Package, Truck, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Information",
  description: "Delivery areas, shipping methods, and tracking information for Water Nest orders.",
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Shipping Information</h1>
      <p className="text-gray-600 mb-8">
        Everything you need to know about delivery areas, shipping methods, and order tracking.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* Delivery Areas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <MapPin className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold">Local Delivery</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Kathu & Immediate Surrounds</p>
          <ul className="space-y-2 text-sm">
            <li>• Delivery time: 1-3 business days</li>
            <li>• Free delivery on orders over R1,500</li>
            <li>• Standard delivery fee: R150</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Truck className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold">Regional</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Northern Cape Region</p>
          <ul className="space-y-2 text-sm">
            <li>• Delivery time: 3-5 business days</li>
            <li>• Delivery fee: R200-R350</li>
            <li>• Kuruman, Upington, Kimberley, Postmasburg</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Package className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-bold">Nationwide</h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">Across South Africa</p>
          <ul className="space-y-2 text-sm">
            <li>• Delivery time: 5-10 business days</li>
            <li>• Delivery fee: R250-R500</li>
            <li>• The Courier Guy, Aramex, Postnet</li>
          </ul>
        </div>
      </div>

      {/* Shipping Methods */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shipping Methods</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Standard Courier</td>
                <td className="px-6 py-4 whitespace-nowrap">5-10 business days</td>
                <td className="px-6 py-4">Nationwide delivery</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Express Courier</td>
                <td className="px-6 py-4 whitespace-nowrap">2-3 business days</td>
                <td className="px-6 py-4">To major centers (additional fee)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Local Delivery</td>
                <td className="px-6 py-4 whitespace-nowrap">1-3 business days</td>
                <td className="px-6 py-4">Water Nest vehicles (Kathu area)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Collection</td>
                <td className="px-6 py-4 whitespace-nowrap">Same/next day</td>
                <td className="px-6 py-4">Free from Kathu premises (by appointment)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Shipping Restrictions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Shipping Restrictions</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <ul className="space-y-2">
            <li>• Large equipment may require special freight arrangements</li>
            <li>• Hazardous materials (certain chemicals) may have delivery restrictions</li>
            <li>• Remote areas may incur additional charges</li>
            <li>• Delivery to farms/mines may require specific instructions</li>
          </ul>
        </div>
      </section>

      {/* Order Processing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Order Processing</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Processing Times</h3>
            <ul className="space-y-2 text-sm">
              <li>• Orders before 12:00 PM (Mon-Fri) processed same day</li>
              <li>• Orders after 12:00 PM or weekends processed next business day</li>
              <li>• Order confirmation via email within 1 hour</li>
              <li>• Dispatch notification with tracking via email and SMS</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Package className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3">Tracking Your Order</h3>
            <ol className="space-y-2 text-sm list-decimal list-inside">
              <li>Check your email for dispatch confirmation</li>
              <li>Use the tracking number provided</li>
              <li>Track via courier website or our customer portal</li>
              <li>Contact us for assistance: info@waternest.co.za or 082 XXX XXXX</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Delivery Issues */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Delivery Issues?</h2>
        <p className="mb-4">
          If you experience delivery problems, we&apos;re here to help. We&apos;ll resolve delivery issues within 48 hours.
        </p>
        <div className="space-y-2">
          <p><strong>Email:</strong> support@waternest.co.za</p>
          <p><strong>Phone:</strong> 082 XXX XXXX (Mon-Fri, 8AM-5PM)</p>
          <p><strong>What to do:</strong> Contact the courier directly using your tracking number or reach out to us for assistance.</p>
        </div>
      </section>
    </div>
    </div>
  );
}
