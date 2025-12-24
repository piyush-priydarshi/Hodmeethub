import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { MeetingCard } from '@/components/shared/MeetingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockMeetings, mockFaculty, mockStudents } from '@/data/mockData';
import { Calendar, Users, BookOpen, Plus, ArrowRight, Crown, Send, CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function HODDashboard() {
  const { user } = useAuth();
  const allMeetings = mockMeetings.slice(0, 4);
  const pendingApprovals = mockMeetings.filter((m) => m.status === 'pending');

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome, {user?.name?.split(' ')[0]}! 👑</h1>
            <p className="text-muted-foreground mt-1">Oversee department operations and manage appointments</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Appointment
            </Button>
            <Button variant="outline" className="gap-2">
              <Send className="h-4 w-4" />
              Broadcast Message
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Faculty Members"
            value={mockFaculty.length}
            icon={BookOpen}
            description="In department"
            iconClassName="bg-faculty/10 text-faculty"
          />
          <StatsCard
            title="Total Students"
            value={mockStudents.length}
            icon={Users}
            description="Enrolled"
            iconClassName="bg-student/10 text-student"
          />
          <StatsCard
            title="Meetings Today"
            value="3"
            icon={Calendar}
            description="Scheduled"
            iconClassName="bg-hod/10 text-hod"
          />
          <StatsCard
            title="Pending Approvals"
            value={pendingApprovals.length}
            icon={Crown}
            description="Awaiting action"
            iconClassName="bg-status-pending/10 text-status-pending"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* All Meetings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Meetings</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View Calendar <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {allMeetings.map((meeting, index) => (
                <div key={meeting.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-slide-up">
                  <MeetingCard meeting={meeting} />
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals & Faculty */}
          <div className="space-y-6">
            {/* Pending Approvals */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Pending Approvals</h2>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {pendingApprovals.length > 0 ? (
                    pendingApprovals.map((meeting) => (
                      <div key={meeting.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium">{meeting.title}</p>
                          <p className="text-xs text-muted-foreground">{meeting.date} at {meeting.time}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-status-scheduled hover:text-status-scheduled hover:bg-status-scheduled/10">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">No pending approvals</p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Faculty Overview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Faculty</h2>
                <Button variant="ghost" size="sm" className="gap-1 text-primary">
                  View All <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <Card>
                <CardContent className="p-4 space-y-3">
                  {mockFaculty.map((faculty) => (
                    <div key={faculty.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-faculty text-faculty-foreground text-sm">
                            {faculty.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{faculty.name}</p>
                          <p className="text-xs text-muted-foreground">{faculty.email}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">Active</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
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
                <span className="text-sm">View All Meetings</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="h-5 w-5 text-student" />
                <span className="text-sm">Student Directory</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <BookOpen className="h-5 w-5 text-faculty" />
                <span className="text-sm">Faculty Management</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Send className="h-5 w-5 text-hod" />
                <span className="text-sm">Department Broadcast</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
