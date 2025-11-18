import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel } from "@/components/ui/carousel";
import { StarRating } from "@/components/ui/star-rating";
import { NewsletterForm } from "@/components/ui/newsletter-form";
import { FeaturedProducts } from "@/components/home/featured-products";
import { 
  ArrowRight, 
  Droplet, 
  Shield, 
  Award, 
  Clock,
  Users,
  CheckCircle,
  Star,
  Quote,
  Calendar,
  ShoppingBag,
  Zap,
  Phone,
  FlaskConical,
  Sparkles,
  Waves
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced with SA lingo */}
      <section className="relative bg-linear-to-br from-sky-50 via-blue-50 to-cyan-50 py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <Badge className="mb-2 bg-linear-to-r from-sky-600 to-cyan-600 text-white border-0 hover:from-sky-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Sparkles className="h-3 w-3 mr-1 inline" />
                Premium Water Solutions Since 1999
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                <span className="bg-linear-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">Crystal Clear</span>
                <br />
                Water for Mzansi
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl">
                <strong className="text-sky-700">Howzit!</strong> We&apos;re your trusted partner for <span className="font-semibold text-cyan-700">advanced water purification</span> and <span className="font-semibold text-sky-700">treatment solutions</span>. From reverse osmosis to ultrafiltration, we&apos;ve got you sorted! 💧
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/shop" className="group">
                  <Button size="lg" className="w-full sm:w-auto bg-linear-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Shop Now - Lekker Deals!
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact" className="group">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-sky-600 text-sky-700 hover:bg-sky-50 hover:border-sky-700 transition-all duration-300 transform hover:scale-105">
                    <Phone className="mr-2 h-5 w-5" />
                    Get Free Quote
                  </Button>
                </Link>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 pt-4 items-center">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">SABS Approved</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Free Installation</span>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-sky-600 to-cyan-600 rounded-2xl opacity-25 group-hover:opacity-40 blur transition-all duration-300"></div>
              <div className="relative h-[350px] sm:h-[400px] lg:h-[550px] rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80"
                  alt="Crystal clear purified water - Water treatment solutions South Africa"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-600">Water Quality TDS</p>
                      <p className="text-2xl font-bold text-sky-700">{"<"}10 PPM</p>
                    </div>
                    <div className="h-12 w-12 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <Droplet className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with water engineering lingo */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="mb-4 bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-200 transition-colors">
              <FlaskConical className="h-3 w-3 mr-1 inline" />
              Our Competitive Edge
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Water Nest is <span className="text-sky-600">Kiff</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re not just another water company - we&apos;re <strong>water treatment specialists</strong> who understand Mzansi&apos;s unique challenges. <span className="text-sky-700 font-semibold">Tested. Trusted. Top-notch!</span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-sky-200 cursor-pointer">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-sky-100 to-cyan-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Droplet className="h-7 w-7 text-sky-600" />
                </div>
                <CardTitle className="text-xl group-hover:text-sky-700 transition-colors">99.9% Pure H₂O</CardTitle>
                <CardDescription className="text-base">
                  <strong className="text-gray-700">Advanced RO & UV purification</strong> - removing TDS, bacteria, viruses, and heavy metals. Lab-tested quality!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-green-200 cursor-pointer">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-green-100 to-emerald-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Shield className="h-7 w-7 text-green-600" />
                </div>
                <CardTitle className="text-xl group-hover:text-green-700 transition-colors">SABS Certified</CardTitle>
                <CardDescription className="text-base">
                  <strong className="text-gray-700">100% compliant</strong> with South African Bureau of Standards. ISO 9001 & NSF approved systems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-amber-200 cursor-pointer">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-amber-100 to-yellow-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Award className="h-7 w-7 text-amber-600" />
                </div>
                <CardTitle className="text-xl group-hover:text-amber-700 transition-colors">Water Engineers</CardTitle>
                <CardDescription className="text-base">
                  <strong className="text-gray-700">25+ years expertise</strong> in municipal, industrial & residential water treatment. We know our stuff!
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 hover:border-purple-200 cursor-pointer">
              <CardHeader>
                <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Clock className="h-7 w-7 text-purple-600" />
                </div>
                <CardTitle className="text-xl group-hover:text-purple-700 transition-colors">24/7 Support</CardTitle>
                <CardDescription className="text-base">
                  <strong className="text-gray-700">Always available</strong> - emergency repairs, technical support, or just a quick chat. We&apos;re here for you, boet!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Specialized Equipment Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              <span className="text-sky-600">Specialized</span> Water Equipment
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Industrial-grade equipment for commercial, agricultural & industrial applications
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { name: "Ice Machines", icon: "❄️", desc: "Commercial ice makers" },
              { name: "Water Softeners", icon: "💧", desc: "Hardness removal" },
              { name: "Hydrocoolers", icon: "🌡️", desc: "Produce cooling" },
              { name: "Water Chemicals", icon: "🧪", desc: "Treatment solutions" },
              { name: "Hydroboils", icon: "♨️", desc: "Instant hot water" },
              { name: "Portable Plants", icon: "🚚", desc: "Mobile treatment" }
            ].map((item, index) => (
              <Link key={index} href="/products" className="group">
                <Card className="text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-sky-300 transform hover:-translate-y-1">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                    <h4 className="font-bold text-gray-900 group-hover:text-sky-700 transition-colors mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/products" className="group">
              <Button size="lg" className="bg-sky-600 hover:bg-sky-700 shadow-lg hover:shadow-xl transition-all">
                Browse All Equipment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with gradient and hover */}
      <section className="py-12 md:py-16 bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center group cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <div className="flex flex-col items-center mb-2">
                <Users className="h-10 w-10 md:h-12 md:w-12 text-white mb-2 group-hover:animate-pulse" />
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">15K+</span>
              </div>
              <p className="text-white/90 text-sm md:text-base font-medium">Happy Customers</p>
              <p className="text-white/70 text-xs mt-1">Across Mzansi</p>
            </div>
            <div className="text-center group cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <div className="flex flex-col items-center mb-2">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-white mb-2 group-hover:animate-pulse" />
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">99.8%</span>
              </div>
              <p className="text-white/90 text-sm md:text-base font-medium">Satisfaction Rate</p>
              <p className="text-white/70 text-xs mt-1">5-Star Reviews</p>
            </div>
            <div className="text-center group cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <div className="flex flex-col items-center mb-2">
                <Award className="h-10 w-10 md:h-12 md:w-12 text-white mb-2 group-hover:animate-pulse" />
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">25+</span>
              </div>
              <p className="text-white/90 text-sm md:text-base font-medium">Years Experience</p>
              <p className="text-white/70 text-xs mt-1">Industry Leaders</p>
            </div>
            <div className="text-center group cursor-pointer transform hover:scale-110 transition-transform duration-300">
              <div className="flex flex-col items-center mb-2">
                <Waves className="h-10 w-10 md:h-12 md:w-12 text-white mb-2 group-hover:animate-pulse" />
                <span className="text-4xl md:text-5xl lg:text-6xl font-bold">500+</span>
              </div>
              <p className="text-white/90 text-sm md:text-base font-medium">Projects Done</p>
              <p className="text-white/70 text-xs mt-1">From CPT to JHB</p>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Services - Borehole & Wastewater */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200 transition-colors">
              <Zap className="h-3 w-3 mr-1 inline" />
              Specialty Engineering Services
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Industrial <span className="text-sky-600">Water Solutions</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From <strong>borehole drilling</strong> to <strong>portable treatment plants</strong> and <strong>wastewater management</strong> - we&apos;ve got the expertise for large-scale projects!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Borehole Drilling Card */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-300 cursor-pointer transform hover:-translate-y-2">
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden bg-linear-to-br from-blue-100 to-cyan-100">
                <Image
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80"
                  alt="Borehole drilling services in South Africa"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white border-0 shadow-lg">
                    <Waves className="h-3 w-3 mr-1 inline" />
                    Water Security
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                    <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-xl">
                      <Waves className="h-6 w-6" />
                    </div>
                    Borehole Drilling
                  </h3>
                  <p className="text-base md:text-lg opacity-95">
                    Professional drilling, sustainable water access
                  </p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl group-hover:text-blue-700 transition-colors">Complete Borehole Solutions</CardTitle>
                <CardDescription className="text-base">
                  <strong className="text-gray-700">End-to-end service:</strong> Geophysical surveys, drilling up to 200m, borehole development, pump installation & testing. Licensed & insured drillers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Hydro-geological site assessment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Rotary & percussion drilling methods</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Pump selection & installation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Water quality testing included</span>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Link href="/services/borehole-drilling" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
                      <Calendar className="mr-2 h-4 w-4" />
                      Request Site Survey
                    </Button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-700 hover:bg-blue-50">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Portable Treatment Plants Card */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-cyan-300 cursor-pointer transform hover:-translate-y-2">
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden bg-linear-to-br from-cyan-100 to-teal-100">
                <Image
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80"
                  alt="Portable water treatment plants for events and emergencies"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-cyan-600 text-white border-0 shadow-lg">
                    <Zap className="h-3 w-3 mr-1 inline" />
                    Mobile & Rapid Deploy
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                    <div className="h-12 w-12 rounded-xl bg-cyan-600 flex items-center justify-center shadow-xl">
                      <Zap className="h-6 w-6" />
                    </div>
                    Portable Treatment Plants
                  </h3>
                  <p className="text-base md:text-lg opacity-95">
                    Mobile purification for any location
                  </p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl group-hover:text-cyan-700 transition-colors">Containerized Water Systems</CardTitle>
                <CardDescription className="text-base">
                  <strong className="text-gray-700">Turnkey mobile solutions:</strong> Trailer-mounted & containerized treatment plants. Perfect for construction sites, events, disaster relief & temporary operations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Rapid deployment (24-48 hours)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Capacities: 500L/h to 50,000L/h</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Rental or purchase options</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Full operator training included</span>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Link href="/services/portable-treatment" className="flex-1">
                    <Button className="w-full bg-cyan-600 hover:bg-cyan-700 shadow-lg hover:shadow-xl transition-all">
                      <Calendar className="mr-2 h-4 w-4" />
                      Request Rental
                    </Button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <Button variant="outline" className="w-full border-2 border-cyan-600 text-cyan-700 hover:bg-cyan-50">
                      <Phone className="mr-2 h-4 w-4" />
                      Get Pricing
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Wastewater Treatment Plant Card */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 hover:border-emerald-300 cursor-pointer transform hover:-translate-y-2">
              <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden bg-linear-to-br from-emerald-100 to-green-100">
                <Image
                  src="https://images.unsplash.com/photo-1581092918484-8313e1f6d145?w=800&q=80"
                  alt="Wastewater treatment plant operations and maintenance"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-emerald-600 text-white border-0 shadow-lg">
                    <FlaskConical className="h-3 w-3 mr-1 inline" />
                    Compliance Ready
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                    <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-xl">
                      <FlaskConical className="h-6 w-6" />
                    </div>
                    Wastewater Treatment
                  </h3>
                  <p className="text-base md:text-lg opacity-95">
                    Audit, operations & maintenance excellence
                  </p>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl group-hover:text-emerald-700 transition-colors">WWTP Operations & Management</CardTitle>
                <CardDescription className="text-base">
                  <strong className="text-gray-700">Full-service WWTP support:</strong> Operational audits, daily operations, preventive maintenance, compliance reporting. Municipal & industrial experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Operational performance audits</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Process optimization & troubleshooting</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Preventive & corrective maintenance</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Green Drop & Blue Drop compliance</span>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Link href="/services/wastewater-treatment" className="flex-1">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Audit
                    </Button>
                  </Link>
                  <Link href="/contact" className="flex-1">
                    <Button variant="outline" className="w-full border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50">
                      <Phone className="mr-2 h-4 w-4" />
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional CTA Banner */}
          <div className="mt-12 lg:mt-16 max-w-4xl mx-auto">
            <div className="bg-linear-to-r from-blue-600 via-cyan-600 to-emerald-600 rounded-2xl p-8 md:p-10 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Need Industrial-Scale Water Solutions?</h3>
                <p className="text-lg md:text-xl mb-6 opacity-95">From <strong>boreholes</strong> to <strong>portable treatment plants</strong>, <strong>ice machines</strong> to <strong>WWTP operations</strong> - we supply, install & maintain it all!</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                      <Phone className="mr-2 h-5 w-5" />
                      Speak to Our Engineers
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900 shadow-xl transition-all">
                      View All Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Carousel - Enhanced with engineering terms */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="mb-4 bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200 transition-colors">
              <Waves className="h-3 w-3 mr-1 inline" />
              Professional Services
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-sky-600">Turnkey</span> Water Solutions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              From <strong>site assessment</strong> to <strong>commissioning</strong> - we handle everything! Full-service water treatment engineering for homes, businesses & municipalities.
            </p>
          </div>

          <Carousel className="max-w-6xl mx-auto h-[400px] md:h-[450px] lg:h-[500px]">
            {[
              {
                title: "Professional Installation & Commissioning",
                description: "Expert installation of RO plants, softeners, UV systems & filtration units. We test TDS, pressure, flow rates - everything sorted!",
                image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
                icon: <ShoppingBag className="h-6 w-6" />,
                badge: "Same-day service available"
              },
              {
                title: "Borehole Drilling & Development",
                description: "Professional borehole drilling services - site surveys, drilling, casing, pump installation. Water security for your property!",
                image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
                icon: <Waves className="h-6 w-6" />,
                badge: "Sustainable water source"
              },
              {
                title: "Wastewater Treatment Plant Operations",
                description: "Full audit, operations & maintenance of WWTP. Compliance monitoring, process optimization, sludge management - we keep it running!",
                image: "https://images.unsplash.com/photo-1581092918484-8313e1f6d145?w=800&q=80",
                icon: <FlaskConical className="h-6 w-6" />,
                badge: "Municipal & Industrial"
              },
              {
                title: "Water Quality Testing & Analysis",
                description: "Comprehensive lab analysis - pH, alkalinity, TDS, hardness, bacterial content. Full SANS 241 compliance testing.",
                image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80",
                icon: <FlaskConical className="h-6 w-6" />,
                badge: "SABS Accredited Lab"
              },
              {
                title: "24/7 Maintenance & Emergency Repairs",
                description: "Preventive maintenance, membrane replacement, filter changes, leak repairs. Always on standby - even on public holidays!",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
                icon: <Clock className="h-6 w-6" />,
                badge: "Nationwide coverage"
              }
            ].map((service, index) => (
              <div key={index} className="relative h-[400px] md:h-[450px] lg:h-[500px] group">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent rounded-2xl" />
                <div className="absolute top-6 right-6">
                  <Badge className="bg-sky-600 text-white border-0 shadow-xl text-sm">
                    {service.badge}
                  </Badge>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-sky-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl opacity-95 mb-6 max-w-3xl">{service.description}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="secondary" size="lg" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900 shadow-xl transition-all">
                      <Phone className="mr-2 h-5 w-5" />
                      Get Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Testimonials Section - Enhanced with local context */}
      <section className="py-16 md:py-20 lg:py-24 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 transition-colors">
              <Star className="h-3 w-3 mr-1 inline fill-purple-700" />
              Customer Reviews
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Hear it from our <span className="text-sky-600">Happy Clients</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people across South Africa - from Cape Town to Joburg!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Thabo Nkosi",
                role: "Homeowner, Sandton",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
                rating: 5,
                text: "Eish, the water quality in our home has improved 100%! The RO system is lekker - our kids actually drink water now instead of cooldrink. Professional service from start to finish."
              },
              {
                name: "Sarah van der Merwe",
                role: "Restaurant Owner, Cape Town",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                rating: 5,
                text: "We use their commercial filtration system in our restaurant. The water tastes amazing - our customers notice the difference in our coffee and food. Worth every cent!"
              },
              {
                name: "Dr. Priya Reddy",
                role: "Wellness Clinic, Durban",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
                rating: 5,
                text: "Outstanding service! They helped us choose the perfect UV sterilization system for our clinic. The technicians know their stuff - very impressed with the after-sales support."
              }
            ].map((testimonial, index) => (
              <Card key={index} className="group relative hover:shadow-2xl transition-all duration-300 border-2 hover:border-purple-200 cursor-pointer transform hover:-translate-y-2">
                <Quote className="absolute top-4 right-4 h-10 w-10 text-purple-100 group-hover:text-purple-200 transition-colors" />
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-full opacity-25 group-hover:opacity-50 blur transition-opacity"></div>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="relative rounded-full ring-2 ring-white shadow-lg"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg group-hover:text-purple-700 transition-colors">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm">{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <StarRating rating={testimonial.rating} showNumber size="lg" />
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-green-700 font-semibold">
                    <CheckCircle className="h-4 w-4" />
                    Verified Purchase
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Overall rating */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl shadow-lg px-8 py-4 border-2 border-gray-100">
              <div className="flex">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">4.9 out of 5</p>
                <p className="text-sm text-gray-600">Based on 1,200+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Enhanced with hover effects */}
      <section className="py-12 md:py-16 bg-white border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              <span className="text-sky-600">Certified</span> & Accredited
            </h3>
            <p className="text-gray-600">Industry-leading certifications and quality standards</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {[
              { name: "NSF Certified", desc: "International Standard" },
              { name: "SABS Approved", desc: "South African Bureau" },
              { name: "ISO 9001", desc: "Quality Management" },
              { name: "WQA Member", desc: "Water Quality Assoc." },
              { name: "BBB A+ Rating", desc: "Trusted Business" }
            ].map((badge, index) => (
              <div key={index} className="text-center group cursor-pointer transform hover:scale-110 transition-transform duration-300">
                <div className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-3 rounded-2xl bg-linear-to-br from-sky-100 to-cyan-100 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow group-hover:rotate-6">
                  <Shield className="h-8 w-8 md:h-10 md:w-10 text-sky-600 group-hover:text-sky-700 transition-colors" />
                </div>
                <p className="text-sm md:text-base font-bold text-gray-900 group-hover:text-sky-700 transition-colors">{badge.name}</p>
                <p className="text-xs text-gray-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts Preview - Enhanced */}
      <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 lg:mb-16">
            <div>
              <Badge className="mb-3 bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200 transition-colors">
                <Sparkles className="h-3 w-3 mr-1 inline" />
                Knowledge Hub
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                Water <span className="text-sky-600">Treatment Tips</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Expert advice on water quality and system maintenance
              </p>
            </div>
            <Link href="/blog" className="group">
              <Button variant="outline" size="lg" className="border-2 border-sky-600 text-sky-700 hover:bg-sky-50 hover:border-sky-700 transition-all">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Water Quality in SA: What You Need to Know",
                excerpt: "Understanding TDS levels, chlorine content and how to test your municipal water supply...",
                image: "https://images.unsplash.com/photo-1610724404688-b72f3cb5b6b8?w=400&q=80",
                date: "Nov 10, 2025",
                readTime: "5 min read",
                category: "Water Quality"
              },
              {
                title: "RO vs UV: Which System Do You Really Need?",
                excerpt: "Comparing reverse osmosis and ultraviolet purification - pros, cons, and cost analysis...",
                image: "https://images.unsplash.com/photo-1582719201952-9c8d7cf5e5f1?w=400&q=80",
                date: "Nov 8, 2025",
                readTime: "7 min read",
                category: "Guides"
              },
              {
                title: "DIY Maintenance Tips for Your Water Softener",
                excerpt: "Simple maintenance tasks you can do yourself to keep your system running smoothly...",
                image: "https://images.unsplash.com/photo-1584622781867-f8178b0c2229?w=400&q=80",
                date: "Nov 5, 2025",
                readTime: "4 min read",
                category: "Maintenance"
              }
            ].map((post, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-sky-200 transform hover:-translate-y-2">
                <div className="relative h-52 md:h-56 overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <Badge className="absolute top-4 left-4 bg-sky-600 text-white border-0 shadow-lg">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="text-sky-700 font-semibold">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-sky-700 transition-colors leading-tight">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="p-0 h-auto font-semibold text-sky-600 hover:text-sky-700 group-hover:gap-2 transition-all">
                    Read Full Article
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Enhanced with gradient */}
      <section className="py-16 md:py-20 lg:py-24 bg-linear-to-br from-sky-600 via-cyan-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors backdrop-blur-sm">
              Stay in the Loop
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get the <span className="text-cyan-200">Lowdown</span> on Water Care
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/95">
              Subscribe for exclusive deals, maintenance tips, and water quality insights. <strong>Plus get 10% off</strong> your first order!
            </p>
            <div className="flex justify-center mb-6">
              <NewsletterForm />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                10,000+ subscribers
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Weekly tips
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Exclusive deals
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Unsubscribe anytime
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Final enhanced with SA lingo */}
      <section className="py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-linear-to-br from-sky-50 via-cyan-50 to-blue-50 rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden border-2 border-sky-100 shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400 rounded-full opacity-10 blur-3xl"></div>
            
            <div className="relative z-10">
              <Badge className="mb-6 bg-sky-600 text-white border-0 shadow-lg hover:bg-sky-700 transition-all transform hover:scale-105">
                <Sparkles className="h-3 w-3 mr-1 inline" />
                Special Offer - Limited Time!
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ready for <span className="text-sky-600">Crystal-Clear</span> Water?
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                <strong className="text-sky-700">Jislaaik!</strong> Don&apos;t settle for dodgy water. Get a <span className="font-bold text-cyan-700">FREE water quality assessment</span> and personalized recommendations from our certified water engineers. <span className="text-sky-600 font-semibold">It&apos;s 100% free - no strings attached!</span>
              </p>
              
              {/* Value props */}
              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10 text-sm md:text-base">
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-700">Free Site Visit</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-700">TDS Testing Included</span>
                </div>
                <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-gray-700">No Obligation Quote</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="group">
                  <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-8 py-6 bg-linear-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Free Assessment Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/products" className="group">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-8 py-6 border-2 border-sky-600 text-sky-700 hover:bg-white hover:border-sky-700 hover:shadow-xl transition-all transform hover:scale-105">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Browse Products
                  </Button>
                </Link>
              </div>
              
              {/* Trust signals */}
              <div className="mt-10 pt-8 border-t border-sky-200">
                <p className="text-gray-600 mb-4 font-medium">Join thousands of happy customers across SA</p>
                <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="h-10 w-10 rounded-full bg-linear-to-br from-sky-400 to-cyan-400 border-2 border-white flex items-center justify-center">
                          <Users className="h-5 w-5 text-white" />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">15,000+ installs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm font-semibold text-gray-700 ml-2">4.9/5 rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-semibold text-gray-700">5-year warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
