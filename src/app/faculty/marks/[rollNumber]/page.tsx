
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
import { ChevronLeft, Save, Undo2, Loader2, RotateCcw, UserCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function StudentMarkEvaluation() {
  const { rollNumber } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Find student from mock data
  const student = MOCK_STUDENTS.find(s => s.rollNumber === rollNumber);

  // Initialize marks state from student data or empty array
  // Use a deep copy to ensure reset works correctly and reference isn't shared
  const [marks, setMarks] = useState<SubjectMark[]>(
    student ? student.marks.map(m => ({ ...m })) : []
  );

  if (!student) {
    return (
      <DashboardShell userRole="faculty" userName="Prof. Smith">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="rounded-full bg-destructive/10 p-4 mb-4 text-destructive">
            <UserCircle2 className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Student Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested roll number does not exist in our database.</p>
          <Button asChild variant="outline">
            <Link href="/faculty/marks">Go Back to List</Link>
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

  const handleReset = () => {
    // Reset from original student data with a fresh clone
    setMarks(student.marks.map(m => ({ ...m })));
    toast({
      title: "Changes Reset",
      description: "Marks have been reverted to the original values.",
    });
  };

  const handleSave = () => {
    setLoading(true);
    // Simulating API call to persist data
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Evaluation Finalized",
        description: `Academic records for ${student.name} have been updated.`,
      });
      router.push('/faculty/dashboard');
    }, 1200);
  };

  const totalObtained = marks.reduce((sum, m) => sum + m.marks, 0);
  const averagePercentage = (totalObtained / (marks.length || 1)).toFixed(1);

  return (
    <DashboardShell userRole="faculty" userName="Prof. Smith">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-slate-100 h-11 w-11 shrink-0">
              <Link href="/faculty/dashboard">
                <ChevronLeft className="h-6 w-6 text-slate-600" />
              </Link>
            </Button>
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight font-headline text-slate-900">Academic Evaluation</h2>
              <p className="text-slate-500 font-medium">Managing records for <span className="text-primary font-bold">{student.name}</span> • {student.rollNumber}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Editing Session Active</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-2 shadow-2xl border-none ring-1 ring-black/5 bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b pb-8 pt-8 px-8 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <RotateCcw className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Subject Scores</CardTitle>
              </div>
              <CardDescription className="text-slate-500 font-medium italic">
                Input the final numeric marks for each subject. All scores are normalized to a 100-point scale.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-8 px-8">
              {marks.map((m, idx) => (
                <div key={idx} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all">
                  <div className="space-y-1">
                    <Label htmlFor={`mark-${idx}`} className="text-base font-bold text-slate-800">
                      {m.subject}
                    </Label>
                    <p className="text-xs text-slate-400 font-medium">Core Subject Requirement</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative group/input">
                      <Input
                        id={`mark-${idx}`}
                        type="number"
                        value={m.marks}
                        onChange={(e) => handleMarkChange(idx, e.target.value)}
                        className="text-right font-mono text-xl h-14 w-28 rounded-xl focus:ring-primary/20 border-slate-200 bg-white shadow-inner group-focus-within/input:border-primary transition-all"
                        min="0"
                        max="100"
                      />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-white scale-0 group-focus-within/input:scale-100 transition-transform" />
                    </div>
                    <span className="text-sm font-black text-slate-300 uppercase tracking-widest">/ 100</span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t bg-slate-50/30 p-8 rounded-b-2xl">
              <Button 
                variant="outline" 
                onClick={handleReset} 
                className="w-full sm:w-auto h-12 rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm transition-all"
              >
                <Undo2 className="mr-2 h-4 w-4" />
                Reset Changes
              </Button>
              <Button 
                onClick={handleSave} 
                disabled={loading} 
                className="w-full sm:w-auto h-12 px-10 rounded-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Evaluation
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-xl border-none ring-1 ring-black/5 overflow-hidden bg-white/90">
              <div className="h-2 w-full bg-gradient-to-r from-primary to-accent" />
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <UserCircle2 className="h-5 w-5 text-slate-400" />
                  Student Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade</p>
                    <p className="text-sm font-bold text-slate-900">{student.className}</p>
                  </div>
                  <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dept</p>
                    <p className="text-sm font-bold text-slate-900">{student.department}</p>
                  </div>
                </div>
                
                <div className="pt-6 border-t space-y-4">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Live Metrics</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-600">Aggregate Score</span>
                    <span className="text-2xl font-black text-primary tracking-tighter">{totalObtained}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-600">Current Average</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-accent tracking-tighter">{averagePercentage}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mt-2 shadow-inner">
                    <div 
                      className="h-full bg-primary transition-all duration-500 ease-out" 
                      style={{ width: `${averagePercentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20 shadow-none border-dashed border-2 rounded-2xl">
              <CardContent className="p-5 flex gap-4 items-start text-primary">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <RotateCcw className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-tight">Pro-Tip</p>
                  <p className="text-[11px] leading-relaxed font-medium opacity-80">
                    Verify all subject entries before clicking "Save Evaluation". Changes are pending until the final record update is confirmed.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
