import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <section className="shell pb-14 pt-16 sm:pt-24">
      <p className="label-pill label-mono text-muted-foreground">
        <span className="size-1.5 rounded-full bg-coral" />
        {eyebrow}
      </p>
      <h1 className="type-h1 mt-8 max-w-[18ch]">{title}</h1>
      {lede && (
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {lede}
        </p>
      )}
      {children}
    </section>
  );
}
