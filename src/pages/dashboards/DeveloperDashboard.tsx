import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockStudents, mockFaculty, mockHOD } from '@/data/mockData';
import { Users, Shield, Settings, Plus, Search, MoreVertical, Edit, Trash2, UserPlus, Activity } from 'lucide-react';
import { User, UserRole } from '@/types/auth';

const allUsers: User[] = [...mockStudents, ...mockFaculty, mockHOD];

const roleColors: Record<UserRole, string> = {
  student: 'bg-student text-student-foreground',
  faculty: 'bg-faculty text-faculty-foreground',
  hod: 'bg-hod text-hod-foreground',
  developer: 'bg-developer text-developer-foreground',
};

export default function DeveloperDashboard() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = allUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Developer Console 🛠️</h1>
            <p className="text-muted-foreground mt-1">System administration and user management</p>
          </div>
          <Button className="gap-2 w-fit">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>

        {/* Warning Banner */}
        <Card className="border-developer/30 bg-developer/5">
          <CardContent className="flex items-center gap-3 py-4">
            <Shield className="h-5 w-5 text-developer" />
            <div className="flex-1">
              <p className="text-sm font-medium">Developer Mode Active</p>
              <p className="text-xs text-muted-foreground">You have full administrative access to the system</p>
            </div>
            <Badge className="bg-developer text-developer-foreground">Admin</Badge>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Users"
            value={allUsers.length}
            icon={Users}
            description="Registered accounts"
            iconClassName="bg-developer/10 text-developer"
          />
          <StatsCard
            title="Students"
            value={mockStudents.length}
            icon={Users}
            description="Active students"
            iconClassName="bg-student/10 text-student"
          />
          <StatsCard
            title="Faculty"
            value={mockFaculty.length}
            icon={Users}
            description="Teaching staff"
            iconClassName="bg-faculty/10 text-faculty"
          />
          <StatsCard
            title="System Status"
            value="Healthy"
            icon={Activity}
            description="All services running"
            iconClassName="bg-status-scheduled/10 text-status-scheduled"
          />
        </div>

        {/* User Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-lg">User Management</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={roleColors[u.role]}>
                              {u.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{u.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{u.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{u.department}</TableCell>
                      <TableCell>
                        <Badge className="bg-status-scheduled/10 text-status-scheduled border-0">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <UserPlus className="h-5 w-5 text-developer" />
                <span className="text-sm">Add User</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Shield className="h-5 w-5 text-faculty" />
                <span className="text-sm">Manage Roles</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Settings className="h-5 w-5 text-hod" />
                <span className="text-sm">System Settings</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Activity className="h-5 w-5 text-status-scheduled" />
                <span className="text-sm">View Logs</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
