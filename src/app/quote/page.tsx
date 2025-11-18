"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Send,
  CheckCircle,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  MessageSquare,
  Upload,
  DollarSign,
  Shield,
  Clock,
  Sparkles
} from "lucide-react";

const projectTypes = [
  "Residential Water Treatment",
  "Commercial Installation",
  "Industrial Plant",
  "Borehole Drilling",
  "Wastewater Treatment",
  "Portable Treatment Plant",
  "Maintenance Contract",
  "Water Testing Services",
  "Custom Solution"
];

const urgencyLevels = [
  { value: "standard", label: "Standard (2-3 weeks)", color: "blue" },
  { value: "urgent", label: "Urgent (Within 1 week)", color: "orange" },
  { value: "emergency", label: "Emergency (ASAP)", color: "red" }
];

export default function QuotePage() {
  const [referenceNumber] = useState(() => Date.now().toString().slice(-6));
  const [formData, setFormData] = useState({
    // Contact Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    
    // Project Details
    projectType: "",
    projectTitle: "",
    location: "",
    urgency: "standard",
    budget: "",
    
    // Requirements
    description: "",
    specifications: "",
    
    // Additional
    preferredContact: "email",
    existingSystem: false,
    siteVisitRequired: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send the data to an API
    console.log("Quote request submitted:", formData, attachments);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-2 border-green-600">
            <CardContent className="py-16 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quote Request Received!
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Thank you, {formData.firstName}!
              </p>
              <p className="text-gray-600 mb-8">
                We&apos;ve received your quote request and will get back to you within 24-48 hours.
              </p>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-sm text-gray-700">
                  <strong>Reference Number:</strong> <span className="text-sky-700">QR-{referenceNumber}</span>
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                >
                  Submit Another Quote
                </Button>
                <Button
                  onClick={() => window.location.href = "/"}
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  Return Home
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
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-sky-600 text-white">
            <FileText className="h-3 w-3 mr-1 inline" />
            Custom Quote Request
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Request a Quote
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your water treatment needs and we&apos;ll provide a detailed, no-obligation quote tailored to your requirements.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Clock, title: "Fast Response", desc: "Within 24-48 hours" },
            { icon: Shield, title: "No Obligation", desc: "Free quote, no commitment" },
            { icon: Sparkles, title: "Custom Solutions", desc: "Tailored to your needs" },
            { icon: DollarSign, title: "Competitive Pricing", desc: "Best value guaranteed" }
          ].map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Card key={i} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 text-sky-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-xs text-gray-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-6 w-6 text-sky-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+27 12 345 6789"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company (Optional)</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your Company"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="jobTitle">Job Title (Optional)</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="jobTitle"
                          value={formData.jobTitle}
                          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                          placeholder="Project Manager"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-sky-600" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectType">Project Type *</Label>
                    <select
                      id="projectType"
                      required
                      value={formData.projectType}
                      onChange={(e) => handleInputChange("projectType", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select a project type...</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      required
                      value={formData.projectTitle}
                      onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                      placeholder="e.g., Office Building Water Treatment System"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Project Location *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="City, Province"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency Level *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                      {urgencyLevels.map((level) => (
                        <div
                          key={level.value}
                          onClick={() => handleInputChange("urgency", level.value)}
                          className={`border-2 rounded-lg p-3 cursor-pointer transition-all ${
                            formData.urgency === level.value
                              ? `border-${level.color}-600 bg-${level.color}-50`
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              formData.urgency === level.value
                                ? `border-${level.color}-600 bg-${level.color}-600`
                                : "border-gray-300"
                            }`}>
                              {formData.urgency === level.value && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                            <span className="text-sm font-medium">{level.label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget">Estimated Budget (Optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        placeholder="R 50,000 - R 100,000"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-sky-600" />
                    Requirements & Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      required
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your water treatment needs, challenges, and objectives..."
                      rows={5}
                    />
                  </div>

                  <div>
                    <Label htmlFor="specifications">Technical Specifications (Optional)</Label>
                    <Textarea
                      id="specifications"
                      value={formData.specifications}
                      onChange={(e) => handleInputChange("specifications", e.target.value)}
                      placeholder="Flow rates, capacity requirements, water quality parameters, etc."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="attachments">Attachments (Optional)</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-sky-500 hover:bg-sky-50 transition-all"
                      >
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Click to upload drawings, photos, or documents
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />
                      </label>
                      {attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {attachments.map((file, i) => (
                            <div key={i} className="text-xs text-gray-600 flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="existingSystem"
                        checked={formData.existingSystem}
                        onChange={(e) => handleInputChange("existingSystem", e.target.checked)}
                        className="w-4 h-4 text-sky-600"
                      />
                      <Label htmlFor="existingSystem" className="cursor-pointer">
                        I have an existing water treatment system
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="siteVisitRequired"
                        checked={formData.siteVisitRequired}
                        onChange={(e) => handleInputChange("siteVisitRequired", e.target.checked)}
                        className="w-4 h-4 text-sky-600"
                      />
                      <Label htmlFor="siteVisitRequired" className="cursor-pointer">
                        Site visit required for assessment
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-sky-600 hover:bg-sky-700 text-lg py-6"
              >
                <Send className="mr-2 h-5 w-5" />
                Submit Quote Request
              </Button>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                {/* What Happens Next */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What Happens Next?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                        <span className="text-sky-600 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Immediate Confirmation</h4>
                        <p className="text-xs text-gray-600">You&apos;ll receive an email confirming your request</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                        <span className="text-sky-600 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Expert Review</h4>
                        <p className="text-xs text-gray-600">Our team reviews your requirements</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                        <span className="text-sky-600 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Detailed Quote</h4>
                        <p className="text-xs text-gray-600">Receive a comprehensive quote within 24-48 hours</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                        <span className="text-sky-600 font-bold text-sm">4</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">Consultation Call</h4>
                        <p className="text-xs text-gray-600">We discuss the quote and answer questions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Support */}
                <Card className="bg-linear-to-br from-sky-50 to-cyan-50 border-2 border-sky-200">
                  <CardContent className="pt-6 text-center">
                    <Phone className="h-10 w-10 text-sky-600 mx-auto mb-3" />
                    <h3 className="font-bold text-gray-900 mb-2">Need Help?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Speak to our team for immediate assistance
                    </p>
                    <Button variant="outline" className="w-full border-2 border-sky-600 text-sky-700 hover:bg-sky-50">
                      <Phone className="mr-2 h-4 w-4" />
                      Call +27 (0)11 123 4567
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
