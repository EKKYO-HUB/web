"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { members } from "@/content/members";
import { cn } from "@/lib/utils";

const heroImages = [
  "/images/members/members-1.jpg",
  "/images/members/members-2.jpg",
];

export default function MembersPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = members.find((m) => m.id === selectedId) ?? null;
  const [currentSlide, setCurrentSlide] = useState(0);

  const close = useCallback(() => setSelectedId(null), []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (selectedId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedId, close]);

  return (
    <>
      {/* Hero slideshow */}
      <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden sm:h-[55vh] lg:h-[60vh]">
        {heroImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="EKKYO.HUB メンバー"
            fill
            className={cn(
              "object-cover object-[center_30%] transition-opacity duration-1000",
              i === currentSlide ? "opacity-100" : "opacity-0"
            )}
            sizes="100vw"
            priority={i === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === currentSlide
                  ? "w-8 bg-ekkyo-accent"
                  : "w-1.5 bg-black/30 hover:bg-black/50"
              )}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-12">
        <div className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            MEMBERS
          </h1>
          <p className="mt-4 text-ekkyo-gray">
            EKKYOを動かすメンバーたち。
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedId(member.id)}
              className="group cursor-pointer text-left"
            >
              {/* Photo */}
              <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-gray-100">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-ekkyo-black">
                    <span className="text-5xl font-bold text-white/20">
                      {member.name[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Name */}
              <h2 className="text-lg font-bold tracking-tight">
                {member.name}
              </h2>
              <p className="text-sm text-ekkyo-gray">{member.nameEn}</p>
              <p className="mt-1 text-xs text-ekkyo-gray">{member.role}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 transition-opacity duration-300",
          selectedId ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
      />

      {/* Slide panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-3xl flex-col overflow-y-auto bg-ekkyo-black transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          selectedId ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Close button */}
        <button
          onClick={close}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-white/60 transition-colors hover:text-white"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="2" y1="2" x2="18" y2="18" />
            <line x1="18" y1="2" x2="2" y2="18" />
          </svg>
        </button>

        {selected && (
          <div className="flex flex-1 flex-col lg:flex-row">
            {/* Photo */}
            <div className="relative aspect-[3/4] w-full shrink-0 lg:h-full lg:w-[45%]">
              {selected.image ? (
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-ekkyo-black">
                  <span className="text-7xl font-bold text-white/10">
                    {selected.name[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-1 flex-col justify-center px-8 py-10 sm:px-12 lg:py-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {selected.name}
              </h2>
              <p className="mt-1 text-lg text-white/60">{selected.nameEn}</p>
              <p className="mt-3 text-sm font-medium text-ekkyo-accent">
                {selected.role}
              </p>

              <p className="mt-8 text-sm leading-[2] text-white/70">
                {selected.bio}
              </p>

              {/* Links */}
              {selected.links.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-4">
                  {selected.links.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/20 px-5 py-2.5 text-[11px] font-medium tracking-[0.1em] text-white/70 transition-all hover:border-ekkyo-accent hover:text-ekkyo-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
