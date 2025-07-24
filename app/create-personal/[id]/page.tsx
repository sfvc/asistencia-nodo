import { getPersonalById } from "@/services/personal"
import CreatePersonalForm from "../create-personal-form"
import type { Personal } from "@/types/personal"

export default async function PersonalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params; // ✅ Aquí se "resuelve" el Promise
  const personalId = Number(id)
  const personal: Personal | null = await getPersonalById(personalId)

  if (!personal) {
    return <p>Personal no encontrado.</p>
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh]">
      <CreatePersonalForm
        personalToEdit={personal}
        onUpdatePersonal={() => {}}
        onDeletePersonal={() => {}}
      />
    </div>
  )
}
