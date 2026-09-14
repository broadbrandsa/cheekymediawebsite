import Image from "next/image";

import { about } from "@/content/about";

export function Clients() {
  return (
    <section className="section-y">
      <div className="shell">
        <p className="label-mono text-center text-muted-foreground">
          Broadcasters and brands we have worked with
        </p>
        <ul className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {about.clientLogos.map((client) => (
            <li key={client.name} className="flex justify-center">
              <Image
                src={client.src}
                alt={client.name}
                width={500}
                height={500}
                className="h-16 w-auto max-w-[150px] object-contain opacity-45 mix-blend-multiply grayscale transition-opacity duration-300 hover:opacity-80 dark:opacity-70 dark:mix-blend-normal dark:invert"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
