"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { useEffect, useState } from "react";
import { DecodedToken, getUserFromToken } from "@lib/auth";

export function Header() {
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const decoded = getUserFromToken();
    setUser(decoded);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Panel de Asistencias</h1>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 border border-blue-300  transition-all duration-200 cursor-pointer">
                    <AvatarImage
                      src="/placeholder-user.jpg"
                      alt="Usuario"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-muted text-primary font-medium">
                      {user?.email?.charAt(0).toUpperCase() || "?"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 shadow-lg border border-blue-100 rounded-md"
                  align="end"
                  forceMount
                  style={{ backgroundColor: "#f0fdff" }}
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.role || "Usuario"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email || "..."}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 transition-colors"
                    style={{ color: 'var(--secondary-accent)' }}
                    onClick={() => {
                      localStorage.removeItem("token")
                      window.location.href = "/login"
                    }}
                  >
                    Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="w-full md:w-auto px-6 py-3 cursor-pointer font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" onClick={() => (window.location.href = "/login")}>Iniciar sesión</Button>
          )}
        </div>
      </div>
    </header>
  );
}