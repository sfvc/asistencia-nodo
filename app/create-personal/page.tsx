"use client"

import { useState } from "react"
import CreatePersonalForm from "./create-personal-form"
import type { Personal, CreatePersonalData } from "@/types/personal"
import AttendanceDashboardLayout from "@app/dashboard"

export default function PersonalPage() {
  const [personal, setPersonal] = useState<Personal[]>([
    {
      id: 1,
      nombre: "María",
      apellido: "González",
      edad: 28,
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      dni: 12345678,
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      nombre: "Carlos",
      apellido: "Rodríguez",
      edad: 35,
      dni: 87654321,
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-02-01"),
    },
  ])

  const handlePersonalCreated = (newPersonalData: CreatePersonalData) => {
    const newPersonal: Personal = {
      ...newPersonalData,
      id: personal.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setPersonal((prev) => [...prev, newPersonal])
  }

  return (
    <AttendanceDashboardLayout title="Gestión de Personal">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CreatePersonalForm onPersonalCreated={handlePersonalCreated} />
        </div>
      </div>
    </AttendanceDashboardLayout>
  )
}
