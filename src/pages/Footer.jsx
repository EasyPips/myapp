import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-emerald-900 text-white mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">

        {/* Store Info / Logo */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xl font-bold mb-4 text-emerald-400">Heasycommerce</h3>
          <p className="text-sm text-white">
            Quality products for your everyday life.
            <br />
            &copy; {new Date().getFullYear()} Heasycommerce. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-emerald-400/30 pb-1">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/shop" className="text-white hover:text-emerald-400 transition duration-300">All Products</a></li>
            <li><a href="/about" className="text-white hover:text-emerald-400 transition duration-300">About Us</a></li>
            <li><a href="/faq" className="text-white hover:text-emerald-400 transition duration-300">FAQ</a></li>
            <li><a href="/contact" className="text-white hover:text-emerald-400 transition duration-300">Contact</a></li>
          </ul>
        </div>

        {/* Legal & Policy */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-emerald-400/30 pb-1">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/privacy" className="text-white hover:text-emerald-400 transition duration-300">Privacy Policy</a></li>
            <li><a href="/terms" className="text-white hover:text-emerald-400 transition duration-300">Terms of Service</a></li>
            <li><a href="/returns" className="text-white hover:text-emerald-400 transition duration-300">Returns & Refunds</a></li>
            <li><a href="/shipping" className="text-white hover:text-emerald-400 transition duration-300">Shipping Info</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 border-b border-emerald-400/30 pb-1">Connect</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" aria-label="Facebook" className="text-white hover:text-blue-600 transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="text-white hover:text-sky-400 transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="text-white hover:text-pink-500 transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="text-white hover:text-blue-700 transition duration-300">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;