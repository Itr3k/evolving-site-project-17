import { ParticlesBackground } from "@/components/ParticlesBackground";
import { GridOverlay } from "@/components/GridOverlay";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Youtube, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/schemas/contactSchema";
import { useContactForm } from "@/hooks/useContactForm";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/seo/PageMeta";

const Contact = () => {
  const { submitForm, isSubmitting } = useContactForm();
  const navigate = useNavigate();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitForm(data);
    if (result.success) {
      form.reset();
      navigate(`/contact/thank-you?name=${encodeURIComponent(data.firstName)}`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <PageMeta 
        title="Contact Us - Los Angeles AI Consulting"
        description="Get in touch with Elevated AI. Los Angeles-based AI consultant serving Southern California businesses. Call 1-424-484-3844 or email korra@elevatedai.co for a consultation."
        keywords="contact AI consultant Los Angeles, AI consulting Southern California, Elevated AI contact, Los Angeles AI services contact, AI automation inquiry"
        canonical="https://elevatedai.co/contact"
      />
      <ParticlesBackground />
      
      <div className="pointer-events-none absolute inset-0 z-0">
        <GridOverlay />
      </div>

      <Header />

      {/* Hero Section */}
      <main className="z-10 relative pt-16 pb-12 md:pt-24 md:pb-16">
        <section className="md:px-8 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex text-xs font-medium text-white/80 font-geist bg-white/5 ring-white/10 ring-1 rounded-full mb-6 pt-1.5 px-3 pb-1.5 backdrop-blur-sm gap-2 items-center [animation:fadeSlideIn_1s_ease-out_0.1s_both]">
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <h1 className="leading-tight text-5xl md:text-6xl lg:text-7xl [animation:fadeSlideIn_1s_ease-out_0.2s_both] tracking-tighter font-geist">
              Let's Build Something
              <span className="block bg-clip-text text-transparent tracking-tighter font-geist bg-gradient-to-r from-white via-white to-white/70">
                Extraordinary Together
              </span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed font-geist [animation:fadeSlideIn_1s_ease-out_0.3s_both]">
              Serving businesses across Los Angeles and Southern California. Whether you're ready to start a project or exploring AI strategy, we're here to help.
            </p>
          </div>
        </section>
      </main>

      {/* Contact Section */}
      <section className="z-10 pb-24 md:pb-32 relative">
        <div className="md:px-8 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 rounded-3xl bg-slate-900/50 ring-1 ring-white/10 backdrop-blur-md p-6 md:p-8 [animation:fadeSlideIn_1s_ease-out_0.4s_both]">
              <h2 className="text-2xl font-medium tracking-tight font-geist mb-6">Send us a message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-slate-300 font-geist">First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="John"
                              className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition font-geist border-0"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-slate-300 font-geist">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Doe"
                              className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition font-geist border-0"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-300 font-geist">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="john@company.com"
                            className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition font-geist border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-300 font-geist">Company</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Your Company"
                            className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition font-geist border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-300 font-geist">Area of Interest</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition font-geist border-0">
                              <SelectValue placeholder="What solution interests you?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-900 border-white/10 text-white">
                            <SelectItem value="intelligent-automation">Intelligent Automation</SelectItem>
                            <SelectItem value="conversational-ai">Voice AI / Conversational AI</SelectItem>
                            <SelectItem value="decision-intelligence">Decision Intelligence & Analytics</SelectItem>
                            <SelectItem value="document-intelligence">Document Intelligence</SelectItem>
                            <SelectItem value="computer-vision">Computer Vision</SelectItem>
                            <SelectItem value="strategy-consulting">Strategic AI Consulting</SelectItem>
                            <SelectItem value="custom-solutions">Custom AI Solutions</SelectItem>
                            <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-300 font-geist">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="Tell us about your project..."
                            className="w-full bg-white/5 ring-1 ring-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition font-geist resize-none border-0"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-400" />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-neutral-900 ring-1 ring-white/20 px-6 py-3 text-base font-medium font-geist hover:bg-neutral-100 transition h-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              
              {/* Privacy Note */}
              <div className="mt-4 p-4 bg-white/5 ring-1 ring-white/10 rounded-xl">
                <p className="text-xs text-white/60 font-geist">
                  🔒 Your privacy matters. We will only use your contact information to respond to your inquiry. 
                  We never share your data with third parties.
                </p>
              </div>
            </div>

            {/* Contact Info & Quick Links */}
            <div className="space-y-6">
              {/* Contact Cards */}
              <div className="rounded-3xl bg-slate-900/50 ring-1 ring-white/10 backdrop-blur-md p-6 [animation:fadeSlideIn_1s_ease-out_0.5s_both]">
                <h3 className="text-lg font-medium tracking-tight font-geist mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href="mailto:korra@elevatedai.co" className="flex items-start gap-3 text-slate-300 hover:text-white transition group">
                    <div className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium font-geist">Email</div>
                      <div className="text-sm text-slate-400 font-geist">korra@elevatedai.co</div>
                    </div>
                  </a>
                  <a href="tel:+14244843844" className="flex items-start gap-3 text-slate-300 hover:text-white transition group">
                    <div className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium font-geist">Phone</div>
                      <div className="text-sm text-slate-400 font-geist">1-424-484-3844</div>
                    </div>
                  </a>
                  <div className="flex items-start gap-3 text-slate-300">
                    <div className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium font-geist">Location</div>
                      <div className="text-sm text-slate-400 font-geist">
                        Los Angeles, California<br />
                        Serving Southern California
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="rounded-3xl bg-slate-900/50 ring-1 ring-white/10 backdrop-blur-md p-6 [animation:fadeSlideIn_1s_ease-out_0.6s_both]">
                <h3 className="text-lg font-medium tracking-tight font-geist mb-4">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm font-geist">
                    <span className="text-slate-400">Monday - Friday</span>
                    <span className="text-slate-200">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-geist">
                    <span className="text-slate-400">Saturday</span>
                    <span className="text-slate-200">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-geist">
                    <span className="text-slate-400">Sunday</span>
                    <span className="text-slate-200">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="inline-flex items-center gap-2 text-xs text-slate-400 font-geist">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    Currently available
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-3xl bg-slate-900/50 ring-1 ring-white/10 backdrop-blur-md p-6 [animation:fadeSlideIn_1s_ease-out_0.7s_both]">
                <h3 className="text-lg font-medium tracking-tight font-geist mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition">
                    <Youtube className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
