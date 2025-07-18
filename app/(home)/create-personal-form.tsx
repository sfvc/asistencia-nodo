import type React from "react"

import { useState } from "react"
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import type { CreatePersonalData } from "@/types/personal"
import { UserPlus, Upload } from "lucide-react"

interface CreatePersonalFormProps {
  onPersonalCreated?: (personal: CreatePersonalData) => void
}

export default function CreatePersonalForm({ onPersonalCreated }: CreatePersonalFormProps) {
  const [formData, setFormData] = useState<CreatePersonalData>({
    nombre: "",
    apellido: "",
    edad: 0,
    avatar: "",
    dni: 0,
  })
  const [errors, setErrors] = useState<Partial<CreatePersonalData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<CreatePersonalData> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simular llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await fetch('/personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      console.log("Datos a enviar:", formData)

      if (onPersonalCreated) {
        onPersonalCreated(formData)
      }

      // Resetear formulario
      setFormData({
        nombre: "",
        apellido: "",
        edad: 0,
        avatar: "",
        dni: 0,
      })
      setErrors({})
    } catch (error) {
      console.error("Error al crear personal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CreatePersonalData, value: string) => {
    let parsedValue: string | number = value;

    if (field === 'dni' || field === 'edad') {
      parsedValue = Number(value);  // asegurate de convertir a número
    }

    setFormData((prev) => ({
      ...prev,
      [field]: parsedValue,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  }

  const getInitials = () => {
    return `${formData.nombre.charAt(0)}${formData.apellido.charAt(0)}`.toUpperCase()
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Agregar Personal
        </CardTitle>
        <CardDescription>Completa la información del nuevo empleado</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {formData.nombre && formData.apellido ? getInitials() : <Upload className="h-8 w-8" />}
                </AvatarFallback>
              </Avatar>
              <Label htmlFor="avatar" className="text-sm text-muted-foreground cursor-pointer">
                URL del Avatar (opcional)
              </Label>
            </div>
          </div>

          {/* Avatar URL */}
          <div className="space-y-2">
            <Input
              id="avatar"
              type="url"
              placeholder="https://ejemplo.com/avatar.jpg"
              value={formData.avatar}
              onChange={(e) => handleInputChange("avatar", e.target.value)}
            />
          </div>

          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                placeholder="Juan"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className={errors.nombre ? "border-red-500" : ""}
              />
              {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                placeholder="Pérez"
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                className={errors.apellido ? "border-red-500" : ""}
              />
              {errors.apellido && <p className="text-sm text-red-500">{errors.apellido}</p>}
            </div>
          </div>

          {/* Edad y DNI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edad">Edad *</Label>
              <Input
                id="edad"
                type="number"
                min="18"
                max="100"
                placeholder="25"
                value={formData.edad || ""}
                onChange={(e) => handleInputChange("edad", e.target.value)}
                className={errors.edad ? "border-red-500" : ""}
              />
              {errors.edad && <p className="text-sm text-red-500">{errors.edad}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">DNI *</Label>
              <Input
                id="dni"
                placeholder="25"
                value={formData.dni}
                onChange={(e) => handleInputChange("dni", e.target.value)}
                className={errors.dni ? "border-red-500" : ""}
              />
              {errors.dni && <p className="text-sm text-red-500">{errors.dni}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creando..." : "Crear Personal"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
