export type UserRole = 'student' | 'faculty' | 'hod' | 'developer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  organizer: User;
  attendees: User[];
  status: 'scheduled' | 'pending' | 'cancelled' | 'rescheduled';
  location?: string;
}

export interface Message {
  id: string;
  sender: User;
  recipients: User[];
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  classId: string;
  className: string;
}
