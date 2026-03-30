
"use client"

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ClipboardList, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function FacultyMarkEntryList() {
  return (
    <DashboardShell userRole="faculty" userName="Prof. Smith">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Mark Entry Overview</h2>
          <p className="text-muted-foreground">Select a student to enter or update their academic marks.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Students</CardTitle>
            <CardDescription>Listing all students in the current department.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Full Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_STUDENTS.map((student) => (
                  <TableRow key={student.rollNumber}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.className}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/faculty/marks/${student.rollNumber}`}>
                          <ClipboardList className="mr-2 h-4 w-4" />
                          Enter Marks
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
