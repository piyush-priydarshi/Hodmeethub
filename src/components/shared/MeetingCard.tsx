import { Meeting } from '@/types/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MeetingCardProps {
  meeting: Meeting;
  onClick?: () => void;
}

const statusConfig = {
  scheduled: { label: 'Scheduled', className: 'status-scheduled border' },
  pending: { label: 'Pending', className: 'status-pending border' },
  cancelled: { label: 'Cancelled', className: 'status-cancelled border' },
  rescheduled: { label: 'Rescheduled', className: 'status-rescheduled border' },
};

export function MeetingCard({ meeting, onClick }: MeetingCardProps) {
  const status = statusConfig[meeting.status];

  return (
    <Card
      className={cn(
        'group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5',
        'border border-border/50 bg-card'
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
            {meeting.title}
          </CardTitle>
          <Badge variant="outline" className={cn('shrink-0 text-xs', status.className)}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{meeting.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(meeting.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            <span>{meeting.time}</span>
          </div>
          {meeting.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{meeting.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                {meeting.organizer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{meeting.organizer.name}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{meeting.attendees.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
