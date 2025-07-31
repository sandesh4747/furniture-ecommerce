import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-gray-500/80 xl:pt-12 pt-8 px-6 md:px-16 lg:px-24 xl:px-32 bg-white">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        {/* Logo and Description */}
        <div className="max-w-80">
          <p className="text-sm">
            400 university drive suite 200 coral Gables,
            <br /> Florida 33134
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-4 text-gray-700">
            {/* Instagram */}
            <FaInstagram className="w-6 h-6" />
            {/* Facebook */}
            <FaFacebook className="w-6 h-6" />
            {/* Twitter */}
            <FaTwitter className="w-6 h-6" />
            {/* LinkedIn */}
            <FaLinkedin className="w-6 h-6" />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg text-gray-800">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm ">
            <li>
              <a href="#" className="hover:text-gray-700">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Press
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Partners
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <p className="text-lg text-gray-800">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-700">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Safety Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Cancellation Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-700">
                Accessibility
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="max-w-80">
          <p className="text-lg font-semibold text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm text-gray-600">
            Subscribe to our newsletter for inspiration and special offers.
          </p>

          <div className="mt-4">
            <div className="flex overflow-hidden rounded-full shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-black transition-all">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 text-sm bg-white text-gray-700 placeholder:text-gray-400 outline-none"
              />
              <button className="flex items-center justify-center bg-black px-4 text-white hover:bg-gray-900 transition-colors">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              We respect your privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mt-8" />

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-sm">
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-gray-700">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-700">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-700">
              Sitemap
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
