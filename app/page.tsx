import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import HomeHeader from "@/components/home/home-header";
import FeatureSection from "@/components/home/feature-section";
import TemplateShowcase from "@/components/home/template-showcase";
import Footer from "@/components/home/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-32 relative overflow-hidden">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Create Professional Resumes in Minutes
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Our easy-to-use resume builder helps you create a standout 
              professional resume employers will notice. Choose from multiple templates
              and export as PDF in seconds.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/builder/new">
                  Create Resume <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/templates">
                  View Templates
                </Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 -z-10" />
        </section>

        {/* Features Section */}
        <FeatureSection />

        {/* Template Showcase */}
        <TemplateShowcase />

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Alex Thompson",
                  role: "Software Engineer",
                  quote: "This resume builder helped me land my dream job. The templates are clean and professional.",
                },
                {
                  name: "Sarah Johnson",
                  role: "Marketing Manager",
                  quote: "I was struggling with my resume format until I found this tool. So easy to use and the results look amazing!",
                },
                {
                  name: "Michael Chen",
                  role: "UX Designer",
                  quote: "The ability to switch between templates while keeping my information was a game-changer in my job search.",
                },
              ].map((testimonial, i) => (
                <div key={i} className="bg-card p-6 rounded-lg shadow-sm">
                  <blockquote className="text-card-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}