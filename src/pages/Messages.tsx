import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MessageCard } from '@/components/shared/MessageCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockMessages } from '@/data/mockData';
import { MessageSquare, Search, Plus, Send, Inbox, Archive } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPage() {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredMessages = mockMessages.filter(
    (m) =>
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadMessages = filteredMessages.filter((m) => !m.read);
  const readMessages = filteredMessages.filter((m) => m.read);

  const canSendMessage = user?.role === 'faculty' || user?.role === 'hod';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Messages</h1>
            <p className="text-muted-foreground mt-1">View announcements and communications</p>
          </div>
          {canSendMessage && (
            <Button className="gap-2 w-fit">
              <Send className="h-4 w-4" />
              New Message
            </Button>
          )}
        </div>

        {/* Search */}
        <Card>
          <CardContent className="py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Messages Tabs */}
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList>
            <TabsTrigger value="inbox" className="gap-2">
              <Inbox className="h-4 w-4" />
              Inbox
              {unreadMessages.length > 0 && (
                <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                  {unreadMessages.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="read" className="gap-2">
              <Archive className="h-4 w-4" />
              Read
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="mt-6">
            {filteredMessages.length > 0 ? (
              <div className="space-y-3">
                {filteredMessages.map((message, index) => (
                  <div key={message.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
                    <MessageCard message={message} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">No messages found</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="read" className="mt-6">
            {readMessages.length > 0 ? (
              <div className="space-y-3">
                {readMessages.map((message, index) => (
                  <div key={message.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-slide-up">
                    <MessageCard message={message} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">No read messages</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
