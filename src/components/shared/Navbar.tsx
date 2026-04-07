"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Modules", href: "/modules" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for the glassmorphism header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on overlay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        (event.target as HTMLElement).closest(".mobile-menu-overlay")
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("click", handleClickOutside);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Include the Map Modal here */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
          isScrolled
            ? "bg-jimba-navy/80 backdrop-blur-lg border-b border-white/10 py-3"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="relative z-10 transition-transform hover:scale-105"
          >
            <Image
              src="/nav-logo.webp"
              alt="IFFAS Logo"
              width={180}
              height={45}
              priority
              className="h-auto w-35 md:w-45"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-jimba-gray font-medium hover:text-jimba-gold transition-colors text-sm uppercase tracking-wider cursor-pointer"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/form"
              className="bg-[#FACC14] bg-gold-gradient px-6 py-2.5 rounded-full text-jimba-text font-bold text-sm shadow-[0_0_20px_rgba(250,204,20,0.3)] hover:shadow-[0_0_30px_rgba(250,204,20,0.5)] transition-all hover:-translate-y-0.5"
            >
              Log In
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X size={28} className="transition-transform duration-350" />
            ) : (
              <Menu size={28} className="transition-transform duration-350" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        >
          {/* Left 1/4 clickable area to close menu */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Mobile Menu Side Panel */}
      <div
        ref={mobileMenuRef}
        className={cn(
          "fixed top-0 right-0 h-full w-3/4 z-50 bg-[#0F1729] transform transition-transform duration-350 ease-in-out md:hidden",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Gradient white edge on the right side */}
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* Inner shadow for depth effect */}
        <div className="absolute left-0 top-0 bottom-0 w-1 shadow-[inset_10px_0_10px_-5px_rgba(0,0,0,0.3)]" />

        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6 pt-20">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-2xl font-bold text-white hover:text-jimba-gold transition-colors duration-200 w-full text-center py-2 cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href=""
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-bold text-white hover:text-jimba-gold transition-colors duration-200 w-full text-center py-2"
          >
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};
