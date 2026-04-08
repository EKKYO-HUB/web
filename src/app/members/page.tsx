import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { members } from "@/content/members";

export const metadata: Metadata = {
  title: "MEMBERS",
  description: "EKKYO.HUBのメンバー紹介。",
};

export default function MembersPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 sm:px-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          MEMBERS
        </h1>
        <p className="mt-4 text-ekkyo-gray">
          EKKYOを動かすメンバーたち。
        </p>
      </div>

      <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className="group">
            {/* Profile Image */}
            <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-gray-100">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-ekkyo-accent/10">
                  <span className="text-4xl font-bold text-ekkyo-accent/30">
                    {member.name[0]}
                  </span>
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-xs font-medium tracking-widest text-ekkyo-accent">
                {member.role}
              </p>
              <h2 className="mt-1 text-xl font-bold tracking-tight">
                {member.name}
              </h2>
              <p className="text-sm text-ekkyo-gray">{member.nameEn}</p>

              <div className="mt-4 space-y-1">
                {member.affiliation.map((aff) => (
                  <p key={aff} className="text-xs leading-relaxed text-ekkyo-gray">
                    {aff}
                  </p>
                ))}
              </div>

              {member.bio && (
                <p className="mt-4 text-sm leading-relaxed text-ekkyo-gray">
                  {member.bio}
                </p>
              )}

              {/* Links */}
              <div className="mt-4 flex gap-4">
                {member.links.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs tracking-wider text-ekkyo-accent transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
