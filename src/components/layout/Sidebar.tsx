import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MapPin, 
  FileText, 
  BarChart3, 
  Users, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import { useIsMobile } from '@/hooks/use-mobile';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Map View', href: '/map', icon: MapPin },
  { name: 'Issues', href: '/issues', icon: FileText },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Users', href: '/users', icon: Users },
];

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar = ({ className, onNavigate }: SidebarProps) => {
  const { logout, user } = useAuth();
  const { isOpen, toggle } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <div className={cn("relative flex h-full w-64 flex-col bg-card/50 glass border-r border-border", className)}>
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-border justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Urban Aid</h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          onClick={toggle}
          className="shrink-0"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors relative overflow-hidden",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <span className="absolute inset-0 -z-10 scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-primary/10 to-accent/10 transition-transform duration-300" />
            <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            <span className="transition-all duration-300 group-hover:tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">
              {(user?.full_name || user?.email || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{user?.full_name || user?.email || 'User'}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
        
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="w-full justify-start"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};