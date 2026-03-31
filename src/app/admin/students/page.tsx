
"use client"

import { useState, useMemo } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS, calculateStats } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, GraduationCap, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function AdminStudents() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = useMemo(() => {
    return MOCK_STUDENTS.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleExport = () => {
    toast({
      title: "Preparing Export",
      description: "Student records are being compiled for download.",
    });
  };

  return (
    <DashboardShell userRole="admin" userName="Dr. Admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight font-headline">Student Records</h2>
            <p className="text-muted-foreground font-medium">Centralized directory of all enrolled students.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExport} variant="outline" className="rounded-xl">
              <Download className="mr-2 h-4 w-4" />
              Export Records
            </Button>
            <Button className="rounded-xl shadow-lg shadow-primary/20">
              <GraduationCap className="mr-2 h-4 w-4" />
              Batch Enrollment
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1 max-w-sm group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search students by name or roll number..." 
              className="pl-10 h-11 rounded-xl bg-white border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="ghost" className="rounded-xl gap-2 font-bold text-slate-600">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <Card className="border-none shadow-xl ring-1 ring-black/5">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent bg-slate-50/50">
                  <TableHead className="font-bold pl-6 h-14">Roll No</TableHead>
                  <TableHead className="font-bold h-14">Name</TableHead>
                  <TableHead className="font-bold h-14">Department</TableHead>
                  <TableHead className="font-bold h-14">Class</TableHead>
                  <TableHead className="font-bold h-14">Performance</TableHead>
                  <TableHead className="font-bold text-right pr-6 h-14">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    const stats = calculateStats(student.marks);
                    return (
                      <TableRow key={student.rollNumber} className="group">
                        <TableCell className="font-mono font-bold pl-6 text-slate-500">{student.rollNumber}</TableCell>
                        <TableCell className="font-bold text-slate-900">{student.name}</TableCell>
                        <TableCell className="font-medium">{student.department}</TableCell>
                        <TableCell className="text-slate-500">{student.className}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-black ${
                              stats.grade.startsWith('A') ? 'text-green-600' : 
                              stats.grade === 'B' ? 'text-blue-600' : 'text-orange-600'
                            }`}>
                              {stats.grade}
                            </span>
                            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  stats.grade.startsWith('A') ? 'bg-green-500' : 
                                  stats.grade === 'B' ? 'bg-blue-500' : 'bg-orange-500'
                                }`}
                                style={{ width: `${stats.average}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button variant="ghost" size="sm" asChild className="rounded-lg hover:bg-primary/5 hover:text-primary font-bold">
                            <Link href={`/admin/students/${student.rollNumber}`}>
                              Details
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic font-medium">
                      No students matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
