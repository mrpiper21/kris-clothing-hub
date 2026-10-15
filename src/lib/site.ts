/**
 * Business information.
 *
 * Every value wrapped in [BRACKETS] is a placeholder. Replace them with the
 * real details — nothing else in the codebase needs to change.
 */
export const site = {
  name: "Kris Clothing Hub",
  shortName: "Kris",
  tagline: "Tailored for every entrance",
  description:
    "Sculpted sheath dresses, pleated flares, trouser sets, skirt sets and handbags — tailored to flatter and delivered to your door.",
  location: "[BUSINESS LOCATION]",
  whatsapp: "233549671555", // international format, e.g. 233XXXXXXXXX
  phone: "233549671555",
  instagram: "[INSTAGRAM HANDLE]", // without the @
  tiktok: "kris_clothing_hub", // without the @
  aboutStory: "[ABOUT THE BUSINESS / BRAND STORY]",
  delivery: "[DELIVERY AREAS AND TIMES, e.g. Accra 24–48 hours, nationwide 2–4 days]",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** Primary navigation. */
export const nav = [
  { label: "New in", href: "/shop?sort=new" },
  { label: "Sheath", href: "/shop?occasion=sheath" },
  { label: "Flare", href: "/shop?occasion=flare" },
  { label: "Trouser sets", href: "/shop?occasion=trouser" },
  { label: "Skirt sets", href: "/shop?occasion=skirt" },
  { label: "Bags", href: "/shop?occasion=bags" },
] as const;

/** True while a value is still an unfilled [PLACEHOLDER]. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || /^\[.*\]$/.test(value.trim());
}

/**
 * Builds a WhatsApp chat link. While the number is still a placeholder,
 * wa.me opens the contact picker with the message prefilled.
 */
export function whatsappLink(message?: string): string {
  const number = isPlaceholder(site.whatsapp) ? "" : site.whatsapp.replace(/\D/g, "");
  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${query}`;
}

export function instagramLink(): string {
  if (isPlaceholder(site.instagram)) return "https://www.instagram.com/";
  return `https://www.instagram.com/${site.instagram.replace(/^@/, "")}/`;
}

export function instagramHandle(): string {
  return isPlaceholder(site.instagram) ? site.instagram : `@${site.instagram.replace(/^@/, "")}`;
}

export function tiktokLink(): string {
  return `https://www.tiktok.com/@${site.tiktok.replace(/^@/, "")}`;
}

export function phoneLink(): string | null {
  if (isPlaceholder(site.phone)) return null;
  return `tel:${site.phone.replace(/[^\d+]/g, "")}`;
}
