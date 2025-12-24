import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import HODDashboard from './HODDashboard';
import DeveloperDashboard from './DeveloperDashboard';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  switch (user?.role) {
    case 'student':
      return <StudentDashboard />;
    case 'faculty':
      return <FacultyDashboard />;
    case 'hod':
      return <HODDashboard />;
    case 'developer':
      return <DeveloperDashboard />;
    default:
      return <Navigate to="/login" replace />;
  }
}
