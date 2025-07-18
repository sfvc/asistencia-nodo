"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getPersonalById, updatePersonal, deletePersonal } from "@/services/personal"
import type { Personal } from "@/types/personal"
import CreatePersonalForm from "../create-personal-form"

interface PageProps {
  params: {
    id: string
  }
}

export default function PersonalDetailPage({ params }: PageProps) {
  const router = useRouter()
  const [personal, setPersonal] = useState<Personal | null>(null)
  const [loading, setLoading] = useState(true)

  const personalId = Number(params.id)

  useEffect(() => {
    async function fetchPersonal() {
      try {
        const data = await getPersonalById(personalId)
        setPersonal(data)
      } catch (error) {
        console.error("Error fetching personal:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPersonal()
  }, [personalId])

  const handleUpdate = async (updatedPersonal: Personal) => {
    try {
      await updatePersonal(updatedPersonal.id, updatedPersonal)
      router.push("/create-personal")
    } catch (error) {
      console.error("Error actualizando personal:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePersonal(id)
      router.push("/create-personal")
    } catch (error) {
      console.error("Error eliminando personal:", error)
    }
  }

  if (loading) return <p>Cargando...</p>
  if (!personal) return <p>Personal no encontrado.</p>

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
        <CreatePersonalForm
          personalToEdit={personal}
          onUpdatePersonal={handleUpdate}
          onDeletePersonal={handleDelete}
        />
    </div>
  )
}
