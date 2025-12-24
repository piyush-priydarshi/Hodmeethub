import { Meeting, Message, AttendanceRecord, User } from '@/types/auth';

export const mockStudents: User[] = [
  { id: 's1', name: 'Mohit', email: 'mohit@cmrit.ac.in', role: 'student', department: 'Computer Science' },
  { id: 's2', name: 'Rahul', email: 'rahul@cmrit.ac.in', role: 'student', department: 'Computer Science' },
  { id: 's3', name: 'Rohit', email: 'rohit@cmrit.ac.in', role: 'student', department: 'Computer Science' },
  { id: 's4', name: 'Ayush', email: 'ayush@cmrit.ac.in', role: 'student', department: 'Computer Science' },
  { id: 's5', name: 'Mukul', email: 'mukul@cmrit.ac.in', role: 'student', department: 'Computer Science' },
];

export const mockFaculty: User[] = [
  { id: 'f1', name: 'Ann Ma\'am', email: 'ann@cmrit.ac.in', role: 'faculty', department: 'Computer Science' },
  { id: 'f2', name: 'Kishore Sir', email: 'kishore@cmrit.ac.in', role: 'faculty', department: 'Computer Science' },
  { id: 'f3', name: 'Vibha Ma\'am', email: 'vibha@cmrit.ac.in', role: 'faculty', department: 'Computer Science' },
  { id: 'f4', name: 'Saurav Sir', email: 'saurav@cmrit.ac.in', role: 'faculty', department: 'Computer Science' },
  { id: 'f5', name: 'Lini Ma\'am', email: 'lini@cmrit.ac.in', role: 'faculty', department: 'Computer Science' },
];

export const mockHOD: User = {
  id: 'h1',
  name: 'Prof. Keshav',
  email: 'keshav100@cmrit.ac.in',
  role: 'hod',
  department: 'Computer Science',
};

export const mockMeetings: Meeting[] = [
  {
    id: 'm1',
    title: 'Project Review Meeting',
    description: 'Review of semester project progress and feedback session',
    date: '2024-01-15',
    time: '10:00 AM',
    organizer: mockFaculty[0],
    attendees: [mockStudents[0], mockStudents[1], mockStudents[2]],
    status: 'scheduled',
    location: 'Room 301',
  },
  {
    id: 'm2',
    title: 'Department Strategy Session',
    description: 'Quarterly planning and curriculum updates discussion',
    date: '2024-01-16',
    time: '2:00 PM',
    organizer: mockHOD,
    attendees: [...mockFaculty],
    status: 'scheduled',
    location: 'Conference Room A',
  },
  {
    id: 'm3',
    title: 'Research Consultation',
    description: 'Discussion about thesis research direction',
    date: '2024-01-17',
    time: '11:30 AM',
    organizer: mockFaculty[1],
    attendees: [mockStudents[3]],
    status: 'pending',
    location: 'Faculty Office 205',
  },
  {
    id: 'm4',
    title: 'Lab Safety Briefing',
    description: 'Mandatory safety protocols review for new lab equipment',
    date: '2024-01-14',
    time: '3:00 PM',
    organizer: mockFaculty[2],
    attendees: mockStudents,
    status: 'cancelled',
    location: 'Lab 101',
  },
  {
    id: 'm5',
    title: 'Academic Progress Review',
    description: 'Mid-semester academic progress evaluation',
    date: '2024-01-18',
    time: '9:00 AM',
    organizer: mockHOD,
    attendees: [mockStudents[4]],
    status: 'rescheduled',
    location: 'HOD Office',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'msg1',
    sender: mockFaculty[0],
    recipients: mockStudents,
    subject: 'Class Rescheduled to Thursday',
    content: 'Dear students, due to the faculty meeting, our Monday class has been rescheduled to Thursday at 2 PM.',
    timestamp: '2024-01-13T10:30:00',
    read: false,
  },
  {
    id: 'msg2',
    sender: mockHOD,
    recipients: [...mockFaculty, ...mockStudents],
    subject: 'Welcome Back - Spring Semester 2024',
    content: 'Welcome back everyone! I hope you had a restful break. Looking forward to a productive semester.',
    timestamp: '2024-01-10T09:00:00',
    read: true,
  },
  {
    id: 'msg3',
    sender: mockFaculty[1],
    recipients: [mockStudents[0], mockStudents[1]],
    subject: 'Assignment Submission Reminder',
    content: 'This is a reminder that your project assignments are due by end of day Friday.',
    timestamp: '2024-01-12T14:15:00',
    read: false,
  },
];

export const mockAttendance: AttendanceRecord[] = [
  { id: 'a1', studentId: 's1', studentName: 'Mohit', date: '2024-01-13', status: 'present', classId: 'c1', className: 'Data Structures' },
  { id: 'a2', studentId: 's2', studentName: 'Rahul', date: '2024-01-13', status: 'present', classId: 'c1', className: 'Data Structures' },
  { id: 'a3', studentId: 's3', studentName: 'Rohit', date: '2024-01-13', status: 'absent', classId: 'c1', className: 'Data Structures' },
  { id: 'a4', studentId: 's4', studentName: 'Ayush', date: '2024-01-13', status: 'late', classId: 'c1', className: 'Data Structures' },
  { id: 'a5', studentId: 's5', studentName: 'Mukul', date: '2024-01-13', status: 'present', classId: 'c1', className: 'Data Structures' },
  { id: 'a6', studentId: 's1', studentName: 'Mohit', date: '2024-01-12', status: 'present', classId: 'c2', className: 'Algorithms' },
  { id: 'a7', studentId: 's2', studentName: 'Rahul', date: '2024-01-12', status: 'absent', classId: 'c2', className: 'Algorithms' },
  { id: 'a8', studentId: 's3', studentName: 'Rohit', date: '2024-01-12', status: 'present', classId: 'c2', className: 'Algorithms' },
];
