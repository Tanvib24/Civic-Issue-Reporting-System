import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from '@/contexts/SidebarContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const { toggle } = useSidebar();
  return (
    <header className="h-16 border-b border-border bg-card/50 glass px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle navigation" className="shrink-0">
          <Menu className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search issues..."
            className="pl-10 w-64"
          />
        </div>

        {/* Notifications */}
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 w-5 h-5 text-xs p-0 flex items-center justify-center"
          >
            3
          </Badge>
        </Button>
      </div>
    </header>
  );
};