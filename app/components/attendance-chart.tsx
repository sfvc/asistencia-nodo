"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const chartData = [
  { day: "Lun", presente: 95, ausente: 29 },
  { day: "Mar", presente: 98, ausente: 26 },
  { day: "Mié", presente: 92, ausente: 32 },
  { day: "Jue", presente: 89, ausente: 35 },
  { day: "Vie", presente: 85, ausente: 39 },
  { day: "Sáb", presente: 45, ausente: 79 },
  { day: "Dom", presente: 12, ausente: 112 },
]

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asistencias de la Semana</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="presente" fill="#22c55e" name="Presente" />
            <Bar dataKey="ausente" fill="#ef4444" name="Ausente" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
