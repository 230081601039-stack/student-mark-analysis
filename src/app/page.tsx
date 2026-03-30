import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { GraduationCap, BarChart3, ShieldCheck, Zap, Info } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-image');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            < GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">EduMetric</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Button asChild variant="default">
              <Link href="/login">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
              <div className="inline-flex items-center rounded-full border bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                <Zap className="mr-2 h-4 w-4" />
                <span>Next-Gen Academic Analytics</span>
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground font-headline">
                Comprehensive <span className="text-primary">Student Mark Analysis</span>
              </h1>
              <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl">
                A comprehensive student mark analysis system designed for clarity, professionalism, and academic excellence. 
                Role-based access, real-time insights, and GenAI-powered performance tracking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-12 px-8" asChild>
                  <Link href="/login">Portal Login</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
            <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          </div>
        </section>

        <section id="about" className="py-24 scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </div>
                <h2 className="text-3xl font-bold font-headline">Redefining Academic Performance Analysis</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  EduMetric is built on the belief that data should empower, not overwhelm. We provide a bridge between complex academic records and meaningful educational outcomes.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-bold">AI-Driven Diagnostics</h4>
                      <p className="text-sm text-muted-foreground">Get instant summaries and study recommendations tailored to your unique profile.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                      <BarChart3 className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-bold">Real-time Visualization</h4>
                      <p className="text-sm text-muted-foreground">Transform static marks into dynamic charts that reveal growth patterns and potential.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-3xl blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-muted">
                  {aboutImage && (
                    <Image 
                      src={aboutImage.imageUrl} 
                      alt={aboutImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={aboutImage.imageHint}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-card">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">EduMetric Tracker</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EduMetric. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
