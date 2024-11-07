import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Lean Tube</h2>
            <p>
              Your trusted platform for learning and development. Stay connected
              with us to explore more content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe and Social Icons */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Stay Updated
            </h3>
            <div className="flex space-x-2 mb-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-blue-600 hover:bg-blue-500">
                Subscribe
              </Button>
            </div>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
              >
                <FaFacebook size={24} className="hover:text-white" />
              </Link>
              <Link
                href="https://twitter.com"
                aria-label="Twitter"
                target="_blank"
              >
                <FaTwitter size={24} className="hover:text-white" />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
              >
                <FaInstagram size={24} className="hover:text-white" />
              </Link>
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
              >
                <FaLinkedin size={24} className="hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Lean Tube. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
