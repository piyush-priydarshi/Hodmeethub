import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { MeetingCard } from '@/components/shared/MeetingCard';
import { MessageCard } from '@/components/shared/MessageCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockMeetings, mockMessages } from '@/data/mockData';
import { Calendar, MessageSquare, Bell, ArrowRight, Users, ClipboardList, Clock } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const upcomingMeetings = mockMeetings.filter((m) => m.status === 'scheduled' || m.status === 'rescheduled').slice(0, 3);
  const recentMessages = mockMessages.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening in your academic schedule</p>
          </div>
          <Button variant="outline" className="gap-2 w-fit">
            <Bell className="h-4 w-4" />
            View Notifications
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Upcoming Meetings"
            value={upcomingMeetings.length}
            icon={Calendar}
            description="This week"
            iconClassName="bg-student/10 text-student"
          />
          <StatsCard
            title="Unread Messages"
            value={mockMessages.filter((m) => !m.read).length}
            icon={MessageSquare}
            description="New announcements"
            iconClassName="bg-faculty/10 text-faculty"
          />
          <StatsCard
            title="Attendance Rate"
            value="94%"
            icon={ClipboardList}
            description="This semester"
            trend={{ value: 2, positive: true }}
            iconClassName="bg-status-scheduled/10 text-status-scheduled"
          />
          <StatsCard
            title="Next Meeting"
            value="2h 30m"
            icon={Clock}
            description="Project Review"
            iconClassName="bg-hod/10 text-hod"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Meetings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-4">
              {upcomingMeetings.map((meeting, index) => (
                <div key={meeting.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                  <MeetingCard meeting={meeting} />
                </div>
              ))}
              {upcomingMeetings.length === 0 && (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground/50 mb-3" />
                    <p className="text-muted-foreground">No upcoming meetings</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Messages & Announcements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Messages</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {recentMessages.map((message, index) => (
                <div key={message.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                  <MessageCard message={message} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm">View Calendar</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <MessageSquare className="h-5 w-5 text-faculty" />
                <span className="text-sm">Messages</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="h-5 w-5 text-hod" />
                <span className="text-sm">My Classes</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <ClipboardList className="h-5 w-5 text-status-scheduled" />
                <span className="text-sm">Attendance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
