import { Message } from '@/types/auth';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface MessageCardProps {
  message: Message;
  onClick?: () => void;
}

export function MessageCard({ message, onClick }: MessageCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-md',
        !message.read && 'border-l-4 border-l-primary bg-primary/5'
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {message.sender.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className={cn('text-sm truncate', !message.read && 'font-semibold')}>
                {message.sender.name}
              </p>
              <span className="text-xs text-muted-foreground shrink-0">
                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
              </span>
            </div>
            <p className={cn('text-sm truncate', !message.read ? 'font-medium' : 'text-muted-foreground')}>
              {message.subject}
            </p>
            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{message.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
