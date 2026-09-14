import { about } from "@/content/about";

export function Clients() {
  return (
    <section className="border-y border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow text-center text-muted-foreground">
          Broadcasters and brands we have worked with
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {about.clients.map((client) => (
            <li
              key={client}
              className="font-display text-lg font-bold tracking-tight text-muted-foreground/70 transition-colors hover:text-primary sm:text-xl"
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
