
"use client"

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS, calculateStats } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Eye, UserPlus, ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default function FacultyDashboard() {
  return (
    <DashboardShell userRole="faculty" userName="Prof. Smith">
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{MOCK_STUDENTS.length}</div>
            <p className="text-primary-foreground/70 text-sm">In your current department</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pending Evaluations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-accent">0</div>
            <p className="text-muted-foreground text-sm">All marks are up to date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Class Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">84.5%</div>
            <p className="text-muted-foreground text-sm">Science Department average</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Student Records</CardTitle>
            <CardDescription>Manage and update academic performance data</CardDescription>
          </div>
          <Button asChild>
            <Link href="/faculty/marks">
              <ClipboardList className="mr-2 h-4 w-4" />
              Enter Marks
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Total Marks</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_STUDENTS.map((student) => {
                const stats = calculateStats(student.marks);
                return (
                  <TableRow key={student.rollNumber}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{stats.total}</TableCell>
                    <TableCell>{stats.grade}</TableCell>
                    <TableCell>
                      <Badge variant={stats.result === 'Pass' ? 'default' : 'destructive'}>
                        {stats.result}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit2 className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
