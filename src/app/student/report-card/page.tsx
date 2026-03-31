
"use client"

import { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS, calculateStats } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Printer, Download, GraduationCap, Calendar, User, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function StudentReportCard() {
  const student = MOCK_STUDENTS[0]; // Defaulting to first mock student
  const stats = calculateStats(student.marks);
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    // Simulate PDF generation and download
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Report Card Downloaded",
        description: `Academic report for ${student.name} has been saved as PDF.`,
      });
    }, 1500);
  };

  return (
    <DashboardShell userRole="student" userName={student.name}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Academic Report Card</h2>
            <p className="text-muted-foreground">Official record of your performance for the current semester.</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleDownloadPDF} 
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {isDownloading ? 'Generating...' : 'Download PDF'}
            </Button>
            <Button size="sm" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Student Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{student.name}</p>
                <p className="text-xs text-muted-foreground">Roll Number: {student.rollNumber}</p>
                <p className="text-xs text-muted-foreground">Class: {student.className}</p>
                <p className="text-xs text-muted-foreground">Dept: {student.department}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                Academic Period
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Fall Semester 2023</p>
                <p className="text-xs text-muted-foreground">Issued on: {new Date().toLocaleDateString()}</p>
                <p className="text-xs text-muted-foreground">Status: Finalized</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                Final Result
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-primary">{stats.grade}</div>
                <div>
                  <Badge variant={stats.result === 'Pass' ? 'default' : 'destructive'}>
                    {stats.result}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{stats.average}% Average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Breakdown</CardTitle>
            <CardDescription>Individual subject scores and grade assignments.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject Name</TableHead>
                  <TableHead>Maximum Marks</TableHead>
                  <TableHead>Obtained Marks</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.marks.map((m, idx) => {
                  let subjectGrade = 'F';
                  if (m.marks >= 90) subjectGrade = 'A+';
                  else if (m.marks >= 80) subjectGrade = 'A';
                  else if (m.marks >= 70) subjectGrade = 'B';
                  else if (m.marks >= 60) subjectGrade = 'C';
                  else if (m.marks >= 50) subjectGrade = 'D';

                  return (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{m.subject}</TableCell>
                      <TableCell>100</TableCell>
                      <TableCell>{m.marks}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{subjectGrade}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow className="bg-muted/50 font-bold">
                  <TableCell>Total</TableCell>
                  <TableCell>{student.marks.length * 100}</TableCell>
                  <TableCell>{stats.total}</TableCell>
                  <TableCell>{stats.grade}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
