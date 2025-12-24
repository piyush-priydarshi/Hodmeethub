import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Users, MessageSquare, ClipboardList, GraduationCap } from 'lucide-react';
import cmritLogo from '@/assets/cmrit-logo.png';

const features = [
  {
    icon: Calendar,
    title: 'Meeting Management',
    description: 'Schedule, track, and manage meetings between students, faculty, and HOD effortlessly.',
  },
  {
    icon: MessageSquare,
    title: 'Announcements',
    description: 'Send and receive important announcements and communications across the department.',
  },
  {
    icon: ClipboardList,
    title: 'Attendance Tracking',
    description: 'Faculty can mark and manage student attendance with comprehensive records.',
  },
  {
    icon: Users,
    title: 'Role-Based Access',
    description: 'Secure access control with distinct dashboards for students, faculty, HOD, and admins.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={cmritLogo} alt="CMRIT Logo" className="h-10 w-auto" />
            <span className="font-bold text-lg">HOD Meet</span>
          </div>
          <Button asChild className="gap-2">
            <Link to="/login">
              Sign In <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              Academic Coordination Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Streamline Your
              <br />
              <span className="text-primary">Academic Meetings</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Connect students, faculty, and department heads with a powerful meeting management system designed for modern educational institutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="gap-2 text-base">
                <Link to="/login">
                  Get Started <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Learn More
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto">
            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Meetings</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <p className="text-3xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '300ms' }}>
              <p className="text-3xl font-bold text-primary">24/7</p>
              <p className="text-sm text-muted-foreground">Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform designed for seamless academic coordination and communication.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-primary rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-primary-foreground blur-3xl" />
              <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent blur-3xl" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join HOD Meet today and transform how your department manages meetings and communication.
              </p>
              <Button size="lg" variant="secondary" asChild className="gap-2">
                <Link to="/login">
                  Sign In Now <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={cmritLogo} alt="CMRIT Logo" className="h-8 w-auto" />
            <span className="font-semibold">HOD Meet</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 HOD Meet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
