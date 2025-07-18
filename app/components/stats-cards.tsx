import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"

const stats = [
  {
    title: "Total Empleados",
    value: "124",
    description: "Empleados activos",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Presentes Hoy",
    value: "98",
    description: "+12% vs ayer",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Ausentes",
    value: "26",
    description: "Sin justificar: 8",
    icon: XCircle,
    color: "text-red-600",
  },
  {
    title: "Promedio Horas",
    value: "8.2h",
    description: "Esta semana",
    icon: Clock,
    color: "text-orange-600",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
