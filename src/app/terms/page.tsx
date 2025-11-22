import { Metadata } from "next";
import { Scale, FileText, ShieldAlert, Gavel } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Water Nest Terms of Service - Legal terms and conditions governing the use of our website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">Terms of Service</h1>
      <p className="text-gray-600 mb-2">
        <em>Last Updated: November 22, 2025</em>
      </p>
      <p className="text-gray-600 mb-8">
        <em>Governed by South African Law</em>
      </p>

      {/* Agreement to Terms */}
      <section className="mb-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Scale className="h-6 w-6 mr-2" />
            Agreement to Terms
          </h2>
          <p>
            By accessing Water Nest&apos;s website or services, you agree to these Terms of Service and all applicable laws and regulations. If you disagree, discontinue use immediately.
          </p>
        </div>
      </section>

      {/* Company Information */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Company Information</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm"><strong>Legal Name:</strong> Water Nest (Pty) Ltd</p>
              <p className="text-sm"><strong>Trading As:</strong> Water Nest</p>
              <p className="text-sm"><strong>Registration Number:</strong> [Company Registration]</p>
            </div>
            <div>
              <p className="text-sm"><strong>VAT Number:</strong> [VAT Number]</p>
              <p className="text-sm"><strong>Physical Address:</strong> Kathu, Northern Cape, South Africa</p>
              <p className="text-sm"><strong>Email:</strong> info@waternest.co.za</p>
              <p className="text-sm"><strong>Phone:</strong> 082 XXX XXXX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Consumer Protection Act */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <ShieldAlert className="h-8 w-8 mr-3 text-blue-600" />
          Consumer Protection Act Compliance
        </h2>
        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
          <p className="mb-4">These terms comply with the Consumer Protection Act 68 of 2008 (CPA). Your rights under the CPA are not affected by these terms.</p>
          <h3 className="font-bold mb-3">Key Consumer Rights:</h3>
          <ul className="space-y-2">
            <li>• Right to fair and honest dealing</li>
            <li>• Right to accurate product information</li>
            <li>• Right to fair and responsible marketing</li>
            <li>• Right to return goods within cooling-off period</li>
            <li>• Right to safe, good quality goods</li>
            <li>• Protection from unsafe goods</li>
          </ul>
        </div>
      </section>

      {/* Product Information and Pricing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Product Information and Pricing</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Product Descriptions</h3>
            <ul className="space-y-2">
              <li>• We strive for accuracy but don&apos;t guarantee completeness</li>
              <li>• Products subject to availability</li>
              <li>• Images are representative; actual products may vary slightly</li>
              <li>• Technical specifications sourced from manufacturers</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Pricing</h3>
            <ul className="space-y-2">
              <li>• All prices in South African Rand (ZAR)</li>
              <li>• Prices include VAT at current rate (15%)</li>
              <li>• Prices subject to change without notice</li>
              <li>• Price confirmed at checkout</li>
              <li>• Installation and delivery charged separately</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Orders and Acceptance */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Orders and Acceptance</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Placing Orders</h3>
            <ul className="space-y-2 text-sm">
              <li>• Orders constitute an offer to purchase</li>
              <li>• We reserve the right to accept or decline orders</li>
              <li>• Order confirmation doesn&apos;t guarantee acceptance</li>
              <li>• We&apos;ll notify you if we cannot fulfill your order</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Payment</h3>
            <ul className="space-y-2 text-sm">
              <li>• Payment due at checkout unless credit terms arranged</li>
              <li>• We use secure payment processing (PCI-DSS compliant)</li>
              <li>• Payment methods: EFT, credit/debit cards, cash (local only)</li>
              <li>• For EFT: Order held for 48 hours pending payment confirmation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Delivery and Risk */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Delivery and Risk</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">Delivery Times</h3>
              <ul className="space-y-2 text-sm">
                <li>• Estimated times provided but not guaranteed</li>
                <li>• Delays beyond our control don&apos;t constitute breach</li>
                <li>• Force majeure events may affect delivery</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Delivery Terms</h3>
              <ul className="space-y-2 text-sm">
                <li>• Risk transfers upon delivery to specified address</li>
                <li>• Recipient signature confirms delivery completion</li>
                <li>• Inspect items immediately upon delivery</li>
                <li>• Report damage within 48 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warranties */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Product Warranties</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Manufacturer Warranties</h3>
            <ul className="space-y-2 text-sm">
              <li>• Terms vary by product (12-24 months typical)</li>
              <li>• Covers manufacturing defects</li>
              <li>• Doesn&apos;t cover wear and tear or misuse</li>
              <li>• Registration may be required</li>
              <li>• Professional installation may be required</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Water Nest Guarantees</h3>
            <ul className="space-y-2 text-sm">
              <li>• 30-day satisfaction guarantee on select products</li>
              <li>• Service workmanship guaranteed for 90 days</li>
              <li>• We&apos;ll repair or replace defective goods</li>
              <li>• Choice of repair, replacement, or refund</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Limitation of Liability</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
          <p className="mb-4">To the extent permitted by South African law:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-3">We&apos;re Not Liable For:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Indirect, incidental, or consequential damages</li>
                <li>• Loss of profits or business interruption</li>
                <li>• Damages exceeding the purchase price</li>
                <li>• Damages from products used incorrectly</li>
                <li>• Third-party acts or omissions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Our Maximum Liability:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Limited to the amount you paid for the product/service</li>
                <li>• CPA consumer rights remain unaffected</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Installation Services</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Professional Installation</h3>
            <ul className="space-y-2 text-sm">
              <li>• Performed by qualified technicians</li>
              <li>• Quoted separately from product price</li>
              <li>• Site inspection may be required</li>
              <li>• Customer responsible for site preparation</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Installation Warranty</h3>
            <ul className="space-y-2 text-sm">
              <li>• 90-day workmanship guarantee</li>
              <li>• Doesn&apos;t cover product defects (manufacturer warranty applies)</li>
              <li>• Annual maintenance recommended</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Gavel className="h-8 w-8 mr-3 text-blue-600" />
          Governing Law and Jurisdiction
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h3 className="font-bold mb-3">Applicable Law</h3>
            <ul className="space-y-1 text-sm">
              <li>• These terms governed by South African law</li>
              <li>• Consumer Protection Act 68 of 2008</li>
              <li>• Electronic Communications and Transactions Act 25 of 2002</li>
              <li>• Protection of Personal Information Act 4 of 2013</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-3">Dispute Resolution</h3>
            <ol className="space-y-1 text-sm list-decimal list-inside">
              <li>Attempt amicable resolution first</li>
              <li>Mediation through recognized mediator</li>
              <li>Arbitration if mediation fails</li>
              <li>Litigation as last resort</li>
              <li>Northern Cape High Court has jurisdiction</li>
            </ol>
          </div>

          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-bold mb-2">Consumer Tribunal</h3>
            <p className="text-sm">You may lodge complaints with National Consumer Tribunal</p>
            <p className="text-sm">Contact: www.thenct.org.za</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <FileText className="h-6 w-6 mr-2" />
          Contact Information
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold mb-2">General Inquiries</h3>
            <p className="text-sm">Email: info@waternest.co.za</p>
            <p className="text-sm">Phone: 082 XXX XXXX</p>
            <p className="text-sm">Hours: Mon-Fri, 8AM-5PM SAST</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Customer Support</h3>
            <p className="text-sm">Email: support@waternest.co.za</p>
            <p className="text-sm">Phone: 082 XXX XXXX</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Physical Address</h3>
            <p className="text-sm">Water Nest</p>
            <p className="text-sm">Kathu, 8446</p>
            <p className="text-sm">Northern Cape, South Africa</p>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="mt-8 bg-gray-100 p-4 rounded text-sm text-gray-600">
        <p>
          <strong>Legal Notice:</strong> These terms are legally binding. By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you have questions about these terms, please contact our legal department at legal@waternest.co.za.
        </p>
      </section>
    </div>
    </div>
  );
}
