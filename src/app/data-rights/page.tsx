import { Metadata } from "next";
import { Shield, FileText, Trash2, Lock, Download, Ban } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Data Rights Portal - Your POPIA Rights",
  description: "Exercise your rights under the Protection of Personal Information Act (POPIA).",
};

export default function DataRightsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 flex items-center">
            <Shield className="h-10 w-10 mr-3 text-blue-600" />
            Data Rights Portal
          </h1>
          <p className="text-gray-600 text-lg">
            Exercise your rights under the Protection of Personal Information Act (POPIA). 
            Submit a request below to access, correct, delete, or manage your personal data.
          </p>
        </div>

        {/* Rights Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Access Request */}
          <Link href="/data-rights/access" className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-lg p-6 transition-all hover:shadow-lg group">
            <div className="flex items-start mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-600 transition-colors">
                <FileText className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Access Request</h3>
                <p className="text-sm text-gray-600">Request a copy of your personal information</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              We&apos;ll provide you with a complete report of all personal data we hold about you.
            </p>
          </Link>

          {/* Correction Request */}
          <Link href="/data-rights/correction" className="bg-white border-2 border-gray-200 hover:border-blue-500 rounded-lg p-6 transition-all hover:shadow-lg group">
            <div className="flex items-start mb-4">
              <div className="bg-green-100 p-3 rounded-lg mr-4 group-hover:bg-green-600 transition-colors">
                <FileText className="h-6 w-6 text-green-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Correction Request</h3>
                <p className="text-sm text-gray-600">Request correction of inaccurate information</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Update or correct any inaccurate personal information we have on file.
            </p>
          </Link>

          {/* Deletion Request */}
          <Link href="/data-rights/deletion" className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-lg p-6 transition-all hover:shadow-lg group">
            <div className="flex items-start mb-4">
              <div className="bg-red-100 p-3 rounded-lg mr-4 group-hover:bg-red-600 transition-colors">
                <Trash2 className="h-6 w-6 text-red-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Deletion Request</h3>
                <p className="text-sm text-gray-600">Request deletion of your information</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Request permanent deletion of your personal data (subject to legal requirements).
            </p>
          </Link>

          {/* Objection Request */}
          <Link href="/data-rights/objection" className="bg-white border-2 border-gray-200 hover:border-orange-500 rounded-lg p-6 transition-all hover:shadow-lg group">
            <div className="flex items-start mb-4">
              <div className="bg-orange-100 p-3 rounded-lg mr-4 group-hover:bg-orange-600 transition-colors">
                <Ban className="h-6 w-6 text-orange-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Objection Request</h3>
                <p className="text-sm text-gray-600">Object to processing for direct marketing</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Stop receiving marketing communications and object to data processing.
            </p>
          </Link>

          {/* Restriction Request */}
          <Link href="/data-rights/restriction" className="bg-white border-2 border-gray-200 hover:border-purple-500 rounded-lg p-6 transition-all hover:shadow-lg group">
            <div className="flex items-start mb-4">
              <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-600 transition-colors">
                <Lock className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Restriction Request</h3>
                <p className="text-sm text-gray-600">Request limitation on how we use your data</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Limit how we process your personal information.
            </p>
          </Link>

          {/* Data Portability */}
          <Link href="/data-rights/portability" className="bg-white border-2 border-gray-200 hover:border-teal-500 rounded-lg p-6 transition-all hover:shadow-lg group">
            <div className="flex items-start mb-4">
              <div className="bg-teal-100 p-3 rounded-lg mr-4 group-hover:bg-teal-600 transition-colors">
                <Download className="h-6 w-6 text-teal-600 group-hover:text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Data Portability</h3>
                <p className="text-sm text-gray-600">Receive your data in a structured format</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Download your data in a machine-readable format (CSV, JSON).
            </p>
          </Link>
        </div>

        {/* Information Section */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-bold mb-3 text-gray-900">Processing Timeline</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• We will acknowledge your request within <strong>24 hours</strong></li>
            <li>• Most requests are processed within <strong>30 days</strong></li>
            <li>• You will receive email updates on your request status</li>
            <li>• Identity verification may be required for security purposes</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have questions about your data rights or need assistance, our Information Officer is here to help.
          </p>
          <div className="space-y-2">
            <p className="text-sm"><strong>Email:</strong> privacy@waternest.co.za</p>
            <p className="text-sm"><strong>Phone:</strong> 082 XXX XXXX</p>
            <p className="text-sm"><strong>Hours:</strong> Monday-Friday, 8:00 AM - 5:00 PM SAST</p>
          </div>
        </div>
      </div>
    </div>
  );
}
