"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar"
import { UserPlus, Upload, Trash2, Pencil } from "lucide-react"
import type { CreatePersonalData, Personal } from "@/types/personal"
import { createPersonal, deletePersonal } from "@/services/personal"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@components/ui/alert-dialog"

interface CreatePersonalFormProps {
  onPersonalCreated?: (personal: Personal) => void
  onUpdatePersonal?: (updated: Personal) => void
  onDeletePersonal?: (id: number) => void
  personalToEdit?: Personal
}

export default function CreatePersonalForm({
  onPersonalCreated,
  onUpdatePersonal,
  onDeletePersonal,
  personalToEdit,
}: CreatePersonalFormProps) {
  const router = useRouter()
  const isEditing = !!personalToEdit

  const [formData, setFormData] = useState<CreatePersonalData>({
    nombre: "",
    apellido: "",
    edad: 0,
    avatar: "",
    dni: 0,
  })
  const [errors, setErrors] = useState<Partial<CreatePersonalData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isEditing && personalToEdit) {
      const { nombre, apellido, edad, avatar = "", dni } = personalToEdit
      setFormData({ nombre, apellido, edad, avatar, dni })
    }
  }, [personalToEdit])

  const validateForm = (): boolean => {
    const newErrors: Partial<CreatePersonalData> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es requerido"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      if (isEditing && personalToEdit) {
        const updated = { ...personalToEdit, ...formData }
        onUpdatePersonal?.(updated)
        toast.success("Usuario actualizado correctamente.")
      } else {
        const created = await createPersonal(formData)
        onPersonalCreated?.(created)
        toast.success("Usuario creado exitosamente.")
        setFormData({ nombre: "", apellido: "", edad: 0, avatar: "", dni: 0 })
      }
      setErrors({})
      setTimeout(() => router.push("/"), 1000) // ✅ Redirigir después de 1s
    } catch (error) {
      console.error("Error al guardar personal:", error)
      toast.error("Hubo un error al guardar el usuario.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!personalToEdit) return

    setIsSubmitting(true)
    try {
      await deletePersonal(personalToEdit.id)
      onDeletePersonal?.(personalToEdit.id)
      toast.success("Usuario eliminado correctamente.")
      setTimeout(() => router.push("/"), 1000)
    } catch (err) {
      console.error("Error al eliminar personal:", err)
      toast.error("Hubo un error al eliminar el usuario.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CreatePersonalData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }))
    }
  }

  const getInitials = () =>
    `${formData.nombre.charAt(0)}${formData.apellido.charAt(0)}`.toUpperCase()

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isEditing ? <Pencil className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          {isEditing ? "Editar Personal" : "Agregar Personal"}
        </CardTitle>
        <CardDescription>
          {isEditing
            ? "Modifica los datos del empleado"
            : "Completa la información del nuevo empleado"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-20 w-20">
                <AvatarImage src={formData.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {formData.nombre && formData.apellido ? (
                    getInitials()
                  ) : (
                    <Upload className="h-8 w-8" />
                  )}
                </AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                URL del Avatar (opcional)
              </Label>
            </div>
          </div>

          <Input
            style={{ color: 'var(--secondary-accent)', border: '1px solid var(--foreground)' }}
            id="avatar"
            type="url"
            placeholder="https://ejemplo.com/avatar.jpg"
            value={formData.avatar}
            onChange={(e) => handleInputChange("avatar", e.target.value)}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                style={{ color: 'var(--secondary-accent)', border: '1px solid var(--foreground)' }}
                id="nombre"
                placeholder="Juan"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                className={errors.nombre ? "border-red-500" : ""}
              />
              {errors.nombre && (
                <p className="text-sm text-red-500">{errors.nombre}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                style={{ color: 'var(--secondary-accent)', border: '1px solid var(--foreground)' }}
                id="apellido"
                placeholder="Pérez"
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                className={errors.apellido ? "border-red-500" : ""}
              />
              {errors.apellido && (
                <p className="text-sm text-red-500">{errors.apellido}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edad">Edad *</Label>
              <Input
                style={{ color: 'var(--secondary-accent)', border: '1px solid var(--foreground)' }}
                id="edad"
                min="18"
                max="100"
                placeholder="25"
                value={formData.edad || ""}
                onChange={(e) =>
                  handleInputChange("edad", Number(e.target.value))
                }
                className={errors.edad ? "border-red-500" : ""}
              />
              {errors.edad && (
                <p className="text-sm text-red-500">{errors.edad}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni">DNI *</Label>
              <Input
                style={{ color: 'var(--secondary-accent)', border: '1px solid var(--foreground)' }}
                id="dni"
                placeholder="12345678"
                value={formData.dni}
                onChange={(e) => handleInputChange("dni", e.target.value)}
                className={errors.dni ? "border-red-500" : ""}
              />
              {errors.dni && (
                <p className="text-sm text-red-500">{errors.dni}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <Button
              type="submit"
              className="w-full md:w-auto px-6 py-3 cursor-pointer font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Guardando..."
                : isEditing
                ? "Actualizar Personal"
                : "Crear Personal"}
            </Button>

            {isEditing && personalToEdit && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full cursor-pointer md:w-auto px-6 py-3 font-semibold text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción no se puede deshacer. Se eliminará permanentemente al personal.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-col-reverse md:flex-row md:justify-between gap-4 mt-4">
                        <AlertDialogCancel
                          disabled={isSubmitting}
                          className="w-full md:w-auto px-6 py-3 cursor-pointer rounded-md font-semibold text-gray-700 border border-gray-300 hover:bg-gray-100 transition-all"
                        >
                          Cancelar
                        </AlertDialogCancel>

                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={isSubmitting}
                          className="w-full md:w-auto px-6 cursor-pointer py-3 rounded-md font-semibold text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-all"
                        >
                          {isSubmitting ? "Eliminando..." : "Confirmar eliminación"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            <Button
              type="button"
              className="w-full cursor-pointer md:w-auto px-6 py-3 font-semibold text-white bg-green-600 hover:bg-green-700 transition-all"
              onClick={() => router.push("/")}
            >
              Volver a Inicio
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
