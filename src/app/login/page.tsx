
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Lock, Mail, Loader2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MOCK_USERS } from '@/lib/mock-data';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<string>('student');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating login logic
    setTimeout(() => {
      // Find a mock user with that role, or default to first one
      const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
      router.push(`/${user.role}/dashboard`);
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-50 p-4 sm:p-6 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px]"></div>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-none ring-1 ring-black/5 bg-white/80 backdrop-blur-xl transition-all">
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary rounded-t-lg" />
        <CardHeader className="space-y-4 text-center pt-8">
          <div className="flex justify-center">
            <div className="rounded-2xl bg-primary/10 p-4 shadow-inner ring-1 ring-primary/20">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-extrabold font-headline tracking-tight text-slate-900">Portal Login</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Access your personalized EduMetric dashboard</CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-5 px-8">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-slate-500">I am a...</Label>
              <Select defaultValue="student" onValueChange={setRole}>
                <SelectTrigger id="role" className="w-full h-12 bg-white/50 border-slate-200 focus:ring-primary/30 rounded-xl">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="faculty">Faculty Member</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@edumetric.edu" 
                  className="pl-12 h-12 bg-white/50 border-slate-200 focus:ring-primary/30 rounded-xl"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">Password</Label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-primary">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  className="pl-12 h-12 bg-white/50 border-slate-200 focus:ring-primary/30 rounded-xl" 
                  required 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-6 p-8">
            <Button className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all active:scale-[0.98]" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ChevronRight className="ml-1 h-5 w-5" />
                </>
              )}
            </Button>
            <div className="text-center space-y-1">
              <p className="text-sm text-slate-500">
                Having trouble accessing your account?
              </p>
              <button type="button" className="text-xs font-bold text-primary hover:underline uppercase tracking-tight">
                Contact Administration
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
