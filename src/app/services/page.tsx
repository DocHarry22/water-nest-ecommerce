"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Wrench,
  Droplet,
  Calendar,
  Search,
  Phone,
  CheckCircle,
  Clock,
  Users,
  Shield,
  Award,
  Zap,
  FileText,
  Settings,
  FlaskConical,
  Waves
} from "lucide-react";

// Services Categories
const serviceCategories = [
  {
    id: "installation",
    name: "Installation Services",
    icon: Wrench,
    color: "sky",
    tagline: "Professional installation by certified technicians",
    description: "Expert installation of all water treatment systems with full commissioning and testing",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80",
    services: [
      {
        name: "Residential System Installation",
        description: "Complete installation of home water treatment systems including filters, RO units, and softeners",
        duration: "2-4 hours",
        includes: ["Site assessment", "System installation", "Plumbing connections", "Pressure testing", "Water quality testing", "User training"],
        pricing: "From R1,500",
        availability: "Monday - Saturday, 8AM - 5PM"
      },
      {
        name: "Commercial Installation",
        description: "Large-scale installation for offices, restaurants, hotels, and commercial facilities",
        duration: "1-3 days",
        includes: ["Engineering assessment", "System design", "Professional installation", "Multi-point testing", "Staff training", "Compliance certification"],
        pricing: "Custom quote required",
        availability: "Flexible scheduling including after-hours"
      },
      {
        name: "Industrial Plant Installation",
        description: "Full turnkey installation of industrial water treatment plants and wastewater systems",
        duration: "1-4 weeks",
        includes: ["Site preparation", "Equipment installation", "Automation setup", "System integration", "Commissioning", "Performance testing"],
        pricing: "Project-based pricing",
        availability: "24/7 project support available"
      }
    ],
    benefits: ["Certified technicians", "2-year workmanship warranty", "Free first service", "Same-day emergency service"],
    certifications: ["SABS Approved Installers", "PIRB Registered", "ISO 9001"]
  },
  {
    id: "maintenance",
    name: "Maintenance & Servicing",
    icon: Settings,
    color: "emerald",
    tagline: "Keep your systems running at peak performance",
    description: "Scheduled maintenance, filter replacements, and preventive servicing for all water treatment equipment",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    services: [
      {
        name: "Residential Maintenance Plans",
        description: "Quarterly or bi-annual servicing packages for home water systems",
        duration: "1-2 hours per visit",
        includes: ["Filter replacement", "System inspection", "Pressure checks", "Water quality testing", "Parts replacement", "Performance report"],
        pricing: "R450 per service / R1,500 annual plan",
        availability: "Monday - Friday, 8AM - 5PM"
      },
      {
        name: "Commercial Service Contracts",
        description: "Monthly or quarterly maintenance for commercial and hospitality facilities",
        duration: "2-4 hours per visit",
        includes: ["Preventive maintenance", "Filter/consumables supply", "Emergency callouts", "Compliance testing", "Equipment inspections", "Detailed reporting"],
        pricing: "From R2,500/month",
        availability: "Priority scheduling with 24hr emergency response"
      },
      {
        name: "Industrial Plant Servicing",
        description: "Comprehensive O&M contracts for industrial water and wastewater treatment plants",
        duration: "Ongoing support",
        includes: ["24/7 monitoring", "Scheduled maintenance", "Spare parts supply", "Chemical supply", "Operator training", "Performance optimization"],
        pricing: "Custom O&M contracts",
        availability: "24/7/365 support"
      }
    ],
    benefits: ["Scheduled reminders", "Parts discounts", "Priority emergency service", "Extended warranties"],
    certifications: ["OEM Certified Technicians", "Green Drop Compliance", "Blue Drop Accredited"]
  },
  {
    id: "water-testing",
    name: "Water Quality Testing",
    icon: FlaskConical,
    color: "purple",
    tagline: "Comprehensive water analysis and reporting",
    description: "Accredited laboratory testing and on-site analysis for all water quality parameters",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
    services: [
      {
        name: "Basic Water Quality Test",
        description: "Standard potability testing for residential properties",
        duration: "48-hour turnaround",
        includes: ["pH", "TDS", "Turbidity", "Chlorine", "Hardness", "Basic bacteria screen"],
        pricing: "R650 per sample",
        availability: "Sample collection Mon-Fri"
      },
      {
        name: "Comprehensive Water Analysis",
        description: "Full SANS 241 compliance testing for commercial and municipal use",
        duration: "5-7 days turnaround",
        includes: ["All SANS 241 parameters", "Heavy metals", "Bacterial analysis", "Chemical contaminants", "Professional report", "Recommendations"],
        pricing: "R3,500 per sample",
        availability: "Accredited SANAS testing"
      },
      {
        name: "Industrial Effluent Testing",
        description: "Wastewater analysis for trade effluent and environmental compliance",
        duration: "7-10 days",
        includes: ["COD/BOD", "TSS/TDS", "Nutrients", "Heavy metals", "pH & conductivity", "Compliance certification"],
        pricing: "From R4,500",
        availability: "Monthly monitoring contracts available"
      }
    ],
    benefits: ["SANAS accredited lab", "Digital reports", "Historical tracking", "Compliance support"],
    certifications: ["ISO 17025", "SANAS Accredited", "SANS 241 Compliant"]
  },
  {
    id: "borehole-services",
    name: "Borehole Services",
    icon: Waves,
    color: "cyan",
    tagline: "Complete borehole drilling and equipping",
    description: "Professional borehole drilling, pump installation, and groundwater treatment solutions",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    services: [
      {
        name: "Borehole Drilling",
        description: "Hydro-geological surveys and professional borehole drilling up to 150m depth",
        duration: "2-5 days",
        includes: ["Site assessment", "Geophysical survey", "Drilling permit", "Professional drilling", "Yield testing", "Water quality testing"],
        pricing: "From R450 per meter",
        availability: "Project scheduling with 2-week lead time"
      },
      {
        name: "Pump Installation & Equipping",
        description: "Complete borehole equipping with submersible pumps and delivery systems",
        duration: "1-2 days",
        includes: ["Pump selection", "Submersible pump", "Rising main installation", "Pressure tank", "Control panel", "Commissioning"],
        pricing: "From R18,500",
        availability: "Scheduled installations"
      },
      {
        name: "Borehole Water Treatment",
        description: "Customized treatment systems for borehole water quality issues",
        duration: "1-3 days",
        includes: ["Water analysis", "Treatment design", "pH correction", "Iron/manganese removal", "UV sterilization", "System installation"],
        pricing: "From R12,000",
        availability: "Flexible scheduling"
      }
    ],
    benefits: ["Licensed drillers", "Yield guarantees", "10-year borehole warranty", "Free maintenance year 1"],
    certifications: ["Water Drilling License", "PIRB Registered", "Geo-Hydrologist Approved"]
  },
  {
    id: "wastewater-treatment",
    name: "Wastewater Treatment",
    icon: Droplet,
    color: "teal",
    tagline: "Expert wastewater and effluent management",
    description: "Design, installation, and operation of wastewater treatment plants for compliance and environmental protection",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
    services: [
      {
        name: "WWTP Design & Installation",
        description: "Custom wastewater treatment plant design for residential estates and commercial facilities",
        duration: "4-12 weeks",
        includes: ["Flow analysis", "Treatment design", "Plant construction", "Automation setup", "Green Drop registration", "Commissioning"],
        pricing: "From R250,000",
        availability: "Project-based engagement"
      },
      {
        name: "WWTP Operations & Maintenance",
        description: "Full operational management of wastewater treatment facilities",
        duration: "Ongoing contract",
        includes: ["Daily operations", "Chemical dosing", "Sludge removal", "Compliance monitoring", "Green/Blue Drop reporting", "24/7 emergency response"],
        pricing: "From R15,000/month",
        availability: "Long-term O&M contracts"
      },
      {
        name: "Effluent Compliance Audits",
        description: "Regulatory compliance assessments and corrective action plans",
        duration: "2-5 days",
        includes: ["Site inspection", "Process audit", "Effluent testing", "Compliance report", "Remediation plan", "Authority liaison"],
        pricing: "R8,500 per audit",
        availability: "Scheduled or emergency audits"
      }
    ],
    benefits: ["Green Drop certified operators", "Guaranteed compliance", "Emergency response", "Authority liaison"],
    certifications: ["Green Drop Certified", "Blue Drop Accredited", "ISO 14001"]
  },
  {
    id: "consultation",
    name: "Consultation & Design",
    icon: FileText,
    color: "orange",
    tagline: "Expert advice and custom engineering solutions",
    description: "Professional water engineering consultation and treatment system design services",
    image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=800&q=80",
    services: [
      {
        name: "Water Quality Assessment",
        description: "Professional evaluation of water sources and treatment requirements",
        duration: "1-3 days",
        includes: ["Site visit", "Water sampling", "Laboratory analysis", "Treatment recommendations", "System sizing", "Written report"],
        pricing: "R4,500",
        availability: "Bookings within 1 week"
      },
      {
        name: "Treatment System Design",
        description: "Custom engineering design for industrial and municipal water treatment",
        duration: "2-6 weeks",
        includes: ["Process design", "Equipment specifications", "P&ID drawings", "BOQ preparation", "Tender documentation", "Design review"],
        pricing: "From R25,000",
        availability: "Project-based engagement"
      },
      {
        name: "Feasibility Studies",
        description: "Technical and economic feasibility for large water projects",
        duration: "4-8 weeks",
        includes: ["Demand analysis", "Source evaluation", "Technology assessment", "Cost estimation", "Risk analysis", "Executive summary"],
        pricing: "From R50,000",
        availability: "By appointment"
      }
    ],
    benefits: ["Registered engineers", "Third-party verification", "Authority approvals", "Tender support"],
    certifications: ["ECSA Registered", "SACNASP", "Professional Engineering"]
  }
];

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = serviceCategories.filter(category => {
    const matchesSearch = searchQuery === "" || 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const displayCategories = selectedCategory 
    ? filteredCategories.filter(c => c.id === selectedCategory)
    : filteredCategories;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Wrench className="h-3 w-3 mr-1 inline" />
              Professional Services
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Water Treatment Services
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8">
              From installation to ongoing maintenance, borehole drilling to wastewater management - 
              we provide complete water treatment services across South Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-gray-100">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book a Service
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/20 hover:bg-transparent hover:border-white font-bold">
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Service: 24/7
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap"
              >
                All Services
              </Button>
              {serviceCategories.slice(0, 3).map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="whitespace-nowrap"
                >
                  {cat.name.split(" ")[0]}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">{displayCategories.length}</span> service categories available
          </div>
        </div>
      </section>

      {/* Service Category Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-300"
                >
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`inline-flex items-center gap-2 bg-${category.color}-600 text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        <IconComponent className="h-4 w-4" />
                        {category.services.length} Service Options
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                      <IconComponent className={`h-6 w-6 text-${category.color}-600`} />
                      {category.name}
                    </CardTitle>
                    <p className="text-sm font-semibold text-emerald-700 mt-1">{category.tagline}</p>
                    <p className="text-gray-600 mt-2">{category.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-1">
                        {category.benefits.map((benefit, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                            <Zap className="h-3 w-3 text-emerald-600" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-600" />
                        Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.certifications.map((cert, i) => (
                          <Badge key={i} className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex gap-2">
                      <Button 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        View Services
                      </Button>
                      <Link href="/contact">
                        <Button variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services - When category selected */}
      {selectedCategory && displayCategories.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            {displayCategories.map((category) => (
              <div key={category.id}>
                <div className="mb-8">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCategory(null)}
                    className="mb-4"
                  >
                    ← Back to All Services
                  </Button>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">{category.tagline}</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {category.services.map((service, index) => (
                    <Card key={index} className="hover:shadow-xl transition-all border-2 hover:border-emerald-300">
                      <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50">
                        <div className="flex justify-between items-start flex-wrap gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-2xl text-emerald-700 mb-2">
                              {service.name}
                            </CardTitle>
                            <p className="text-gray-700">{service.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-700">{service.pricing}</div>
                            <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                              <Clock className="h-4 w-4" />
                              {service.duration}
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* What's Included */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              What&apos;s Included
                            </h4>
                            <ul className="space-y-2">
                              {service.includes.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                  <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Service Details */}
                          <div className="space-y-4">
                            <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-5 w-5 text-sky-600" />
                                <h5 className="font-semibold text-gray-900">Availability</h5>
                              </div>
                              <p className="text-sm text-gray-700">{service.availability}</p>
                            </div>

                            <div className="flex gap-2">
                              <Link href="/contact" className="flex-1">
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Book Now
                                </Button>
                              </Link>
                              <Link href="/contact">
                                <Button variant="outline" className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                                  <Phone className="mr-2 h-4 w-4" />
                                  Call
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Water Nest Services?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Over 25 years of expertise in water treatment across South Africa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Expert Team", desc: "Certified technicians & engineers", color: "sky" },
              { icon: Shield, title: "Quality Guaranteed", desc: "Workmanship & parts warranties", color: "emerald" },
              { icon: Clock, title: "24/7 Emergency", desc: "Round-the-clock support available", color: "orange" },
              { icon: Award, title: "Certified & Compliant", desc: "All major industry certifications", color: "purple" }
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all">
                  <CardContent className="pt-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${item.color}-100 mb-4`}>
                      <IconComp className={`h-8 w-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Book a service, request a quote, or speak to our technical team about your water treatment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-emerald-700 hover:bg-gray-100">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Service
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                +27 (0)11 123 4567
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
