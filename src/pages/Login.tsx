import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, BookOpen, Crown, Code, Loader2, ArrowRight, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import cmritLogo from '@/assets/cmrit-logo.png';

const roles: { id: UserRole; label: string; icon: typeof User; description: string; color: string }[] = [
  { id: 'student', label: 'Student', icon: GraduationCap, description: 'View meetings & announcements', color: 'bg-student hover:bg-student/90' },
  { id: 'faculty', label: 'Faculty', icon: BookOpen, description: 'Manage classes & attendance', color: 'bg-faculty hover:bg-faculty/90' },
  { id: 'hod', label: 'HOD', icon: Crown, description: 'Oversee department operations', color: 'bg-hod hover:bg-hod/90' },
  { id: 'developer', label: 'Developer', icon: Code, description: 'System administration', color: 'bg-developer hover:bg-developer/90' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="relative w-full lg:w-1/2 bg-primary p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-foreground blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <img src={cmritLogo} alt="CMRIT Logo" className="h-14 w-auto" />
            <h1 className="text-2xl font-bold text-primary-foreground">HOD Meet</h1>
          </div>

          <div className="hidden lg:block space-y-6 mt-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight">
              Academic Coordination
              <br />
              <span className="text-accent">Made Simple</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-md">
              Streamline meetings, manage attendance, and enhance communication between students, faculty, and administration.
            </p>
          </div>
        </div>

        <div className="relative z-10 hidden lg:flex gap-8 text-primary-foreground/60 text-sm">
          <div>
            <p className="text-3xl font-bold text-primary-foreground">500+</p>
            <p>Meetings Scheduled</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-foreground">98%</p>
            <p>User Satisfaction</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary-foreground">24/7</p>
            <p>Accessibility</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Select your role and sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    'relative p-4 rounded-xl border-2 transition-all duration-200 text-left group',
                    selectedRole === role.id
                      ? 'border-primary bg-primary/5 shadow-md'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg mb-2 transition-colors',
                      selectedRole === role.id ? role.color : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                    )}
                  >
                    <role.icon className={cn('h-5 w-5', selectedRole === role.id && 'text-primary-foreground')} />
                  </div>
                  <p className="font-semibold text-sm">{role.label}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{role.description}</p>
                  {selectedRole === role.id && (
                    <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Login Fields */}
            <Card className="border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full gap-2"
                  size="lg"
                  disabled={isLoading || !selectedRole}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <p className="text-center text-sm text-muted-foreground">
              Demo: Enter any email/password to login as the selected role
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
