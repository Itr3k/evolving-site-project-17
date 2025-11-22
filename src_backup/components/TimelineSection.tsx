import { Shield, Cpu, ArrowRight, Check, Phone, Lock, Key, Eye, FileCheck, Workflow, BarChart3 } from "lucide-react";
import { ContactFormModal } from "./ContactFormModal";
import { useState } from "react";

export const TimelineSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  return (
    <section className="relative z-10 max-w-7xl sm:px-6 lg:px-8 mr-auto ml-auto pt-8 pr-4 pb-20 pl-4">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-white/70">Built for Scale</p>
          <h2 className="sm:text-4xl md:text-5xl text-3xl text-white tracking-tighter">
            Automation Stack — Intelligent Systems, Seamlessly Integrated
          </h2>
          <p className="sm:text-lg max-w-[85ch] text-base text-neutral-300 mt-4">
            Our automations connect every part of your business ecosystem — from CRM to customer service, marketing to operations. Powered by modern AI frameworks, each system is secure, scalable, and built for measurable ROI.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Row 1: 2/3 - 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large feature (2/3) - Enterprise-Grade Security */}
          <div className="relative lg:col-span-2 ring-1 ring-white/10 md:p-10 overflow-hidden bg-zinc-950 border-zinc-900 rounded-2xl pt-6 pr-6 pb-6 pl-6 shadow-lg">
            <div className="absolute -left-10 -top-16 h-64 w-64 bg-gradient-to-tr from-cyan-400/20 to-teal-300/10 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-xl bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-cyan-300" strokeWidth={2} />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100">Enterprise-Grade Security</h3>
            </div>
            <p className="text-zinc-300 max-w-2xl">
              We prioritize trust at every layer. Every automation we deploy includes encryption, access controls, and compliance-ready architecture.
            </p>

            {/* Security features icons */}
            <div className="mt-8 grid grid-cols-5 gap-4 md:gap-6">
              {[
                { label: "End-to-end encryption", icon: Lock },
                { label: "Scoped tokens & MFA", icon: Key },
                { label: "SOC2 & GDPR", icon: Shield },
                { label: "Continuous monitoring", icon: Eye },
                { label: "Audit trails", icon: FileCheck }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-cyan-300" strokeWidth={2} />
                  </div>
                  <span className="text-xs text-zinc-400 text-center">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Small card (1/3) - AI Workflow Engine */}
          <div className="lg:col-span-1">
            <div className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 bg-gradient-to-br from-cyan-900/20 via-neutral-900 to-slate-800 border-cyan-500/20 border rounded-3xl shadow-lg backdrop-blur h-full">
              <div className="sm:p-8 pt-6 pr-6 pb-6 pl-6">
                <div className="relative h-56 sm:h-64 ring-1 ring-inset ring-cyan-500/20 overflow-hidden bg-gradient-to-br from-cyan-950/40 via-neutral-900 to-slate-800 rounded-2xl">
                  <div className="absolute right-6 top-8 sm:right-10 sm:top-10 w-[78%] rounded-2xl border border-cyan-500/30 bg-neutral-900/95 shadow-xl backdrop-blur">
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-cyan-500/20 bg-cyan-950/30">
                      <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/80"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                      <div className="ml-3 flex items-center gap-2">
                        <span className="text-xs text-cyan-400">Workflow Status</span>
                      </div>
                    </div>
                    <div className="p-4 relative h-32">
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="rounded bg-cyan-950/50 border border-cyan-500/20 p-1">
                            <div className="text-xs font-medium text-cyan-400">24/7</div>
                            <div className="text-[9px] text-neutral-400">Uptime</div>
                          </div>
                          <div className="rounded bg-cyan-950/50 border border-cyan-500/20 p-1">
                            <div className="text-xs font-medium text-cyan-400">99.9%</div>
                            <div className="text-[9px] text-neutral-400">SLA</div>
                          </div>
                          <div className="rounded bg-cyan-950/50 border border-cyan-500/20 p-1">
                            <div className="text-xs font-medium text-cyan-400">&lt;1s</div>
                            <div className="text-[9px] text-neutral-400">Response</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <div className="flex items-center gap-3">
                    <Cpu className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
                    <h3 className="sm:text-2xl text-2xl font-semibold tracking-tight">AI Workflow Engine</h3>
                  </div>
                  <p className="text-sm text-neutral-400 mt-3">Our AI workflows operate in real time — optimized for speed, accuracy, and resilience. Using automation orchestrators and modern LLM agents, tasks run 24/7 with human-level decision logic.</p>
                  <div className="mt-4">
                    <a href="#" className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 hover:text-cyan-300">
                      View capabilities
                      <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 1/3 - 2/3 (reversed) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Small card (1/3) - Business Systems We Automate */}
          <div className="lg:col-span-1">
            <article className="relative bg-neutral-900 border-white/10 border rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg sm:text-xl tracking-tight font-medium">Business Systems We Automate</h3>
                <span className="text-[11px] text-neutral-300">Pro</span>
              </div>
              <p className="mt-2 text-sm text-neutral-300">We design automations that integrate your existing business tools into one intelligent system — saving time and improving performance.</p>

              <div className="mt-6 space-y-3">
                {[
                  "CRM & sales tools",
                  "Email & calendar",
                  "Support desk workflows",
                  "Billing & invoicing",
                  "Analytics dashboards"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-lg ring-1 ring-cyan-400/20 bg-cyan-500/10 px-3 py-2">
                    <span className="text-sm text-cyan-200">{item}</span>
                    <Check className="text-cyan-400 w-4 h-4" strokeWidth={1.5} />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center gap-2 text-[11px] text-cyan-200 bg-cyan-500/10 rounded-full px-2 py-1 ring-1 ring-cyan-400/20">
                  <Workflow className="w-3.5 h-3.5" />
                  Full-stack integration
                </span>
              </div>
            </article>
          </div>

          {/* Large feature (2/3) - Voice & AI Integration Suite */}
          <div className="lg:col-span-2">
            <aside className="relative overflow-hidden sm:rounded-3xl flex flex-col bg-zinc-950 border-zinc-900 border rounded-2xl pt-5 pr-5 pb-5 pl-5 h-full">
              <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400">
                <span>Voice Automation</span>
                <span>Pro</span>
              </div>
              <h4 className="sm:mt-4 sm:text-3xl md:text-4xl text-2xl font-semibold text-zinc-100 tracking-tight mt-3">
                Natural voice agents powered by ElevenLabs AI with full workflow integration
              </h4>
              <p className="md:text-base text-sm text-zinc-300 mt-3">
                Perfect for support, scheduling, and internal communication. Our voice automation suite uses natural-sounding AI voices with seamless CRM integration.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Inbound & outbound voice agents",
                  "Multi-language support",
                  "CRM updates via conversation triggers",
                  "SMS & email follow-up automations"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Voice Visualization */}
              <div className="mt-6 md:mt-8">
                <div className="grid grid-cols-12 gap-2 h-16 items-end">
                  {[4, 6, 8, 12, 10, 14, 6, 9, 5, 11, 7, 3].map((height, idx) => (
                    <span key={idx} className={`h-${height} bg-cyan-${idx % 2 === 0 ? '500' : '400'} rounded-2xl`}></span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-zinc-300 text-sm">
                <Phone className="w-4 h-4 text-cyan-500" strokeWidth={1.5} />
                <span className="font-medium">Transform customer interactions with intelligent voice automation.</span>
              </div>
            </aside>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-16 text-center">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            Ready to Automate Your Business?
          </h3>
          <p className="text-neutral-300 mt-3 max-w-2xl mx-auto">
            Let's design an intelligent system tailored to your workflows.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-neutral-900 hover:bg-cyan-100 transition-colors font-medium text-sm"
            >
              Book a Consultation
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
            <a 
              href="#showcase" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15 transition-colors font-medium text-sm"
            >
              See Client Results
              <BarChart3 className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>

      <ContactFormModal open={isContactModalOpen} onOpenChange={setIsContactModalOpen} />
    </section>
  );
};
