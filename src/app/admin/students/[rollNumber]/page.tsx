
"use client"

import { useParams } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS, calculateStats } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, GraduationCap, School, Mail, FileText, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function AdminStudentDetails() {
  const { rollNumber } = useParams();
  const student = MOCK_STUDENTS.find(s => s.rollNumber === rollNumber);

  if (!student) {
    return (
      <DashboardShell userRole="admin" userName="Dr. Admin">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4 text-destructive">
            <School className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
          <p className="text-muted-foreground mb-6">The student record with roll number {rollNumber} could not be located.</p>
          <Button asChild variant="outline" className="rounded-xl">
            <Link href="/admin/students">Return to Student Records</Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  const stats = calculateStats(student.marks);

  return (
    <DashboardShell userRole="admin" userName="Dr. Admin">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-slate-100 h-11 w-11 shrink-0">
              <Link href="/admin/students">
                <ChevronLeft className="h-6 w-6 text-slate-600" />
              </Link>
            </Button>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight font-headline text-slate-900">Student Profile</h2>
              <p className="text-slate-500 font-medium">Administrative view for <span className="text-primary font-bold">{student.name}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Roll Number: {student.rollNumber}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <Card className="shadow-xl border-none ring-1 ring-black/5 overflow-hidden">
              <div className="h-2 w-full bg-primary" />
              <CardHeader className="flex flex-col items-center pt-8 pb-4">
                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-black mb-4 shadow-inner ring-4 ring-white">
                  {student.name.charAt(0)}
                </div>
                <CardTitle className="text-xl font-black">{student.name}</CardTitle>
                <CardDescription className="font-bold text-primary/70 uppercase tracking-tight">{student.className}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Institutional Email</span>
                      <span className="text-sm font-bold text-slate-700">{student.name.toLowerCase().replace(' ', '.')}@edumetric.edu</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <School className="h-4 w-4 text-slate-400" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Department</span>
                      <span className="text-sm font-bold text-slate-700">{student.department}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-sm font-medium text-slate-400">Current Grade</span>
                  <span className="text-3xl font-black text-accent">{stats.grade}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-sm font-medium text-slate-400">Avg. Percentage</span>
                  <span className="text-2xl font-black text-white">{stats.average}%</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-medium text-slate-400">Academic Standing</span>
                  <span className={`text-sm font-black px-3 py-1 rounded-full ${stats.result === 'Pass' ? 'bg-green-500/20 text-green-400' : 'bg-destructive/20 text-destructive'}`}>
                    {stats.result}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl border-none ring-1 ring-black/5">
              <CardHeader className="flex flex-row items-center justify-between border-b pb-6">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Subject Performance
                  </CardTitle>
                  <CardDescription>Detailed breakdown of term scores.</CardDescription>
                </div>
                <Button variant="outline" className="rounded-xl font-bold">
                  <FileText className="mr-2 h-4 w-4" />
                  Audit Logs
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {student.marks.map((m, i) => (
                    <div key={i} className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all">
                      <div className="mb-4 sm:mb-0">
                        <p className="font-black text-slate-900 text-lg leading-tight">{m.subject}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Core Requirement</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                          <span className="text-2xl font-black text-primary leading-none">{m.marks}</span>
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">/ 100</span>
                        </div>
                        <div className="h-3 w-32 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`h-full transition-all duration-700 ${m.marks >= 80 ? 'bg-primary' : m.marks >= 60 ? 'bg-accent' : 'bg-orange-500'}`} 
                            style={{ width: `${m.marks}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="bg-primary/5 border-primary/20 border-dashed border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-black text-primary uppercase tracking-tight text-sm">Enrollment Info</span>
                  </div>
                  <p className="text-xs font-medium text-primary/80 leading-relaxed">
                    Student was enrolled on September 15th, 2023. Currently active in {student.className} within the {student.department} department.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-accent/5 border-accent/20 border-dashed border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <span className="font-black text-accent uppercase tracking-tight text-sm">System Insight</span>
                  </div>
                  <p className="text-xs font-medium text-accent/80 leading-relaxed">
                    Performance is trending upwards compared to previous reports. Recommended for advanced honors tracks in core subjects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
