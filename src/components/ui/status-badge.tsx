import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'submitted' | 'acknowledged' | 'in_progress' | 'resolved' | 'urgent';
  className?: string;
}

const statusConfig = {
  submitted: {
    label: 'Submitted',
    className: 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
  },
  acknowledged: {
    label: 'Acknowledged', 
    className: 'bg-accent-light text-accent hover:bg-accent-light/80'
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-warning-light text-warning hover:bg-warning-light/80'
  },
  resolved: {
    label: 'Resolved',
    className: 'bg-success-light text-success hover:bg-success-light/80'
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-destructive text-destructive-foreground hover:bg-destructive/80'
  }
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <Badge 
      className={cn(config.className, className)}
      variant="secondary"
    >
      {config.label}
    </Badge>
  );
};