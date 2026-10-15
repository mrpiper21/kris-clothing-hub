const messages = [
  "Order easily on WhatsApp",
  "Custom measurements on selected styles",
  "Delivery to your door",
  "New pieces every week",
];

/** A slow, continuous strip of store notes above the header. */
export function AnnouncementBar() {
  const row = [...messages, ...messages];
  return (
    <div className="on-dark overflow-hidden bg-burgundy text-blush">
      <p className="sr-only">{messages.join(". ")}.</p>
      <div aria-hidden className="flex h-9 w-max animate-[marquee_40s_linear_infinite] items-center">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {row.map((m, i) => (
              <li key={i} className="flex items-center whitespace-nowrap px-6 text-[0.6875rem] uppercase tracking-[0.16em]">
                {m}
                <span className="ml-12 inline-block h-1 w-1 bg-petal" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
