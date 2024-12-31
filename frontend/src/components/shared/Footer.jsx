import React from "react";

const Footer = () => {
  return (
    <footer className="bg-teal-700 text-white py-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">Elev8<span className="text-white">Jobs</span></h2>
          <p className="text-sm">
            Elev8Jobs connects top talent with leading companies, providing exceptional opportunities to grow your career.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">Quick <span className="text-white">Links</span></h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/about" className="hover:underline hover:text-orange-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:underline hover:text-orange-300">
                Browse Jobs
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:underline hover:text-orange-300">
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline hover:text-orange-300">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-yellow-400">Contact <span className="text-white">Us</span> </h2>
          <p className="text-sm mb-2">
            Email:{" "}
            <a href="mailto:support@elev8jobs.com" className="hover:underline hover:text-orange-300">
              support@elev8jobs.com
            </a>
          </p>
          <p className="text-sm mb-4">
            Phone:{" "}
            <a href="tel:+1234567890" className="hover:underline hover:text-orange-300">
              +1 234 567 890
            </a>
          </p>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300"
            >
              Facebook
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-teal-500 pt-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-yellow-400 font-semibold">Elev8<span className="text-white">Jobs</span> </span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
