// components/layouts/attendance-dashboard-layout.tsx
"use client"

import { Header } from "@/app/components/header"
import { Sidebar } from "@/app/components/sidebar"
import { Card, CardContent } from "@/app/components/ui/card"
import { ReactNode } from "react"

type AttendanceDashboardLayoutProps = {
  children: ReactNode
  title: string
}

export default function AttendanceDashboardLayout({
  children,
  title,
}: AttendanceDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <aside className="hidden lg:block border-r bg-muted/10">
          <Sidebar />
        </aside>

        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Content */}
            <Card>
              <CardContent className="pt-6">{children}</CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
