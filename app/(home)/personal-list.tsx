"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@components/ui/avatar"
import { Users, Calendar, BadgeIcon as IdCard, Search } from "lucide-react"
import type { Personal } from "@/types/personal"
import { getAllPersonal } from "@/services/personal"
import { Input } from "@components/ui/input"

export default function PersonalList() {
  const [personal, setPersonal] = useState<Personal[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        const data = await getAllPersonal()
        setPersonal(data)
      } catch (error) {
        console.error("Error fetching personal data:", error)
      }
    }

    fetchPersonal()
  }, [])

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
  }

  const handleClick = (id: number) => {
    router.push(`/create-personal/${id}`)
  }

  const filteredPersonal = personal.filter((person) =>
    `${person.nombre} ${person.apellido}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Personal de la Empresa
        </CardTitle>
        <CardDescription>
          {personal.length}{" "}
          {personal.length === 1
            ? "empleado registrado"
            : "empleados registrados"}
        </CardDescription>
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            style={{ color: 'var(--secondary-accent)', border: '1px solid var(--foreground) !important' }}
            type="text"
            placeholder="Buscar por nombre o apellido..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>

      <CardContent>
        {filteredPersonal.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No se encontraron empleados.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPersonal.map((person) => (
              <div
                key={person.id}
                onClick={() => handleClick(person.id)}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={person.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {getInitials(person.nombre, person.apellido)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold"
                          style={{ color: 'var(--primary-accent) !important' }}
                    >
                      {person.nombre} {person.apellido}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1"
                      style={{ color: 'var(--secondary-accent) !important' }}
                      >
                        <IdCard className="h-3 w-3" />
                        DNI: {person.dni}
                      </div>
                      <div className="flex items-center gap-1"
                      style={{ color: 'var(--secondary-accent) !important' }}
                      >
                        <Calendar className="h-3 w-3" />
                        {person.edad} años
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
