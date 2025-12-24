import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MeetingCard } from '@/components/shared/MeetingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockMeetings } from '@/data/mockData';
import { Calendar, Search, Filter, Plus, Grid, List } from 'lucide-react';
import { useState } from 'react';

export default function MeetingsPage() {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const filteredMeetings = mockMeetings.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scheduledMeetings = filteredMeetings.filter((m) => m.status === 'scheduled');
  const pendingMeetings = filteredMeetings.filter((m) => m.status === 'pending');
  const pastMeetings = filteredMeetings.filter((m) => m.status === 'cancelled' || m.status === 'rescheduled');

  const canCreateMeeting = user?.role === 'faculty' || user?.role === 'hod';

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Meetings</h1>
            <p className="text-muted-foreground mt-1">View and manage all your scheduled meetings</p>
          </div>
          {canCreateMeeting && (
            <Button className="gap-2 w-fit">
              <Plus className="h-4 w-4" />
              New Meeting
            </Button>
          )}
        </div>

        {/* Filters & Search */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search meetings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="flex border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meetings Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming" className="gap-2">
              Upcoming <span className="text-xs bg-primary/10 px-1.5 py-0.5 rounded">{scheduledMeetings.length}</span>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              Pending <span className="text-xs bg-status-pending/10 px-1.5 py-0.5 rounded">{pendingMeetings.length}</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              Past <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{pastMeetings.length}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {scheduledMeetings.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {scheduledMeetings.map((meeting, index) => (
                  <div key={meeting.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                    <MeetingCard meeting={meeting} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">No upcoming meetings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            {pendingMeetings.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {pendingMeetings.map((meeting, index) => (
                  <div key={meeting.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                    <MeetingCard meeting={meeting} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">No pending meetings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastMeetings.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {pastMeetings.map((meeting, index) => (
                  <div key={meeting.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                    <MeetingCard meeting={meeting} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground">No past meetings</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
