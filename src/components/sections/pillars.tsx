/** The three "how we work" cards. Split out of Intro so the client logo strip
 *  can sit between the intro copy and these. */
const pillars = [
  {
    title: "Own the kit",
    body: "Studios, green screen, sound booths and post suites in house. No rental clock, no markup, problems solved on the day.",
  },
  {
    title: "Built for broadcast",
    body: "A live weekday show on ETV keeps the whole crew sharp. That discipline shows up in every commercial and film we shoot.",
  },
  {
    title: "Made for the platform",
    body: "TV, social, podcast or digital. We build for where the audience actually is, from the first treatment rather than as a cutdown later.",
  },
];

export function Pillars() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="shell">
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {pillars.map((p, i) => (
            <li key={p.title} className="bg-card p-8">
              <span className="label-mono text-coral-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="type-h4 mt-5">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
