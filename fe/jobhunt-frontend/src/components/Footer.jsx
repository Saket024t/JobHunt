import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">JobHunt</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Connecting the world's best talent with the world's best companies.
            Secure, transparent, and fast.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-secondary">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-white transition">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Support
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-secondary">Legal</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <a href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:text-white transition">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-secondary">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <Facebook
              className="text-gray-400 hover:text-white cursor-pointer"
              size={20}
            />
            <Twitter
              className="text-gray-400 hover:text-white cursor-pointer"
              size={20}
            />
            <Linkedin
              className="text-gray-400 hover:text-white cursor-pointer"
              size={20}
            />
            <Instagram
              className="text-gray-400 hover:text-white cursor-pointer"
              size={20}
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} JobHunt. All rights reserved.
      </div>
    </footer>
  );
}
