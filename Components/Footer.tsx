import { Input } from "@/Components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Button } from "../Components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="mt-8 pt-8 border-t border-gray-700 text-center" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="font-bold text-lg mb-4">Our Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-white">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-400 hover:text-white"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-400 hover:text-white"
                >
                  Shipping Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
            <p className="mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-gray-300 border border-gray-600"
              />
              <Button type="submit" className="bg-white text-black w-full">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="w-6 h-6" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} GymShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
