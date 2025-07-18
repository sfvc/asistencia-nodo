import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown"

const attendanceData = [
  {
    id: 1,
    employee: "Ana García",
    email: "ana.garcia@empresa.com",
    checkIn: "08:15",
    checkOut: "17:30",
    status: "presente",
    hours: "8.25",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    employee: "Carlos López",
    email: "carlos.lopez@empresa.com",
    checkIn: "08:45",
    checkOut: "17:15",
    status: "presente",
    hours: "7.50",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    employee: "María Rodríguez",
    email: "maria.rodriguez@empresa.com",
    checkIn: "-",
    checkOut: "-",
    status: "ausente",
    hours: "0",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    employee: "Juan Martínez",
    email: "juan.martinez@empresa.com",
    checkIn: "09:00",
    checkOut: "-",
    status: "trabajando",
    hours: "6.5",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 5,
    employee: "Laura Sánchez",
    email: "laura.sanchez@empresa.com",
    checkIn: "08:30",
    checkOut: "17:45",
    status: "presente",
    hours: "8.25",
    avatar: "/placeholder-user.jpg",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "presente":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Presente</Badge>
    case "ausente":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Ausente</Badge>
    case "trabajando":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Trabajando</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function AttendanceTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Empleado</TableHead>
            <TableHead>Entrada</TableHead>
            <TableHead>Salida</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Horas</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={record.avatar || "/placeholder.svg"} alt={record.employee} />
                    <AvatarFallback>
                      {record.employee
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{record.employee}</div>
                    <div className="text-sm text-muted-foreground">{record.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono">{record.checkIn}</TableCell>
              <TableCell className="font-mono">{record.checkOut}</TableCell>
              <TableCell>{getStatusBadge(record.status)}</TableCell>
              <TableCell className="font-mono">{record.hours}h</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
