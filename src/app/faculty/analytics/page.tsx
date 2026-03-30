"use client"

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_STUDENTS, calculateStats } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function FacultyAnalytics() {
  // Aggregate data from all students
  const allStats = MOCK_STUDENTS.map(s => calculateStats(s.marks));
  const avgDepartmentScore = allStats.reduce((sum, s) => sum + s.average, 0) / allStats.length;
  
  // Calculate subject averages
  const subjectTotals: Record<string, { sum: number, count: number }> = {};
  MOCK_STUDENTS.forEach(student => {
    student.marks.forEach(m => {
      if (!subjectTotals[m.subject]) {
        subjectTotals[m.subject] = { sum: 0, count: 0 };
      }
      subjectTotals[m.subject].sum += m.marks;
      subjectTotals[m.subject].count += 1;
    });
  });

  const subjectAverages = Object.entries(subjectTotals).map(([subject, data]) => ({
    subject,
    average: Math.round(data.sum / data.count)
  }));

  // Grade distribution
  const gradeCounts: Record<string, number> = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
  allStats.forEach(s => {
    gradeCounts[s.grade] = (gradeCounts[s.grade] || 0) + 1;
  });

  const gradeDistribution = Object.entries(gradeCounts)
    .filter(([_, count]) => count > 0)
    .map(([grade, count]) => ({ name: grade, value: count }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <DashboardShell userRole="faculty" userName="Prof. Smith">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Dept. Average</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{avgDepartmentScore.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Overall performance trend</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {Math.round((allStats.filter(s => s.result === 'Pass').length / allStats.length) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">Students meeting requirements</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Top Grade (A+)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{gradeCounts['A+']} Students</div>
              <p className="text-xs text-muted-foreground">Excellence recognition</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Analysis</CardTitle>
              <CardDescription>Average scores across core subjects</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectAverages}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="average" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Breakdown of student grades in the department</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex flex-col items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2">
                {gradeDistribution.map((d, i) => (
                  <div key={i} className="flex items-center gap-1 text-xs">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span>{d.name} ({d.value})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Detailed Subject Metrics</CardTitle>
            <CardDescription>Performance breakdown by academic topic</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Performance Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjectAverages.map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{s.subject}</TableCell>
                    <TableCell>{s.average}%</TableCell>
                    <TableCell>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        s.average >= 80 ? 'bg-green-100 text-green-700' : 
                        s.average >= 60 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {s.average >= 80 ? 'Excellent' : s.average >= 60 ? 'Satisfactory' : 'Needs Focus'}
                      </span>
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
