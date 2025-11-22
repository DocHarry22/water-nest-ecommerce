import { Metadata } from "next";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Water Nest Privacy Policy - How we collect, use, and protect your personal information in compliance with POPIA.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-600 mb-2">
        <em>Last Updated: November 22, 2025</em>
      </p>
      <p className="text-gray-600 mb-8">
        <em>In compliance with the Protection of Personal Information Act (POPIA) 4 of 2013</em>
      </p>

      {/* Introduction */}
      <section className="mb-12">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2" />
            Our Commitment to Your Privacy
          </h2>
          <p>
            Water Nest (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <FileText className="h-8 w-8 mr-3 text-blue-600" />
          Information We Collect
        </h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Personal Information You Provide:</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              <li>• Name and surname</li>
              <li>• Physical and email addresses</li>
              <li>• Phone numbers</li>
              <li>• Payment information (encrypted)</li>
              <li>• Account login credentials</li>
              <li>• Delivery instructions</li>
              <li>• Communication preferences</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Automatically Collected Information:</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              <li>• IP address</li>
              <li>• Browser type and version</li>
              <li>• Device information</li>
              <li>• Pages visited and time spent</li>
              <li>• Referring website addresses</li>
              <li>• Cookies and tracking data</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Business Information:</h3>
            <ul className="grid md:grid-cols-2 gap-2">
              <li>• Company name and registration</li>
              <li>• VAT number (for business accounts)</li>
              <li>• Purchase history</li>
              <li>• Service requests and maintenance schedules</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How We Use Your Information */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">How We Use Your Information</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">We use your personal information to:</p>
          <ul className="space-y-2">
            <li>• Process and fulfill your orders</li>
            <li>• Arrange delivery and installation services</li>
            <li>• Communicate about your orders and services</li>
            <li>• Provide customer support</li>
            <li>• Send marketing communications (with your consent)</li>
            <li>• Improve our website and services</li>
            <li>• Comply with legal obligations</li>
            <li>• Prevent fraud and ensure security</li>
          </ul>
        </div>
      </section>

      {/* Legal Basis */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Legal Basis for Processing (POPIA Compliance)</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">Consent</h3>
            <p className="text-sm">You&apos;ve given permission for specific purposes</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">Contract</h3>
            <p className="text-sm">Processing is necessary to fulfill our service to you</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">Legal Obligation</h3>
            <p className="text-sm">Required by South African law</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-2">Legitimate Interest</h3>
            <p className="text-sm">For business operations and fraud prevention</p>
          </div>
        </div>
      </section>

      {/* Information Sharing */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Information Sharing and Disclosure</h2>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">We May Share Your Information With:</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Service Providers:</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Courier companies for delivery</li>
                  <li>• Payment processors (secure, PCI-compliant)</li>
                  <li>• IT service providers</li>
                  <li>• Marketing platforms (with your consent)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Legal Requirements:</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• When required by South African law</li>
                  <li>• To protect our legal rights</li>
                  <li>• In response to court orders or legal processes</li>
                  <li>• To prevent fraud or criminal activity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
            <h4 className="font-bold mb-3">We Never:</h4>
            <ul className="space-y-1">
              <li>✓ Sell your personal information to third parties</li>
              <li>✓ Share information for third-party marketing without consent</li>
              <li>✓ Transfer data outside South Africa without adequate protection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Eye className="h-8 w-8 mr-3 text-blue-600" />
          Your Rights Under POPIA
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">You have the right to:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Access</h4>
              <p className="text-sm">Request a copy of your personal information</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Correction</h4>
              <p className="text-sm">Request correction of inaccurate information</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Deletion</h4>
              <p className="text-sm">Request deletion of your information (subject to legal requirements)</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Objection</h4>
              <p className="text-sm">Object to processing for direct marketing</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Restriction</h4>
              <p className="text-sm">Request limitation on how we use your data</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Data Portability</h4>
              <p className="text-sm">Receive your data in a structured format</p>
            </div>
          </div>
          <div className="mt-6 bg-blue-50 p-4 rounded">
            <p className="font-semibold mb-2">To exercise these rights, contact our Information Officer:</p>
            <p className="text-sm">Email: privacy@waternest.co.za</p>
            <p className="text-sm">Phone: 082 XXX XXXX</p>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 flex items-center">
          <Lock className="h-8 w-8 mr-3 text-blue-600" />
          Data Security
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">We implement appropriate technical and organizational measures:</p>
          <ul className="space-y-2">
            <li>• SSL encryption for all data transmission</li>
            <li>• Secure, password-protected databases</li>
            <li>• Regular security audits</li>
            <li>• Access controls and authentication</li>
            <li>• Employee confidentiality agreements</li>
            <li>• Regular data backups</li>
          </ul>
        </div>
      </section>

      {/* Data Retention */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Data Retention</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-2">Account Information</h4>
            <p className="text-sm">Duration of account plus 5 years (tax purposes)</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-2">Order Records</h4>
            <p className="text-sm">5 years (accounting and warranty purposes)</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-2">Marketing Communications</h4>
            <p className="text-sm">Until you opt out</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-2">Cookies</h4>
            <p className="text-sm">As specified in cookie settings</p>
          </div>
        </div>
      </section>

      {/* Cookies */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Cookies and Tracking</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4">We use cookies to:</p>
          <ul className="space-y-2 mb-6">
            <li>• Remember your preferences</li>
            <li>• Analyze website traffic</li>
            <li>• Improve user experience</li>
            <li>• Enable shopping cart functionality</li>
          </ul>
          <p className="text-sm text-gray-600 mb-4">You can control cookies through your browser settings.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Essential</h4>
              <p className="text-sm">Required for website functionality</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Performance</h4>
              <p className="text-sm">Help us improve the website</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <h4 className="font-semibold mb-2">Marketing</h4>
              <p className="text-sm">Used for targeted advertising (with consent)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Information Officer</h3>
            <p className="text-sm">Company: Water Nest</p>
            <p className="text-sm">Address: Kathu, Northern Cape, South Africa</p>
            <p className="text-sm">Email: privacy@waternest.co.za</p>
            <p className="text-sm">Phone: 082 XXX XXXX</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Information Regulator (POPIA Complaints)</h3>
            <p className="text-sm">Website: www.inforegulator.org.za</p>
            <p className="text-sm">Email: inforeg@justice.gov.za</p>
            <p className="text-sm">Phone: 012 406 4818</p>
          </div>
        </div>
      </section>
    </div>
  );
}
