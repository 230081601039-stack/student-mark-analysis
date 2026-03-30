
"use client"

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS, SubjectMark } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Save, Undo2, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function StudentMarkEvaluation() {
  const { rollNumber } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Find student from mock data
  const student = MOCK_STUDENTS.find(s => s.rollNumber === rollNumber);

  // Initialize marks state from student data or empty array
  const [marks, setMarks] = useState<SubjectMark[]>(student?.marks || []);

  if (!student) {
    return (
      <DashboardShell userRole="faculty" userName="Prof. Smith">
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-xl font-semibold mb-4">Student not found.</h2>
          <Button asChild>
            <Link href="/faculty/marks">Go Back</Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  const handleMarkChange = (index: number, value: string) => {
    const numericValue = parseInt(value) || 0;
    const clampedValue = Math.min(100, Math.max(0, numericValue));
    
    const newMarks = [...marks];
    newMarks[index] = { ...newMarks[index], marks: clampedValue };
    setMarks(newMarks);
  };

  const handleSave = () => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Marks Updated Successfully",
        description: `Records for ${student.name} have been updated.`,
      });
      router.push('/faculty/dashboard');
    }, 1000);
  };

  return (
    <DashboardShell userRole="faculty" userName="Prof. Smith">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/faculty/dashboard">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Evaluate Student</h2>
            <p className="text-muted-foreground">Updating records for {student.name} ({student.rollNumber})</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Subject-wise Scores</CardTitle>
              <CardDescription>Enter numeric marks (0-100) for each subject.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {marks.map((m, idx) => (
                <div key={idx} className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor={`mark-${idx}`} className="text-base font-medium">
                    {m.subject}
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id={`mark-${idx}`}
                      type="number"
                      value={m.marks}
                      onChange={(e) => handleMarkChange(idx, e.target.value)}
                      className="text-right font-mono text-lg"
                      min="0"
                      max="100"
                    />
                    <span className="text-muted-foreground">/ 100</span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="outline" onClick={() => setMarks(student.marks)}>
                <Undo2 className="mr-2 h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Records
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Class</p>
                <p className="text-sm font-semibold">{student.className}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase">Department</p>
                <p className="text-sm font-semibold">{student.department}</p>
              </div>
              <div className="space-y-1 border-t pt-4">
                <p className="text-xs font-medium text-muted-foreground uppercase">Current Standing</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm">Total Marks:</span>
                  <span className="font-bold">{marks.reduce((sum, m) => sum + m.marks, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average:</span>
                  <span className="font-bold">{(marks.reduce((sum, m) => sum + m.marks, 0) / marks.length).toFixed(1)}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
