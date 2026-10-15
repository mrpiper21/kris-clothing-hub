import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import { MeasureTips, SizeTable } from "@/components/product/SizeTable";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Size guide",
  description: "Find your size: bust, waist and hip measurements, plus how to measure yourself for a tailored fit.",
  alternates: { canonical: "/size-guide" },
};

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-10 md:px-10 md:pb-32 md:pt-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <h1 className="display text-[clamp(3.25rem,10vw,7rem)]">
            Size <span className="accent-word">guide</span>
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink/70">
            Measurements are body measurements in centimetres. If you&apos;re between sizes, choose the larger — or ask
            for a piece made to your measurements.
          </p>
          <ButtonLink href={whatsappLink(`Hello ${site.name}! Could you help me with sizing?`)} external arrow className="mt-8">
            Ask about fit
          </ButtonLink>
        </header>
        <div className="space-y-14 lg:col-span-7 lg:col-start-6">
          <section aria-labelledby="chart-title">
            <h2 id="chart-title" className="display mb-6 text-[2.25rem]">Dresses & sets</h2>
            <SizeTable />
          </section>
          <section aria-labelledby="measure-title">
            <h2 id="measure-title" className="display mb-6 text-[2.25rem]">How to <span className="accent-word">measure</span></h2>
            <MeasureTips />
          </section>
        </div>
      </div>
    </div>
  );
}
