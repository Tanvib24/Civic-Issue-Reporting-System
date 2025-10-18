import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PriorityBadgeProps {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  className?: string;
}

const priorityConfig = {
  low: {
    label: 'Low',
    className: 'bg-muted text-muted-foreground hover:bg-muted/80'
  },
  medium: {
    label: 'Medium',
    className: 'bg-accent-light text-accent hover:bg-accent-light/80'
  },
  high: {
    label: 'High',
    className: 'bg-warning-light text-warning hover:bg-warning-light/80'
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
  }
};

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];
  
  return (
    <Badge 
      className={cn(config.className, className)}
      variant="secondary"
    >
      {config.label}
    </Badge>
  );
};