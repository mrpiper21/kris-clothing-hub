import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-blush">
      <div className="mx-auto flex min-h-[70dvh] max-w-[1600px] flex-col justify-end px-5 pb-20 pt-24 md:px-10">
        <h1 className="display text-[clamp(3.5rem,13vw,11rem)]">
          Wrong <span className="accent-word">fit.</span>
        </h1>
        <p className="mt-6 max-w-sm text-lg text-ink/75">This page doesn&apos;t exist — but the collection does.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/shop" arrow>Shop dresses</ButtonLink>
          <ButtonLink href="/" variant="outline">Back home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
