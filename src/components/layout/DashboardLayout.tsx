import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Home,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  MessageSquare,
  Users,
  ClipboardList,
  Settings,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import cmritLogo from '@/assets/cmrit-logo.png';

interface DashboardLayoutProps {
  children: ReactNode;
}

const roleColors = {
  student: 'bg-student',
  faculty: 'bg-faculty',
  hod: 'bg-hod',
  developer: 'bg-developer',
};

const roleLabels = {
  student: 'Student',
  faculty: 'Faculty',
  hod: 'HOD',
  developer: 'Developer',
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const baseItems = [
      { icon: Home, label: 'Dashboard', path: '/dashboard' },
      { icon: Calendar, label: 'Meetings', path: '/meetings' },
      { icon: MessageSquare, label: 'Messages', path: '/messages' },
      { icon: User, label: 'Profile', path: '/profile' },
    ];

    if (user?.role === 'faculty') {
      return [
        ...baseItems.slice(0, 2),
        { icon: ClipboardList, label: 'Attendance', path: '/attendance' },
        ...baseItems.slice(2),
      ];
    }

    if (user?.role === 'hod') {
      return [
        ...baseItems.slice(0, 2),
        { icon: Users, label: 'Faculty', path: '/faculty' },
        { icon: GraduationCap, label: 'Students', path: '/students' },
        ...baseItems.slice(2),
      ];
    }

    if (user?.role === 'developer') {
      return [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Users', path: '/users' },
        { icon: Settings, label: 'System', path: '/system' },
        { icon: User, label: 'Profile', path: '/profile' },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="flex h-full items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src={cmritLogo} alt="CMRIT Logo" className="h-9 w-auto" />
              <span className="hidden font-bold text-lg sm:block">HOD Meet</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={cn(roleColors[user?.role || 'student'], 'text-primary-foreground')}>
                      {user?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <Badge variant="secondary" className="text-[10px] h-4">
                      {roleLabels[user?.role || 'student']}
                    </Badge>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="container py-6 px-4 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
