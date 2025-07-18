import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Badge } from "@/app/components/ui/badge"

const recentActivity = [
  {
    id: 1,
    employee: "Ana García",
    action: "Entrada registrada",
    time: "08:15",
    type: "check-in",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    employee: "Carlos López",
    action: "Salida registrada",
    time: "17:15",
    type: "check-out",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    employee: "María Rodríguez",
    action: "Ausencia justificada",
    time: "09:00",
    type: "absence",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    employee: "Juan Martínez",
    action: "Entrada tardía",
    time: "09:30",
    type: "late",
    avatar: "/placeholder-user.jpg",
  },
]

const getActivityBadge = (type: string) => {
  switch (type) {
    case "check-in":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Entrada</Badge>
    case "check-out":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Salida</Badge>
    case "absence":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Ausencia</Badge>
    case "late":
      return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Tardanza</Badge>
    default:
      return <Badge variant="secondary">{type}</Badge>
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.avatar || "/placeholder.svg"} alt={activity.employee} />
                <AvatarFallback>
                  {activity.employee
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{activity.employee}</div>
                <div className="text-sm text-muted-foreground">{activity.action}</div>
              </div>
              <div className="flex items-center gap-2">
                {getActivityBadge(activity.type)}
                <span className="text-sm text-muted-foreground font-mono">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
