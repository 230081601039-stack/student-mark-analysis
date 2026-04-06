import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, BarChart3, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            < GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold text-primary">EduMetric</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#about" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
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
                Role-based access, real-time insights, and advanced performance tracking.
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

        <section id="about" className="py-24 bg-muted/30 scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">About EduMetric</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Empowering institutions with data-driven insights to foster academic growth and excellence through advanced tracking and intelligent feedback.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center space-y-4 p-8 bg-card rounded-2xl border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/20 cursor-default">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">Intelligent Diagnostics</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Tailored study recommendations based on your performance profile.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-8 bg-card rounded-2xl border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-accent/20 cursor-default">
                <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">Visual Progress</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Dynamic charts that transform static marks into actionable insights.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-8 bg-card rounded-2xl border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/20 cursor-default">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <GraduationCap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold">Role-Based Portals</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Dedicated interfaces for Administrators, Faculty, and Students.</p>
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
