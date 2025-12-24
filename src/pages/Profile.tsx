import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Building, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const roleColors = {
  student: 'bg-student text-student-foreground',
  faculty: 'bg-faculty text-faculty-foreground',
  hod: 'bg-hod text-hod-foreground',
  developer: 'bg-developer text-developer-foreground',
};

const roleLabels = {
  student: 'Student',
  faculty: 'Faculty',
  hod: 'Head of Department',
  developer: 'Developer',
};

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = () => {
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      department: user?.department || '',
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground mt-1">View and manage your account settings</p>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className={cn('text-3xl', roleColors[user?.role || 'student'])}>
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  <Badge className={cn(roleColors[user?.role || 'student'])}>
                    {roleLabels[user?.role || 'student']}
                  </Badge>
                  <Badge variant="outline">{user?.department}</Badge>
                </div>
              </div>
              <Button
                variant={isEditing ? 'outline' : 'default'}
                className="gap-2"
                onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              >
                {isEditing ? (
                  <>
                    <X className="h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className={cn(!isEditing && 'bg-muted')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className={cn(!isEditing && 'bg-muted')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  Department
                </Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={!isEditing}
                  className={cn(!isEditing && 'bg-muted')}
                />
              </div>
            </div>

            {isEditing && (
              <>
                <Separator />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Role Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Role & Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between py-3 border-b border-border/50">
              <div>
                <p className="font-medium">Current Role</p>
                <p className="text-sm text-muted-foreground">Your assigned role in the system</p>
              </div>
              <Badge className={cn('text-sm', roleColors[user?.role || 'student'])}>
                {roleLabels[user?.role || 'student']}
              </Badge>
            </div>
            <div className="py-3">
              <p className="font-medium">Capabilities</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                {user?.role === 'student' && (
                  <>
                    <li>• View scheduled meetings</li>
                    <li>• Receive announcements and messages</li>
                    <li>• View attendance records</li>
                  </>
                )}
                {user?.role === 'faculty' && (
                  <>
                    <li>• Schedule meetings with students and HOD</li>
                    <li>• Send announcements to students</li>
                    <li>• Mark and manage attendance</li>
                  </>
                )}
                {user?.role === 'hod' && (
                  <>
                    <li>• Schedule and manage all meetings</li>
                    <li>• Approve or cancel meeting requests</li>
                    <li>• Send department-wide broadcasts</li>
                  </>
                )}
                {user?.role === 'developer' && (
                  <>
                    <li>• Full system administration access</li>
                    <li>• Manage user accounts and roles</li>
                    <li>• View system logs and settings</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
