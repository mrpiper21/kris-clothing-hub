import { howToMeasure, sizeChart } from "@/data/sizes";
import { cn } from "@/lib/cn";

/** Size chart in centimetres, with an optional highlighted size. */
export function SizeTable({ highlight }: { highlight?: string | null }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
        <caption className="sr-only">Body measurements in centimetres</caption>
        <thead>
          <tr className="border-b-2 border-burgundy">
            {["Size", "UK", "Bust", "Waist", "Hips"].map((h) => (
              <th key={h} scope="col" className="label py-3 pr-4 font-medium text-burgundy">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sizeChart.map((r) => (
            <tr key={r.size} className={cn("border-b border-ink/10", highlight === r.size && "bg-blush")}>
              <th scope="row" className="py-3 pl-2 pr-4 font-medium">{r.size}</th>
              <td className="py-3 pr-4">{r.uk}</td>
              <td className="py-3 pr-4">{r.bust}</td>
              <td className="py-3 pr-4">{r.waist}</td>
              <td className="py-3 pr-4">{r.hips}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MeasureTips() {
  return (
    <dl className="grid gap-5 sm:grid-cols-2">
      {howToMeasure.map((m, i) => (
        <div key={m.part} className="border-t border-ink/10 pt-4">
          <dt className="flex items-baseline gap-3">
            <span className="display text-2xl text-burgundy">0{i + 1}</span>
            <span className="font-medium">{m.part}</span>
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink/70">{m.line}</dd>
        </div>
      ))}
    </dl>
  );
}
