import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Tag,
  Download,
  FileText,
  Droplet
} from "lucide-react";

const featuredPost = {
  title: "The Complete Guide to Reverse Osmosis Systems in 2025",
  excerpt: "Everything you need to know about choosing, installing, and maintaining RO systems for your home or business.",
  image: "https://images.unsplash.com/photo-1589931135738-14b4f5c3652c?w=800&q=80",
  category: "Water Treatment",
  author: "Dr. Sarah Mitchell",
  date: "November 10, 2025",
  readTime: "8 min read",
  slug: "complete-guide-reverse-osmosis-2025"
};

const recentPosts = [
  {
    title: "5 Signs Your Water Softener Needs Maintenance",
    excerpt: "Learn the warning signs that indicate your water softener requires professional servicing.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&q=80",
    category: "Maintenance",
    author: "Michael Johnson",
    date: "November 8, 2025",
    readTime: "5 min read",
    slug: "water-softener-maintenance-signs"
  },
  {
    title: "Case Study: Industrial Wastewater Treatment in Durban",
    excerpt: "How we helped a manufacturing plant achieve 95% water recycling efficiency.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
    category: "Case Studies",
    author: "Linda Ndlovu",
    date: "November 5, 2025",
    readTime: "6 min read",
    slug: "industrial-wastewater-case-study"
  },
  {
    title: "Understanding Water Quality Testing Standards in SA",
    excerpt: "A comprehensive overview of SANS 241 and other water quality regulations.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80",
    category: "Compliance",
    author: "Dr. Sarah Mitchell",
    date: "November 2, 2025",
    readTime: "7 min read",
    slug: "water-quality-testing-standards"
  },
  {
    title: "Borehole Drilling: What Every Property Owner Should Know",
    excerpt: "Essential information about borehole drilling regulations, costs, and benefits in South Africa.",
    image: "https://images.unsplash.com/photo-1504542132171-a86a3e5b0e6d?w=400&q=80",
    category: "Boreholes",
    author: "David van der Merwe",
    date: "October 28, 2025",
    readTime: "6 min read",
    slug: "borehole-drilling-guide"
  },
  {
    title: "Water Conservation Tips for South African Businesses",
    excerpt: "Practical strategies to reduce water consumption and lower operational costs.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    category: "Conservation",
    author: "Linda Ndlovu",
    date: "October 25, 2025",
    readTime: "5 min read",
    slug: "water-conservation-businesses"
  },
  {
    title: "The ROI of Commercial Water Treatment Systems",
    excerpt: "Calculating the return on investment for business water treatment solutions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    category: "Business",
    author: "Michael Johnson",
    date: "October 22, 2025",
    readTime: "8 min read",
    slug: "water-treatment-roi"
  }
];

const categories = [
  { name: "All Posts", count: 42, slug: "all" },
  { name: "Water Treatment", count: 15, slug: "water-treatment" },
  { name: "Maintenance", count: 8, slug: "maintenance" },
  { name: "Case Studies", count: 6, slug: "case-studies" },
  { name: "Compliance", count: 5, slug: "compliance" },
  { name: "Conservation", count: 4, slug: "conservation" },
  { name: "Business", count: 4, slug: "business" }
];

const resources = [
  {
    title: "Water Quality Testing Guide",
    description: "Comprehensive guide to understanding water test results",
    type: "PDF",
    size: "2.4 MB",
    icon: FileText
  },
  {
    title: "Maintenance Schedule Template",
    description: "Track your water treatment system maintenance",
    type: "Excel",
    size: "156 KB",
    icon: FileText
  },
  {
    title: "Water Treatment Infographic",
    description: "Visual guide to different treatment methods",
    type: "PDF",
    size: "1.8 MB",
    icon: FileText
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-0">
              <BookOpen className="h-3 w-3 mr-1 inline" />
              Knowledge Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog & Resources
            </h1>
            <p className="text-xl text-sky-100">
              Expert insights, industry news, and practical guides for water treatment solutions
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Categories */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.slug}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      >
                        <span className="text-gray-700">{category.name}</span>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                          {category.count}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Subscribe</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest water treatment insights delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 text-sm"
                  />
                  <Button className="w-full" size="sm">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>

              {/* Downloadable Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Free Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {resources.map((resource, index) => {
                      const Icon = resource.icon;
                      return (
                        <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                          <div className="flex items-start gap-3">
                            <div className="shrink-0 w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                              <Icon className="h-5 w-5 text-sky-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-900 mb-1">{resource.title}</h4>
                              <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{resource.type}</span>
                                <span>•</span>
                                <span>{resource.size}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-3">
                            <Download className="h-3 w-3 mr-2" />
                            Download
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              <Card className="mb-8 overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto bg-gray-200">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <Badge className="absolute top-4 left-4 bg-sky-600 text-white">
                      Featured
                    </Badge>
                  </div>
                  <CardContent className="pt-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {featuredPost.category}
                        </Badge>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {featuredPost.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredPost.readTime}
                        </div>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>

              {/* Recent Posts Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentPosts.map((post, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative h-48 bg-gray-200">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <CardContent className="pt-6">
                        <Badge variant="secondary" className="mb-3 bg-sky-100 text-sky-700">
                          <Tag className="h-3 w-3 mr-1" />
                          {post.category}
                        </Badge>
                        <h3 className="font-bold text-lg text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Read More
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-sky-600 via-cyan-600 to-sky-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Droplet className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Expert Water Treatment Advice?
            </h2>
            <p className="text-lg text-sky-100 mb-8">
              Our team of specialists is ready to help with your specific water treatment needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-sky-700 hover:bg-gray-100">
                  Contact Us
                </Button>
              </Link>
              <Link href="/quote">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
