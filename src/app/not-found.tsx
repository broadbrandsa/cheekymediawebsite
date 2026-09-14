import Link from "next/link";



export default function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] max-w-3xl flex-col justify-center py-24">
      <p className="label-mono text-coral-text">404</p>
      <h1 className="type-h1 mt-6">
        That page has left the building.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
        Either it moved, or it never existed. Have a look at the work instead,
        there is plenty of it.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/work"
          className="label-mono inline-flex items-center justify-center rounded-pill bg-primary px-7 py-4 text-primary-foreground transition-colors hover:opacity-85"
        >
          See the work
        </Link>
        <Link
          href="/"
          className="label-mono inline-flex items-center justify-center rounded-pill border border-border px-7 py-4 transition-colors hover:bg-secondary"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
