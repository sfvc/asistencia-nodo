// services/personal.ts
import api from "@lib/api"
import type { CreatePersonalData, Personal } from "@/types/personal"

export const createPersonal = async (data: CreatePersonalData): Promise<Personal> => {
  const response = await api.post("/personal", data)
  return response.data
}

export const getAllPersonal = async (): Promise<Personal[]> => {
  const response = await api.get("/personal")
  return response.data
}

export const getPersonalById = async (id: number): Promise<Personal> => {
  const response = await api.get(`/personal/${id}`)
  return response.data
}

export const updatePersonal = async (
  id: number,
  data: Partial<CreatePersonalData>
): Promise<Personal> => {
  const response = await api.put(`/personal/${id}`, data)
  return response.data
}

export const deletePersonal = async (id: number): Promise<void> => {
  await api.delete(`/personal/${id}`)
}
