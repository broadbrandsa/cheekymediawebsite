const stats = [
  {
    value: "10+",
    label: "Years making content",
    body: "Since 2014, across television, film, commercials and digital, for broadcasters and brands alike.",
  },
  {
    value: "30+",
    label: "Productions delivered",
    body: "Series, films, promos and campaigns, from a single spot to eight seasons of the same show.",
  },
  {
    value: "L1",
    label: "BBBEE contributor",
    body: "Black owned and managed, with sister companies that are black owned and female managed.",
  },
];

export function Stats() {
  return (
    <section className="section-y bg-sand">
      <div className="shell">
        <p className="label-mono text-coral-text">By the numbers</p>
        <h2 className="type-h2 mt-5 max-w-[20ch]">
          A decade of turning briefs into things people watch
        </h2>

        <dl className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-border pt-6">
              <dt className="type-h0 font-display leading-none">{s.value}</dt>
              <dd className="mt-4">
                <p className="label-mono">{s.label}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
