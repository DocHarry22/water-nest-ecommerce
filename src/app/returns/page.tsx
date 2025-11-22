import { Metadata } from "next";
import { RotateCcw, ShieldCheck, Package, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Returns Policy",
  description: "Water Nest returns and refunds policy in compliance with South African Consumer Protection Act.",
};

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-4">Returns Policy</h1>
      <p className="text-gray-600 mb-2">
        <em>In compliance with the Consumer Protection Act 68 of 2008</em>
      </p>
      <p className="text-gray-600 mb-8">
        Your satisfaction is our priority. Learn about your rights and our returns process.
      </p>

      {/* Your Rights */}
      <section className="mb-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2" />
            Your Rights Under South African Law
          </h2>
          <p className="mb-3">Under South African law, you have the right to:</p>
          <ul className="space-y-2 ml-6 list-disc">
            <li>Return goods within the cooling-off period</li>
            <li>Return defective or unsafe goods</li>
            <li>Receive a refund, replacement, or repair for faulty goods</li>
          </ul>
        </div>
      </section>

      {/* Cooling-Off Period */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <RotateCcw className="h-8 w-8 mr-3 text-blue-600" />
          Cooling-Off Period (Change of Mind)
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">7-Day Return Window</h3>
          <ul className="space-y-2">
            <li>✓ You may return products within 7 days of delivery</li>
            <li>✓ Products must be unused, in original packaging with all accessories</li>
            <li>✓ You must pay return shipping costs</li>
            <li>✓ Refund processed within 10 business days of receiving returned item</li>
            <li>✓ 10% restocking fee applies</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <h4 className="font-bold mb-3 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            Exclusions from Cooling-Off Period:
          </h4>
          <ul className="space-y-1 ml-6 list-disc text-sm">
            <li>Custom-made or specially ordered items</li>
            <li>Products that have been installed or used</li>
            <li>Consumable products (filters, cartridges) if packaging is opened</li>
            <li>Water testing kits after seals are broken</li>
          </ul>
        </div>
      </section>

      {/* Defective Products */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Defective or Faulty Products</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">30-Day Quality Guarantee</h3>
            <ul className="space-y-2 text-sm">
              <li>• Report defects within 30 days of delivery</li>
              <li>• We&apos;ll collect the item at no cost to you (within Northern Cape)</li>
              <li>• Choose replacement, repair, or full refund</li>
              <li>• No restocking fee for defective items</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Warranty Claims</h3>
            <ul className="space-y-2 text-sm">
              <li>• Manufacturer warranties: 12-24 months (product dependent)</li>
              <li>• Keep your proof of purchase</li>
              <li>• Warranties cover manufacturing defects, not wear and tear</li>
              <li>• Professional installation required for some warranty validation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How to Return */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Package className="h-8 w-8 mr-3 text-blue-600" />
          How to Return an Item
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0">1</div>
              <div>
                <h3 className="text-lg font-bold mb-2">Contact Us</h3>
                <ul className="text-sm space-y-1">
                  <li>• Email: returns@waternest.co.za</li>
                  <li>• Phone: 082 XXX XXXX</li>
                  <li>• Provide order number and reason for return</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0">2</div>
              <div>
                <h3 className="text-lg font-bold mb-2">Receive Authorization</h3>
                <ul className="text-sm space-y-1">
                  <li>• We&apos;ll issue a Return Authorization (RA) number</li>
                  <li>• You&apos;ll receive return instructions</li>
                  <li>• For defective items, we arrange collection</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0">3</div>
              <div>
                <h3 className="text-lg font-bold mb-2">Pack the Item</h3>
                <ul className="text-sm space-y-1">
                  <li>• Use original packaging if possible</li>
                  <li>• Include all accessories, manuals, and documentation</li>
                  <li>• Include your RA number and invoice copy</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0">4</div>
              <div>
                <h3 className="text-lg font-bold mb-2">Ship the Item</h3>
                <ul className="text-sm space-y-1">
                  <li>• Use a trackable shipping method</li>
                  <li>• Keep shipping receipt for insurance purposes</li>
                  <li>• We recommend insuring high-value items</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 shrink-0">5</div>
              <div>
                <h3 className="text-lg font-bold mb-2">Refund Processing</h3>
                <ul className="text-sm space-y-1">
                  <li>• Inspection completed within 3 business days of receipt</li>
                  <li>• Refund processed within 10 business days</li>
                  <li>• Refund via original payment method</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non-Returnable Items */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Non-Returnable Items</h2>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
          <ul className="space-y-2">
            <li>✗ Water that has been tested or dispensed</li>
            <li>✗ Custom installations already completed</li>
            <li>✗ Products damaged due to misuse or negligence</li>
            <li>✗ Items without original packaging (unless defective)</li>
            <li>✗ Electrical items with broken safety seals (unless defective)</li>
          </ul>
        </div>
      </section>

      {/* Damaged During Shipping */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Damaged During Shipping</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">If your order arrives damaged:</p>
          <ul className="space-y-2">
            <li>• Don&apos;t accept delivery if visibly damaged</li>
            <li>• If damage discovered after acceptance, contact us within 48 hours</li>
            <li>• Take photos of packaging and damaged item</li>
            <li>• We&apos;ll arrange replacement or refund immediately</li>
            <li>• No cost to you for shipping-damaged items</li>
          </ul>
        </div>
      </section>

      {/* Contact for Returns */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Contact for Returns</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-sm">returns@waternest.co.za</p>
          </div>
          <div>
            <p className="font-semibold">Phone</p>
            <p className="text-sm">082 XXX XXXX</p>
          </div>
          <div>
            <p className="font-semibold">Address</p>
            <p className="text-sm">Water Nest, Kathu, Northern Cape</p>
            <p className="text-xs text-gray-600">(Physical address provided with RA number)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
