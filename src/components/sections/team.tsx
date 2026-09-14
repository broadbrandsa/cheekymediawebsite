import Image from "next/image";

import { team } from "@/content/team";

export function Team() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <p className="eyebrow rule-coral text-coral">Our team</p>
      <h2 className="display-lg mt-8 max-w-2xl font-display font-bold">
        The people who make it.
      </h2>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <figure key={member.name} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>
            <figcaption className="mt-5">
              <h3 className="font-display text-xl font-bold tracking-tight">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
