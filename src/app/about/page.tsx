import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Users,
  Droplet,
  Shield,
  Target,
  Heart,
  TrendingUp,
  CheckCircle,
  Phone,
  Mail,
  Calendar
} from "lucide-react";

const stats = [
  { label: "Years in Business", value: "25+", icon: Calendar },
  { label: "Projects Completed", value: "5,000+", icon: CheckCircle },
  { label: "Expert Team Members", value: "50+", icon: Users },
  { label: "Satisfied Clients", value: "3,500+", icon: Heart }
];

const values = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "We use only the highest quality components and materials, backed by comprehensive warranties and certifications."
  },
  {
    icon: Target,
    title: "Customer-Focused",
    description: "Your satisfaction is our priority. We tailor every solution to meet your specific water treatment needs."
  },
  {
    icon: Droplet,
    title: "Environmental Stewardship",
    description: "Committed to sustainable practices and helping preserve South Africa's precious water resources."
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    description: "We stay ahead with the latest water treatment technologies and industry best practices."
  }
];

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "25 years in water engineering with a PhD in Environmental Science"
  },
  {
    name: "Michael Johnson",
    role: "Chief Technical Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    bio: "Expert in industrial water treatment with 20+ years experience"
  },
  {
    name: "Linda Ndlovu",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    bio: "Specialist in project management and client relations"
  },
  {
    name: "David van der Merwe",
    role: "Head of Engineering",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    bio: "Registered Professional Engineer with ECSA certification"
  }
];

const certifications = [
  "ISO 9001:2015 - Quality Management",
  "ISO 14001 - Environmental Management",
  "Green Drop Certified Operator",
  "Blue Drop Accredited",
  "SABS Approved Installer",
  "PIRB Registered",
  "ECSA Professional Engineering",
  "SANAS Accredited Laboratory"
];

const milestones = [
  { year: "1999", event: "Water Nest founded in Johannesburg" },
  { year: "2005", event: "Expanded to nationwide operations" },
  { year: "2010", event: "ISO 9001 certification achieved" },
  { year: "2015", event: "Launched portable treatment division" },
  { year: "2020", event: "5,000th project milestone reached" },
  { year: "2024", event: "Opened state-of-the-art testing laboratory" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <Droplet className="h-3 w-3 mr-1 inline" />
              Established 1999
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              25 Years of Water Treatment Excellence
            </h1>
            <p className="text-xl text-sky-100 mb-8">
              Leading South Africa&apos;s water treatment industry with innovative solutions, expert engineering, and unwavering commitment to quality.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-sky-600" />
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Founded in 1999, Water Nest began with a simple mission: to provide South Africans with access to clean, safe water through cutting-edge treatment solutions. What started as a small team of passionate water engineers in Johannesburg has grown into the nation&apos;s leading comprehensive water treatment provider.
              </p>
              <p>
                Over the past 25 years, we&apos;ve tackled South Africa&apos;s unique water challenges head-on. From residential filtration systems to large-scale industrial wastewater treatment plants, we&apos;ve successfully completed over 5,000 projects across all nine provinces.
              </p>
              <p>
                Today, Water Nest stands as a testament to innovation, quality, and unwavering dedication to our clients and the environment. Our team of 50+ certified professionals continues to push the boundaries of water treatment technology while maintaining the personalized service that has been our hallmark since day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make and every solution we deliver
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                      <Icon className="h-8 w-8 text-sky-600" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry experts dedicated to delivering excellence in every project
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all">
                <div className="relative h-64 bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="pt-6 text-center">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sky-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              Key milestones that shaped Water Nest
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-sky-200" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex gap-6">
                    <div className="shrink-0 w-16 h-16 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold z-10">
                      {milestone.year}
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-4 mt-2">
                      <p className="text-gray-900 font-medium">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-amber-600 text-white">
              <Award className="h-3 w-3 mr-1 inline" />
              Industry Recognition
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Certifications & Accreditations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence is validated by industry-leading certifications
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-sky-300 transition-colors"
                >
                  <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                  <span className="font-medium text-gray-900">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience the Water Nest Difference?
          </h2>
          <p className="text-lg md:text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust us for their water treatment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-sky-800 hover:bg-sky-50 font-bold">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </Link>
            <Link href="/quote">
              <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/20 hover:bg-transparent hover:border-white font-bold">
                <Phone className="mr-2 h-5 w-5" />
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
