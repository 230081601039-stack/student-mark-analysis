
"use client"

import { useState } from 'react';
import { DashboardShell } from '@/components/layout/dashboard-shell';
import { MOCK_USERS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, MoreHorizontal, ShieldCheck, Mail, ShieldAlert, Loader2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function AdminUsers() {
  const { toast } = useToast();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isInviting, setIsInviting] = useState(false);

  const handleAction = (action: string, userName: string) => {
    setLoadingAction(`${action}-${userName}`);
    setTimeout(() => {
      setLoadingAction(null);
      toast({
        title: "Action Successful",
        description: `Successfully performed ${action} on user ${userName}.`,
      });
    }, 1000);
  };

  const handleInvite = () => {
    setIsInviting(true);
    // Simulating API call
    setTimeout(() => {
      setIsInviting(false);
      toast({
        title: "Invitation Sent",
        description: "A registration link has been sent to the new user's email.",
      });
    }, 1500);
  };

  return (
    <DashboardShell userRole="admin" userName="Dr. Admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight font-headline">User Management</h2>
            <p className="text-muted-foreground font-medium">Manage institutional accounts and system permissions.</p>
          </div>
          <Button 
            onClick={handleInvite} 
            disabled={isInviting}
            className="rounded-xl shadow-lg shadow-primary/20 min-w-[160px]"
          >
            {isInviting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite New User
              </>
            )}
          </Button>
        </div>

        <Card className="border-none shadow-xl ring-1 ring-black/5">
          <CardHeader>
            <CardTitle>System Accounts</CardTitle>
            <CardDescription>A complete list of registered administrators, faculty, and students.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-bold">User</TableHead>
                  <TableHead className="font-bold">Role</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_USERS.map((user) => (
                  <TableRow key={user.id} className="group transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900">{user.name}</span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`capitalize font-bold px-3 py-1 rounded-full border-none ${
                          user.role === 'admin' ? 'bg-destructive/10 text-destructive' :
                          user.role === 'faculty' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {user.role === 'admin' && <ShieldAlert className="mr-1 h-3 w-3" />}
                        {user.role === 'faculty' && <ShieldCheck className="mr-1 h-3 w-3" />}
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-xs font-bold text-slate-600">Active</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-xl w-48">
                          <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAction('editing', user.name)} className="font-medium cursor-pointer">
                            Edit Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAction('changing permissions', user.name)} className="font-medium cursor-pointer">
                            Change Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAction('deactivating', user.name)} className="text-destructive font-bold cursor-pointer">
                            Deactivate User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
