import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What kind of work do you take on?",
    a: "Television series and live shows, commercials, feature film, branded content and corporate work. If it needs a camera and a crew, it is probably in scope. The one thing we will tell you honestly is when a project would be better off somewhere else.",
  },
  {
    q: "Do you shoot in your own studios?",
    a: "Yes. We have studios, green screen, sound booths and post suites in Houghton, plus our own cameras and kit. Most of a project happens under one roof, which keeps things quick and keeps the budget honest.",
  },
  {
    q: "Can you handle a live broadcast?",
    a: "We produce The Morning Show on ETV, so a daily live slot is familiar ground rather than a new risk. Multi-camera studio, live gallery, the lot.",
  },
  {
    q: "How does brand integration actually work?",
    a: "Because we produce our own formats, we can build a brand into a show from the first treatment rather than bolting it on at the end. Wardrobe, set dressing, storyline. Audiences never notice the detail, which is the point.",
  },
  {
    q: "What does a project cost?",
    a: "It depends on scope, crew and how much post is involved, so there is no useful list price. Tell us what you are making and roughly what you have to spend, and we will tell you what is realistic before anyone writes a treatment.",
  },
  {
    q: "How quickly can you start?",
    a: "Faster than most, because we are not booking third-party facilities. Get in touch and we will talk through timing on the call.",
  },
];

export function Faq() {
  return (
    <section className="section-y">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="label-mono text-coral-text">FAQ</p>
          <h2 className="type-h2 mt-5">Questions we get asked</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            Something not covered here? Give us a call on{" "}
            <a href="tel:+27112584465" className="text-foreground underline underline-offset-4">
              011 258 4465
            </a>
            .
          </p>
        </div>

        <div className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline sm:text-2xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
