import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ekkyo-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Image
              src="/images/logo/EKKYO.HUB_横長_blue.svg"
              alt="EKKYO.HUB"
              width={140}
              height={32}
              className="brightness-0 invert"
            />
            <p className="mt-2 text-xs leading-relaxed text-white/40">
              一般社団法人EKKYO.HUB
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              面白そうを開拓せよ、面白そうでは終わらせない。
              <br />
              好奇心と創造性で領域を越えていくクリエイティブユニット。
            </p>
          </div>

          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-white/30">
              PAGES
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/portfolio"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Portfolio
              </Link>
              <Link
                href="/media"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Media
              </Link>
              <Link
                href="/members"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Members
              </Link>
              <Link
                href="/contact"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-white/30">
              SOCIAL
            </p>
            <nav className="mt-4 flex flex-col gap-3">
              <Link
                href="https://note.com/ekkyo_hub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Note
              </Link>
              <Link
                href="https://www.instagram.com/ekkyo.hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Instagram
              </Link>
              <Link
                href="https://ekkyo-hub.peatix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 transition-colors hover:text-white"
              >
                Peatix
              </Link>
            </nav>

            <p className="mt-8 text-[10px] font-medium tracking-[0.2em] text-white/30">
              CONTACT
            </p>
            <Link
              href="mailto:info@ekkyo.jp"
              className="mt-4 inline-block text-sm text-white/60 transition-colors hover:text-white"
            >
              info@ekkyo.jp
            </Link>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} 一般社団法人EKKYO.HUB. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
