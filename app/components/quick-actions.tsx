import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Clock, UserPlus, FileDown, Calendar } from "lucide-react"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button className="justify-start" variant="outline">
          <Clock className="mr-2 h-4 w-4" />
          Registrar Asistencia Manual
        </Button>
        <Button className="justify-start" variant="outline">
          <UserPlus className="mr-2 h-4 w-4" />
          Agregar Nuevo Empleado
        </Button>
        <Button className="justify-start" variant="outline">
          <FileDown className="mr-2 h-4 w-4" />
          Exportar Reporte
        </Button>
        <Button className="justify-start" variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Ver Calendario Completo
        </Button>
      </CardContent>
    </Card>
  )
}
