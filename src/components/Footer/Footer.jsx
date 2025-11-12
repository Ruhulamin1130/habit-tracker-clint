import React from "react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import { FaMailBulk } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white py-12 px-6 mt-20 rounded-t-3xl shadow-lg">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold mb-4 tracking-wide">
            Habit<span className="text-white/80">Tracker</span>
          </h2>
          <p className="text-sm text-white/80">
            Build better habits and stay consistent every day. Track your goals,
            stay motivated, and grow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link to="/all-habit" className="hover:text-white transition">
                All Habits
              </Link>
            </li>
            <li>
              <Link to="/add-habit" className="hover:text-white transition">
                Add Habit
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-white transition">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/auth/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Community</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link to="/" className="hover:text-white transition">
                Discussion Forums
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Study Groups
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Events & Workshops
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <BsTwitterX size={22} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform"
            >
              <BsInstagram size={22} />
            </a>
          </div>
          <a
            href="mailto:support@habittracker.com"
            className="flex items-center text-white/80 hover:text-white transition"
          >
            <FaMailBulk size={18} className="mr-2" /> support@habittracker.com
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center">
        <p className="text-sm text-white/80">
          © {currentYear} HabitTracker. All Rights Reserved.
        </p>
        <div className="mt-2">
          <Link to="/" className="hover:text-white mr-4 transition">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:text-white transition">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
