
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
        <Sidebar className="border-r border-border/40">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-2 px-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-headline text-xl font-bold tracking-tight text-primary">EduMetric</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="px-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.path}
                    tooltip={item.name}
                  >
                    <Link href={item.path}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 rounded-lg border bg-card p-3 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-accent">
                  {userName.charAt(0)}
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-sm font-medium">{userName}</span>
                  <span className="truncate text-xs text-muted-foreground capitalize">{userRole}</span>
                </div>
              </div>
              <Button variant="ghost" className="justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" asChild>
                <Link href="/login">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Link>
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-background p-6 md:p-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-3xl font-bold tracking-tight text-foreground">{menuItems.find(i => i.path === pathname)?.name || 'Dashboard'}</h1>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
