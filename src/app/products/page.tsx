"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Droplet,
  Waves,
  FlaskConical,
  Wrench,
  FileText,
  Search,
  Phone,
  Download,
  CheckCircle,
  ArrowRight,
  Factory,
  Building2,
  Settings,
  Sparkles
} from "lucide-react";

// Product Categories with detailed information
const productCategories = [
  {
    id: "water-filters",
    name: "Water Filtration Systems",
    icon: Droplet,
    color: "sky",
    description: "Comprehensive filtration solutions for removing sediment, chlorine, and impurities",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80",
    applications: ["Residential homes", "Apartments", "Small offices", "Retail spaces"],
    products: [
      {
        name: "Sediment Pre-Filters",
        description: "Remove sand, silt, rust and particles down to 5 microns",
        applications: "Municipal water, borehole pre-treatment",
        specifications: "5-50 micron options, Flow rates: 10-40 L/min"
      },
      {
        name: "Carbon Block Filters",
        description: "Eliminate chlorine, taste, odor and organic compounds",
        applications: "Drinking water, food service, ice machines",
        specifications: "NSF certified, 10,000-15,000L capacity"
      },
      {
        name: "Whole House Filtration",
        description: "Complete home protection with multi-stage filtration",
        applications: "Residential properties, guest houses",
        specifications: "3-5 stage systems, 20-30 L/min flow"
      }
    ],
    certifications: ["SABS", "NSF/ANSI 42", "NSF/ANSI 53"],
    documentation: ["Product brochures", "Installation manuals", "Maintenance guides"]
  },
  {
    id: "purification-systems",
    name: "Purification Systems",
    icon: FlaskConical,
    color: "cyan",
    description: "Advanced purification technologies including RO, UV, and ultrafiltration",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
    applications: ["Healthcare facilities", "Laboratories", "Commercial kitchens", "Pharmaceutical"],
    products: [
      {
        name: "Reverse Osmosis Systems",
        description: "4 to 7-stage RO systems with 95-99% contaminant removal",
        applications: "Drinking water, dialysis, laboratory use",
        specifications: "50-400 GPD capacity, TDS reduction to <50ppm"
      },
      {
        name: "UV Sterilization Units",
        description: "Ultraviolet disinfection eliminates 99.99% bacteria & viruses",
        applications: "Post-filtration, municipal backup, borehole water",
        specifications: "6-55W lamps, 4-40 L/min flow rates"
      },
      {
        name: "Ultrafiltration Systems",
        description: "0.01 micron hollow fiber membrane technology",
        applications: "Turbid water, surface water treatment",
        specifications: "500-10,000 L/day, chemical-free operation"
      }
    ],
    certifications: ["NSF/ANSI 58", "WHO Standards", "SANS 241"],
    documentation: ["Technical datasheets", "Performance reports", "Water quality guides"]
  },
  {
    id: "portable-treatment",
    name: "Portable Treatment Plants",
    icon: Settings,
    color: "teal",
    description: "Containerized mobile water treatment solutions for rapid deployment",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80",
    applications: ["Construction sites", "Emergency relief", "Events & festivals", "Mining camps"],
    products: [
      {
        name: "Compact Treatment Units (500-5,000 L/h)",
        description: "Skid-mounted systems for small to medium applications",
        applications: "Site offices, remote camps, temporary facilities",
        specifications: "20ft container, plug-and-play, 48hr deployment"
      },
      {
        name: "Industrial Treatment Plants (10,000-50,000 L/h)",
        description: "Full-scale containerized treatment for large operations",
        applications: "Mining, construction, agriculture, municipalities",
        specifications: "40ft container, automated controls, remote monitoring"
      },
      {
        name: "Emergency Response Units",
        description: "Rapid deployment systems for disaster relief",
        applications: "Floods, droughts, infrastructure failures",
        specifications: "Trailer-mounted, generator compatible, 24hr setup"
      }
    ],
    certifications: ["ISO 9001", "SANS 241 Compliant", "OHSAS 18001"],
    documentation: ["System schematics", "Operating manuals", "Rental agreements"]
  },
  {
    id: "specialized-equipment",
    name: "Specialized Equipment",
    icon: Wrench,
    color: "purple",
    description: "Industrial water treatment equipment and specialized applications",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    applications: ["Manufacturing", "Food & beverage", "Hospitality", "Agriculture"],
    products: [
      {
        name: "Water Softeners",
        description: "Ion exchange systems for hardness removal",
        applications: "Hotels, laundries, boilers, cooling towers",
        specifications: "Capacities: 1,000-50,000 L/day, automatic regeneration"
      },
      {
        name: "Ice Machines with Filtration",
        description: "Commercial ice production with integrated purification",
        applications: "Restaurants, hospitals, hotels, catering",
        specifications: "50-500 kg/day production, food-grade ice"
      },
      {
        name: "Hydrocooler Systems",
        description: "Rapid cooling for agricultural produce",
        applications: "Pack houses, farms, export facilities",
        specifications: "0-4°C cooling, 200-2000 kg/hour capacity"
      },
      {
        name: "Hydroboil Units",
        description: "Instant boiling water dispensers with filtration",
        applications: "Offices, hospitals, schools, cafeterias",
        specifications: "1.5-10L capacity, 98°C output, energy efficient"
      }
    ],
    certifications: ["SABS", "CE Marking", "Energy Star"],
    documentation: ["Equipment catalogs", "Service schedules", "Parts lists"]
  },
  {
    id: "industrial-solutions",
    name: "Industrial Water Solutions",
    icon: Factory,
    color: "orange",
    description: "Large-scale treatment systems for industrial and municipal applications",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    applications: ["Municipalities", "Factories", "Power plants", "Wastewater treatment"],
    products: [
      {
        name: "Wastewater Treatment Plants",
        description: "Biological and chemical treatment for effluent management",
        applications: "Industrial effluent, municipal sewage, process water",
        specifications: "Custom designed, 10-1000 m³/day, Green Drop certified"
      },
      {
        name: "Borehole Water Treatment",
        description: "Complete treatment packages for groundwater sources",
        applications: "Estates, farms, industrial sites, rural areas",
        specifications: "pH correction, iron removal, chlorination, UV"
      },
      {
        name: "Desalination Systems",
        description: "Seawater and brackish water reverse osmosis",
        applications: "Coastal areas, islands, high-salinity regions",
        specifications: "SWRO & BWRO, 10-10,000 m³/day, energy recovery"
      }
    ],
    certifications: ["Blue Drop", "Green Drop", "ISO 14001"],
    documentation: ["Engineering drawings", "Commissioning reports", "O&M manuals"]
  },
  {
    id: "testing-maintenance",
    name: "Testing & Maintenance",
    icon: FlaskConical,
    color: "emerald",
    description: "Water quality testing equipment and maintenance supplies",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
    applications: ["All water systems", "Quality control", "Compliance monitoring"],
    products: [
      {
        name: "Water Testing Kits",
        description: "Professional and portable water quality analysis",
        applications: "Field testing, laboratory use, compliance checks",
        specifications: "pH, TDS, chlorine, hardness, bacteria tests"
      },
      {
        name: "Replacement Parts & Consumables",
        description: "Filters, membranes, UV lamps, and service parts",
        applications: "System maintenance, preventive service",
        specifications: "OEM and compatible parts, scheduled delivery"
      },
      {
        name: "Treatment Chemicals",
        description: "Chlorine, pH adjusters, coagulants, disinfectants",
        applications: "Water treatment, pool maintenance, industrial use",
        specifications: "SABS approved, bulk and retail packaging"
      }
    ],
    certifications: ["ISO 17025", "SANAS Accredited"],
    documentation: ["Test procedures", "Safety data sheets", "Quality certificates"]
  }
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter categories based on search
  const filteredCategories = productCategories.filter(category => {
    const matchesSearch = searchQuery === "" || 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.products.some(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    return matchesSearch;
  });

  const displayCategories = selectedCategory 
    ? filteredCategories.filter(c => c.id === selectedCategory)
    : filteredCategories;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Waves className="h-3 w-3 mr-1 inline" />
              Product Catalog
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Water Treatment Solutions
            </h1>
            <p className="text-xl md:text-2xl text-sky-100 mb-8">
              Explore our comprehensive range of water purification, filtration, and treatment systems. 
              From residential to industrial applications, we supply it all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-sky-700 hover:bg-gray-100">
                  <Phone className="mr-2 h-5 w-5" />
                  Request Quote
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/20 hover:bg-transparent hover:border-white font-bold">
                  <Download className="mr-2 h-5 w-5" />
                  Download Catalog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products, categories, applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category Quick Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap"
              >
                All Categories
              </Button>
              {productCategories.slice(0, 3).map((cat) => (
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
            Showing <span className="font-semibold text-gray-900">{displayCategories.length}</span> of{" "}
            <span className="font-semibold text-gray-900">{productCategories.length}</span> categories
          </div>
        </div>
      </section>

      {/* Category Overview Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={category.id} 
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-sky-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`inline-flex items-center gap-2 bg-${category.color}-600 text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        <IconComponent className="h-4 w-4" />
                        {category.products.length} Products
                      </div>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-2xl group-hover:text-sky-700 transition-colors flex items-center gap-2">
                      <IconComponent className={`h-6 w-6 text-${category.color}-600`} />
                      {category.name}
                    </CardTitle>
                    <p className="text-gray-600 mt-2">{category.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Applications */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Applications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.applications.map((app, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {category.certifications.map((cert, i) => (
                          <Badge key={i} className="bg-green-100 text-green-700 border-green-200 text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Documentation */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Documentation Available
                      </h4>
                      <ul className="space-y-1">
                        {category.documentation.map((doc, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-center gap-2">
                            <Download className="h-3 w-3 text-sky-600" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <Button 
                        className="w-full bg-sky-600 hover:bg-sky-700"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        View Full Range
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Products Section - Shows when category is selected */}
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
                    ← Back to All Categories
                  </Button>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {category.name} - Product Range
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl">
                    {category.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {category.products.map((product, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle className="text-xl text-sky-700 flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-700">{product.description}</p>
                        
                        <div className="pt-3 border-t border-gray-100">
                          <h5 className="font-semibold text-sm text-gray-700 mb-2">Applications:</h5>
                          <p className="text-sm text-gray-600">{product.applications}</p>
                        </div>

                        <div className="pt-3 border-t border-gray-100">
                          <h5 className="font-semibold text-sm text-gray-700 mb-2">Technical Specifications:</h5>
                          <p className="text-sm text-gray-600">{product.specifications}</p>
                        </div>

                        <div className="pt-4 flex gap-2">
                          <Link href="/contact" className="flex-1">
                            <Button variant="outline" className="w-full border-2 border-sky-600 text-sky-700 hover:bg-sky-50">
                              <FileText className="mr-2 h-4 w-4" />
                              Get Datasheet
                            </Button>
                          </Link>
                          <Link href="/contact" className="flex-1">
                            <Button className="w-full bg-sky-600 hover:bg-sky-700">
                              <Phone className="mr-2 h-4 w-4" />
                              Request Quote
                            </Button>
                          </Link>
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

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Help Choosing the Right Solution?
          </h2>
          <p className="text-lg md:text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Our water treatment experts can analyze your requirements and recommend the perfect system for your application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-sky-700 hover:bg-gray-100">
                <Phone className="mr-2 h-5 w-5" />
                Speak to an Expert
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                View Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
