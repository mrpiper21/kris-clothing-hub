"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { nav, site, whatsappLink, tiktokLink } from "@/lib/site";
import { occasions } from "@/data/media";
import { resolveBag, shop, useShop } from "@/lib/store";
import { Drawer } from "@/components/ui/Drawer";
import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { BagIcon, HeartIcon, SearchIcon } from "@/components/ui/Icons";
import { SearchOverlay } from "@/components/SearchOverlay";
import { BagDrawer } from "@/components/BagDrawer";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

function Count({ n }: { n: number }) {
  if (n === 0) return null;
  return (
    <motion.span
      key={n}
      initial={{ scale: 0.4 }}
      animate={{ scale: 1 }}
      className="absolute right-0.5 top-1 flex h-4 min-w-4 items-center justify-center bg-burgundy px-1 text-[0.625rem] font-medium text-canvas"
    >
      {n}
    </motion.span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const { bag, wishlist } = useShop();
  const { count } = resolveBag(bag);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // "/" opens search from anywhere, unless the visitor is typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key === "/" && !/input|textarea|select/i.test(el.tagName) && !el.isContentEditable) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  const iconButton = "relative flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-burgundy";

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-canvas transition-colors duration-500",
          scrolled ? "border-ink/10" : "border-transparent",
        )}
      >
        <a
          href="#main"
          className="label sr-only bg-burgundy px-4 py-3 text-canvas focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50"
        >
          Skip to content
        </a>
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-2 px-2 sm:gap-4 md:px-10">
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              className="flex h-11 items-center gap-2 px-2 text-[0.8125rem] uppercase tracking-[0.1em]"
            >
              <span aria-hidden className="flex w-5 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-3/4 bg-current" />
              </span>
              <span className="sr-only sm:not-sr-only">Menu</span>
            </button>
          </div>

          <Link href="/" className="justify-self-center leading-none lg:col-start-1 lg:row-start-1 lg:justify-self-start">
            <span className="display whitespace-nowrap text-[1.375rem] text-burgundy sm:text-[1.625rem] md:text-[1.875rem]">
              Kris <span className="accent-word">Clothing</span> Hub
            </span>
            <span className="sr-only">{site.name} home</span>
          </Link>

          <nav aria-label="Shop by style" className="hidden justify-center lg:col-start-2 lg:row-start-1 lg:flex">
            <ul className="flex items-center gap-6 xl:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-line text-[0.8125rem] uppercase tracking-[0.1em] [--underline:var(--color-burgundy)] after:h-[2px]!"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end lg:col-start-3 lg:row-start-1">
            <button type="button" onClick={() => setSearchOpen(true)} className={iconButton} aria-label="Search (press /)">
              <SearchIcon />
            </button>
            <Link href="/wishlist" className={cn(iconButton, "hidden sm:flex")} aria-label={`Wishlist, ${wishlist.length} saved`}>
              <HeartIcon />
              <Count n={wishlist.length} />
            </Link>
            <button type="button" onClick={shop.openBag} className={iconButton} aria-label={`Bag, ${count} items`}>
              <span key={count} className={count > 0 ? "inline-flex animate-[bag-bump_0.7s_ease-out]" : "inline-flex"}>
                <BagIcon />
              </span>
              <Count n={count} />
            </button>
          </div>
        </div>
      </header>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" side="left">
        <nav aria-label="Mobile" className="px-5 py-6">
          <ul>
            {[{ label: "Shop all", href: "/shop" }, ...nav].map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease }}
              >
                <Link href={item.href} onClick={() => setMenuOpen(false)} className="flex items-center justify-between border-b border-ink/10 py-3.5">
                  <span className="display text-[2rem]">{item.label}</span>
                  <span aria-hidden className="text-burgundy">→</span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <ul className="mt-6 grid grid-cols-2 gap-2">
            {occasions.slice(0, 4).map((o) => (
              <li key={o.id}>
                <Link href={`/shop?occasion=${o.id}`} onClick={() => setMenuOpen(false)} className="group relative block aspect-[4/5] overflow-hidden">
                  <Media src={o.photo.src} alt="" decorative position={o.photo.position} sizes="45vw" className="transition-transform duration-1000 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-canvas/90 px-3 py-2 text-[0.75rem] uppercase tracking-[0.1em] text-burgundy">
                    {o.title} {o.accentWord}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 space-y-3 text-[0.9375rem]">
            <li><Link href="/wishlist" onClick={() => setMenuOpen(false)} className="link-line">Wishlist ({wishlist.length})</Link></li>
            <li><Link href="/size-guide" onClick={() => setMenuOpen(false)} className="link-line">Size guide</Link></li>
            <li><a href={tiktokLink()} target="_blank" rel="noopener noreferrer" className="link-line">TikTok @{site.tiktok}</a></li>
          </ul>

          <ButtonLink href={whatsappLink()} external arrow className="mt-8 w-full">
            Chat on WhatsApp
          </ButtonLink>
        </nav>
      </Drawer>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <BagDrawer />
    </>
  );
}
