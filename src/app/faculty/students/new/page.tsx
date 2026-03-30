
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Save, Loader2, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function AddStudentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    className: '12th Grade',
    department: 'Science',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulating API call to save student
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Student Enrolled",
        description: `${formData.name} has been successfully added to the system.`,
      });
      router.push('/faculty/dashboard');
    }, 1500);
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
            <h2 className="text-2xl font-bold tracking-tight">Enroll New Student</h2>
            <p className="text-muted-foreground">Add a new student record to your department.</p>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSave}>
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-2">
                <UserPlus className="h-5 w-5" />
                <span className="font-semibold">Student Information</span>
              </div>
              <CardTitle>Manual Registration</CardTitle>
              <CardDescription>
                Fill in the details below to create a new student academic profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Alice Johnson"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rollNumber">Roll Number</Label>
                <Input
                  id="rollNumber"
                  placeholder="e.g. S105"
                  required
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="class">Class / Grade</Label>
                  <Select 
                    defaultValue={formData.className} 
                    onValueChange={(v) => setFormData({ ...formData, className: v })}
                  >
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10th Grade">10th Grade</SelectItem>
                      <SelectItem value="11th Grade">11th Grade</SelectItem>
                      <SelectItem value="12th Grade">12th Grade</SelectItem>
                      <SelectItem value="B.Tech I Year">B.Tech I Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    defaultValue={formData.department}
                    onValueChange={(v) => setFormData({ ...formData, department: v })}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Commerce">Commerce</SelectItem>
                      <SelectItem value="Arts">Arts</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              <Button variant="ghost" asChild>
                <Link href="/faculty/dashboard">Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enrolling...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Student Record
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </DashboardShell>
  );
}
