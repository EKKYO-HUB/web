"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/media", label: "MEDIA" },
  { href: "/members", label: "MEMBERS" },
  { href: "/contact", label: "CONTACT" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/EKKYO.HUB_横長_blue.svg"
            alt="EKKYO.HUB"
            width={140}
            height={32}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative text-[11px] font-medium tracking-[0.2em] transition-colors",
                pathname === href
                  ? "text-ekkyo-accent"
                  : "text-ekkyo-black/50 hover:text-ekkyo-black"
              )}
            >
              {label}
              {pathname === href && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-ekkyo-accent" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "h-[2px] w-5 bg-ekkyo-black transition-transform",
              menuOpen && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "h-[2px] w-5 bg-ekkyo-black transition-opacity",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-[2px] w-5 bg-ekkyo-black transition-transform",
              menuOpen && "-translate-y-[7px] -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-black/5 bg-white/95 px-6 pb-8 pt-6 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "text-sm font-medium tracking-[0.15em]",
                  pathname === href
                    ? "text-ekkyo-accent"
                    : "text-ekkyo-black/50"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
