import Link from "next/link";
import { nav, site, whatsappLink, instagramLink, instagramHandle, phoneLink, tiktokLink } from "@/lib/site";

export function Footer() {
  const tel = phoneLink();

  return (
    <footer id="contact" className="on-dark bg-burgundy-deep text-blush">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-16 md:px-10 md:pt-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="display text-[2.5rem] text-canvas md:text-[3rem]">
              Kris <span className="accent-word">Clothing</span> Hub
            </p>
            <p className="mt-5 max-w-sm leading-relaxed text-blush/75">{site.description}</p>
            <a
              href={whatsappLink(`Hello ${site.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-12 items-center gap-3 border border-blush/40 px-6 text-[0.75rem] uppercase tracking-[0.14em] transition-colors hover:bg-blush hover:text-burgundy"
            >
              Chat on WhatsApp →
            </a>
          </div>

          <nav aria-label="Shop" className="md:col-span-2 md:col-start-6">
            <h2 className="label mb-4 text-petal">Shop</h2>
            <ul className="space-y-2.5 text-[0.9375rem]">
              <li><Link href="/shop" className="link-line">Shop all</Link></li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-line">{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Help" className="md:col-span-2">
            <h2 className="label mb-4 text-petal">Help</h2>
            <ul className="space-y-2.5 text-[0.9375rem]">
              <li><Link href="/size-guide" className="link-line">Size guide</Link></li>
              <li><Link href="/#how-to-order" className="link-line">How to order</Link></li>
              <li><Link href="/wishlist" className="link-line">Wishlist</Link></li>
              <li><Link href="/bag" className="link-line">Your bag</Link></li>
            </ul>
          </nav>

          <div className="grid grid-cols-2 gap-8 text-[0.9375rem] md:col-span-3 md:grid-cols-1 md:gap-6">
            <div>
              <h2 className="label mb-2 text-petal">Visit</h2>
              <p>{site.location}</p>
            </div>
            <div>
              <h2 className="label mb-2 text-petal">Call</h2>
              <p>{tel ? <a href={tel} className="link-line">{site.phone}</a> : site.phone}</p>
            </div>
            <div>
              <h2 className="label mb-2 text-petal">TikTok</h2>
              <a href={tiktokLink()} target="_blank" rel="noopener noreferrer" className="link-line">@{site.tiktok}</a>
            </div>
            <div>
              <h2 className="label mb-2 text-petal">Instagram</h2>
              <a href={instagramLink()} target="_blank" rel="noopener noreferrer" className="link-line">{instagramHandle()}</a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-blush/15 pt-6 text-sm text-blush/55 sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
