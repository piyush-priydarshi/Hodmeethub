import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { MeetingCard } from '@/components/shared/MeetingCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockMeetings, mockMessages, mockStudents, mockAttendance } from '@/data/mockData';
import { Calendar, MessageSquare, Users, ClipboardList, Plus, ArrowRight, BookOpen, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const upcomingMeetings = mockMeetings.filter((m) => m.status === 'scheduled').slice(0, 3);
  const todayAttendance = mockAttendance.filter((a) => a.date === '2024-01-13');

  const attendanceStats = {
    present: todayAttendance.filter((a) => a.status === 'present').length,
    absent: todayAttendance.filter((a) => a.status === 'absent').length,
    late: todayAttendance.filter((a) => a.status === 'late').length,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Welcome, {user?.name?.split(' ')[0]}! 📚</h1>
            <p className="text-muted-foreground mt-1">Manage your classes, meetings, and student interactions</p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Meeting
            </Button>
            <Button variant="outline" className="gap-2">
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="My Classes"
            value="4"
            icon={BookOpen}
            description="Active this semester"
            iconClassName="bg-faculty/10 text-faculty"
          />
          <StatsCard
            title="Total Students"
            value={mockStudents.length}
            icon={Users}
            description="Enrolled students"
            iconClassName="bg-student/10 text-student"
          />
          <StatsCard
            title="Meetings Today"
            value="2"
            icon={Calendar}
            description="Scheduled"
            iconClassName="bg-hod/10 text-hod"
          />
          <StatsCard
            title="Messages Sent"
            value={mockMessages.length}
            icon={MessageSquare}
            description="This week"
            iconClassName="bg-primary/10 text-primary"
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
            </div>
          </div>

          {/* Today's Attendance Summary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today's Attendance</h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                Mark Attendance <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Data Structures - CS201</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Badge className="bg-status-scheduled/10 text-status-scheduled border-status-scheduled/20 border">
                    Present: {attendanceStats.present}
                  </Badge>
                  <Badge className="bg-status-cancelled/10 text-status-cancelled border-status-cancelled/20 border">
                    Absent: {attendanceStats.absent}
                  </Badge>
                  <Badge className="bg-status-pending/10 text-status-pending border-status-pending/20 border">
                    Late: {attendanceStats.late}
                  </Badge>
                </div>

                <div className="space-y-2">
                  {todayAttendance.slice(0, 4).map((record) => (
                    <div key={record.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-muted">
                            {record.studentName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{record.studentName}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          record.status === 'present'
                            ? 'status-scheduled'
                            : record.status === 'absent'
                            ? 'status-cancelled'
                            : 'status-pending'
                        }
                      >
                        {record.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                <span className="text-sm">Schedule Meeting</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <ClipboardList className="h-5 w-5 text-faculty" />
                <span className="text-sm">Mark Attendance</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Send className="h-5 w-5 text-hod" />
                <span className="text-sm">Send Announcement</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Users className="h-5 w-5 text-status-scheduled" />
                <span className="text-sm">View Students</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
