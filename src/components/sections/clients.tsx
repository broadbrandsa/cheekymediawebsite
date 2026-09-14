import Image from "next/image";

import { about } from "@/content/about";

export function Clients() {
  return (
    <section className="border-y border-border bg-background py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="eyebrow text-center text-muted-foreground">
          Broadcasters and brands we have worked with
        </p>

        <ul className="mt-8 grid grid-cols-2 items-center gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
          {about.clientLogos.map((client) => (
            <li key={client.name} className="flex justify-center">
              <Image
                src={client.src}
                alt={client.name}
                width={500}
                height={500}
                className="h-20 w-auto max-w-[170px] object-contain opacity-65 mix-blend-multiply grayscale transition-opacity duration-300 hover:opacity-100 dark:opacity-80 dark:mix-blend-normal dark:invert"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
