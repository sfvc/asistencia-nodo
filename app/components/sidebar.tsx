"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Users, BarChart3, Settings, FileText, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@lib/utils";
import { DecodedToken, getUserFromToken } from "@lib/auth";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const decoded = getUserFromToken();
    setUser(decoded);
  }, []);

  const sidebarItems = [
    {
      title: "Lista del Personal",
      href: "/",
      icon: Home,
      requiresAuth: false,
    },
    {
      title: "Crear Personal",
      href: "/create-personal",
      icon: Clock,
      requiresAuth: true,
    },
  ];

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {sidebarItems
              .filter((item) => !item.requiresAuth || user)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
