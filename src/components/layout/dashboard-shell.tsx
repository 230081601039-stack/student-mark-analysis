
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  LineChart,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { UserRole } from '@/lib/mock-data';

interface DashboardShellProps {
  children: React.ReactNode;
  userRole: UserRole;
  userName: string;
}

export function DashboardShell({ children, userRole, userName }: DashboardShellProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: `/${userRole}/dashboard` },
    ...(userRole === 'admin' ? [
      { name: 'User Management', icon: Users, path: '/admin/users' },
      { name: 'Student Records', icon: GraduationCap, path: '/admin/students' },
      { name: 'Reports', icon: FileText, path: '/admin/reports' },
    ] : []),
    ...(userRole === 'faculty' ? [
      { name: 'Mark Entry', icon: ClipboardList, path: '/faculty/marks' },
      { name: 'Analytics', icon: LineChart, path: '/faculty/analytics' },
    ] : []),
    ...(userRole === 'student' ? [
      { name: 'My Performance', icon: LineChart, path: '/student/performance' },
      { name: 'Report Card', icon: FileText, path: '/student/report-card' },
    ] : []),
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r border-border/40 print:hidden">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="font-headline text-2xl font-extrabold tracking-tight text-primary">EduMetric</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2 mt-4 gap-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.path}
                    tooltip={item.name}
                    className={`rounded-lg transition-all duration-200 ${
                      pathname === item.path 
                        ? 'bg-primary/10 text-primary font-bold shadow-sm' 
                        : 'hover:bg-muted font-medium'
                    }`}
                  >
                    <Link href={item.path}>
                      <item.icon className={`h-5 w-5 ${pathname === item.path ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-primary/10 bg-gradient-to-br from-card to-primary/5 p-3 shadow-md transition-all hover:shadow-lg">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-inner">
                  {userName.charAt(0)}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-bold text-foreground leading-tight">{userName}</span>
                  <span className="truncate text-[10px] font-bold text-primary/70 uppercase tracking-widest">{userRole}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 rounded-xl border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm active:scale-95" 
                asChild
              >
                <Link href="/login">
                  <LogOut className="h-4 w-4" />
                  <span className="font-bold uppercase tracking-tighter text-xs">Logout</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-background p-6 md:p-10 print:p-0">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between print:hidden">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground/90 font-headline">
                  {menuItems.find(i => i.path === pathname)?.name || 'Dashboard'}
                </h1>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
