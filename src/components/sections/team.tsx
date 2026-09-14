import Image from "next/image";

import { team } from "@/content/team";

export function Team() {
  return (
    <section className="section-y">
      <div className="shell">
        <p className="label-mono text-coral">Our team</p>
        <h2 className="type-h2 mt-5 max-w-[14ch]">The people who make it</h2>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <figure key={member.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-sand">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-4 border-t border-border pt-4">
                <h3 className="type-h4">{member.name}</h3>
                <p className="label-mono text-muted-foreground">{member.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
