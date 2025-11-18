import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-sm mb-4">
              {siteConfig.description}
            </p>
            <div className="flex space-x-4">
              <a href={siteConfig.links.facebook} className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={siteConfig.links.twitter} className="hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={siteConfig.links.instagram} className="hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteConfig.links.linkedin} className="hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span>{siteConfig.contact.address}</span>
              </li>
            </ul>
            
            <div>
              <h4 className="text-white font-semibold mb-2">Newsletter</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button variant="default" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
