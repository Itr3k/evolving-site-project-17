import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQSchema } from '@/components/seo/FAQSchema';

const faqs = [
  {
    question: "What does Elevated AI do?",
    answer: "Elevated AI is an automation consulting studio that builds AI workflows, voice agents, and business-specific automation systems for small, mid-sized, and enterprise companies."
  },
  {
    question: "Who is behind Elevated AI?",
    answer: "Elevated AI is founded by Johnathan Scott, a technology leader with 20+ years of enterprise IT experience, former Apple Certified Trainer, and AI automation specialist across entertainment, media, and enterprise environments."
  },
  {
    question: "What types of AI solutions do you build?",
    answer: "Voice agents, workflow automation, CRM integrations, email automation, operational AI tools, and early-stage SaaS product strategy."
  },
  {
    question: "Do you work with small businesses?",
    answer: "Yes. Elevated AI supports small businesses through packaged voice agent solutions, AI audits, and automation implementation."
  },
  {
    question: "How long does implementation take?",
    answer: "Typical implementation ranges: 30–45 days for simple automation, 60–90 days for multi-system deployments, 90–120 days for enterprise-level integration."
  }
];

export const FAQSection = () => {
  return (
    <section className="relative z-10 py-16 md:py-24">
      <FAQSchema faqs={faqs} />
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.2s_both]">
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight font-geist mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground font-geist max-w-2xl mx-auto">
            Common questions about AI automation and our services
          </p>
        </div>

        <div className="backdrop-blur-sm bg-white/5 rounded-2xl ring-1 ring-white/10 p-8 animate-on-scroll [animation:fadeSlideIn_1s_ease-out_0.3s_both]">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
                <AccordionTrigger className="text-left font-geist hover:text-cyan-300 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-geist leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
