
"use client"

import { DashboardShell } from '@/components/layout/dashboard-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, TrendingUp, Users, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function AdminReports() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const departmentPerformance = [
    { name: 'Science', avg: 84 },
    { name: 'Commerce', avg: 78 },
    { name: 'Arts', avg: 72 },
    { name: 'Engineering', avg: 86 },
    { name: 'Medicine', avg: 91 },
  ];

  const recentReports = [
    { title: 'Annual Performance Summary', date: 'June 12, 2024', type: 'System' },
    { title: 'Faculty Evaluation Report', date: 'May 28, 2024', type: 'Review' },
    { title: 'Semester Result Statistics', date: 'May 15, 2024', type: 'Academic' },
    { title: 'Enrollment Audit 2024', date: 'April 30, 2024', type: 'Audit' },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Report Generated",
        description: "The new institutional performance report has been compiled successfully.",
      });
    }, 2000);
  };

  const handleDownload = (title: string) => {
    toast({
      title: "Downloading Report",
      description: `${title} is being prepared for download.`,
    });
  };

  const handleViewAllMetrics = () => {
    toast({
      title: "Opening Metrics Dashboard",
      description: "Redirecting to the comprehensive institutional analytics suite.",
    });
  };

  return (
    <DashboardShell userRole="admin" userName="Dr. Admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight font-headline">Institutional Reports</h2>
            <p className="text-muted-foreground font-medium">Generate and review high-level academic analytics.</p>
          </div>
          <Button 
            className="rounded-xl shadow-lg shadow-primary/20" 
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate New Report
              </>
            )}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 border-none shadow-xl ring-1 ring-black/5 overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b">
              <div className="flex items-center gap-2 text-primary mb-1">
                <TrendingUp className="h-5 w-5" />
                <span className="text-xs font-black uppercase tracking-widest">Performance Matrix</span>
              </div>
              <CardTitle>Departmental Average Scores</CardTitle>
              <CardDescription>Comparative analysis of academic standards across faculties.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontWeight: 600 }} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl ring-1 ring-black/5 flex flex-col">
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
              <CardDescription>Key metrics at a glance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Top Dept</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-black text-slate-900 leading-none">Medicine</h3>
                  <span className="text-lg font-bold text-primary">91%</span>
                </div>
              </div>
              <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10">
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Pass Rate</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-black text-slate-900 leading-none">Global</h3>
                  <span className="text-lg font-bold text-accent">82.4%</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Audits</p>
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-black text-slate-900 leading-none">2024</h3>
                  <span className="text-lg font-bold text-slate-400">12</span>
                </div>
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
              <Button 
                variant="outline" 
                className="w-full rounded-xl font-bold group"
                onClick={handleViewAllMetrics}
              >
                View All Metrics
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </div>

        <Card className="border-none shadow-xl ring-1 ring-black/5">
          <CardHeader>
            <CardTitle>Recent Archived Reports</CardTitle>
            <CardDescription>Access and download historical academic records.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 border border-slate-100 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white shadow-sm rounded-xl group-hover:text-primary transition-colors">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{report.title}</span>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.date}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 rounded-full text-slate-500">{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full"
                    onClick={() => handleDownload(report.title)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
