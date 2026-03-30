export type UserRole = 'admin' | 'faculty' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  rollNumber?: string;
}

export interface StudentRecord {
  rollNumber: string;
  name: string;
  className: string;
  department: string;
  marks: SubjectMark[];
}

export interface SubjectMark {
  subject: string;
  marks: number;
}

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Dr. Admin', email: 'admin@edumetric.edu', role: 'admin' },
  { id: '2', name: 'Prof. Smith', email: 'smith@edumetric.edu', role: 'faculty' },
  { id: '3', name: 'John Doe', email: 'john@edumetric.edu', role: 'student', rollNumber: 'S101' },
];

export const MOCK_STUDENTS: StudentRecord[] = [
  {
    rollNumber: 'S101',
    name: 'John Doe',
    className: '12th Grade',
    department: 'Science',
    marks: [
      { subject: 'Mathematics', marks: 85 },
      { subject: 'Physics', marks: 78 },
      { subject: 'Chemistry', marks: 92 },
      { subject: 'English', marks: 88 },
    ]
  },
  {
    rollNumber: 'S102',
    name: 'Jane Smith',
    className: '12th Grade',
    department: 'Commerce',
    marks: [
      { subject: 'Accounting', marks: 95 },
      { subject: 'Economics', marks: 82 },
      { subject: 'Mathematics', marks: 70 },
      { subject: 'English', marks: 90 },
    ]
  },
  {
    rollNumber: 'S103',
    name: 'Michael Brown',
    className: '11th Grade',
    department: 'Arts',
    marks: [
      { subject: 'History', marks: 88 },
      { subject: 'Geography', marks: 75 },
      { subject: 'Political Science', marks: 82 },
      { subject: 'English', marks: 85 },
    ]
  },
  {
    rollNumber: 'S104',
    name: 'Emily Davis',
    className: 'B.Tech I Year',
    department: 'Engineering',
    marks: [
      { subject: 'Programming in C', marks: 92 },
      { subject: 'Engineering Physics', marks: 80 },
      { subject: 'Calculus', marks: 85 },
      { subject: 'Mechanics', marks: 78 },
    ]
  }
];

export function calculateStats(marks: SubjectMark[]) {
  const total = marks.reduce((sum, m) => sum + m.marks, 0);
  const average = total / marks.length;
  let grade = 'F';
  if (average >= 90) grade = 'A+';
  else if (average >= 80) grade = 'A';
  else if (average >= 70) grade = 'B';
  else if (average >= 60) grade = 'C';
  else if (average >= 50) grade = 'D';

  return {
    total,
    average: Math.round(average * 100) / 100,
    grade,
    result: average >= 50 ? 'Pass' : 'Fail'
  };
}
