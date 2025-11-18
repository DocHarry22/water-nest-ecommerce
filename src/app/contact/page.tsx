"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Building,
  User,
  FileText,
  Calendar
} from "lucide-react";

const offices = [
  {
    name: "Head Office - Kathu",
    address: "11 Ian Flemming Street, Kathu, Northern Cape, 8446",
    phone: "+27 76 075 4406",
    email: "admin@waternest.co.za",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM"
  },
  {
    name: "Kuruman Office",
    address: "Seven miles, Kuruman, Northern Cape, 8460",
    phone: "+27 82 724 9717",
    email: "admin@waternest.co.za",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM"
  },
  {
    name: "Deben Office",
    address: "Deben, Northern Cape, 8463",
    phone: "+27 76 075 4407",
    email: "admin@waternest.co.za",
    hours: "Mon-Fri: 8:00 AM - 5:00 PM"
  }
];

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    value: "+27 76 075 4407",
    action: "tel:+27760754407"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message",
    value: "admin@waternest.co.za",
    action: "mailto:admin@waternest.co.za"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with support",
    value: "Available 24/7",
    action: "#chat"
  },
  {
    icon: Calendar,
    title: "Book a Visit",
    description: "Schedule consultation",
    value: "Free assessment",
    action: "/quote"
  }
];

const faqs = [
  {
    question: "What are your service areas?",
    answer: "We serve all major cities across the Northern Cape, but delivery nation wide including Johannesburg, Cape Town, Durban, Pretoria, and surrounding areas."
  },
  {
    question: "Do you offer emergency services?",
    answer: "Yes, we provide 24/7 emergency support for critical water treatment issues. Call our emergency hotline at +27 82 999 8888."
  },
  {
    question: "How quickly can you respond?",
    answer: "Standard quotes within 24 hours. Emergency callouts within 2-4 hours depending on location."
  },
  {
    question: "Do you provide free consultations?",
    answer: "Yes, we offer free initial consultations and water quality assessments for all potential clients."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <MessageCircle className="h-3 w-3 mr-1 inline" />
              We&apos;re Here to Help
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white">
              Have questions? Our expert team is ready to assist you with all your water treatment needs.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <a
                  key={index}
                  href={method.action}
                  className="block group"
                >
                  <Card className="h-full hover:shadow-lg transition-all hover:border-sky-300">
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 bg-sky-100 rounded-full mb-4 group-hover:bg-sky-200 transition-colors">
                        <Icon className="h-7 w-7 text-sky-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                      <p className="text-sky-600 font-medium">{method.value}</p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              {submitted ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="pt-6 text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-900 font-medium">Full Name *</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          className="pl-10 placeholder:text-gray-500"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-gray-900 font-medium">Company Name</Label>
                      <div className="relative mt-1">
                        <Building className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your Company"
                          className="pl-10 placeholder:text-gray-500"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-gray-900 font-medium">Email Address *</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          className="pl-10 placeholder:text-gray-500"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-900 font-medium">Phone Number *</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                        <Input
                          id="phone"
                          type="tel"
                          required
                          placeholder="+27 11 123 4567"
                          className="pl-10 placeholder:text-gray-500"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-gray-900 font-medium">Subject *</Label>
                    <div className="relative mt-1">
                      <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                      <Input
                        id="subject"
                        type="text"
                        required
                        placeholder="How can we help?"
                        className="pl-10 placeholder:text-gray-500"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-gray-900 font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Tell us about your water treatment needs..."
                      rows={6}
                      className="mt-1 placeholder:text-gray-500"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Offices
              </h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-sky-600" />
                        {office.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <p className="text-gray-800">{office.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-gray-500 shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-sky-600 hover:underline">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-gray-500 shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-sky-600 hover:underline font-medium">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
                        <p className="text-gray-800">{office.hours}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Emergency Contact */}
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-red-900 flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      24/7 Emergency Hotline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700 mb-2">
                      For urgent water treatment emergencies:
                    </p>
                    <a
                      href="tel:+27829998888"
                      className="text-2xl font-bold text-red-900 hover:underline"
                    >
                      +27 82 999 8888
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Find Us on the Map
          </h2>
          <div className="bg-gray-200 rounded-lg overflow-hidden" style={{ height: "450px" }}>
            {/* Placeholder for Google Maps embed */}
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  Google Maps integration would go here
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Head Office: 123 Water Street, Sandton, Johannesburg
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-800">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Clock className="h-12 w-12 text-sky-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Business Hours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900">Office Hours</h3>
                  <div className="space-y-2 text-gray-800">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900">Emergency Services</h3>
                  <div className="space-y-2 text-gray-800">
                    <p>24/7 Emergency Support</p>
                    <p>Response Time: 2-4 hours</p>
                    <p className="text-sky-600 font-bold">+27 82 999 8888</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
