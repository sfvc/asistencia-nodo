export interface Personal {
  id: number
  nombre: string
  apellido: string
  edad: number
  avatar?: string
  dni: number
  createdAt: Date
  updatedAt: Date
}

export interface CreatePersonalData {
  nombre: string
  apellido: string
  edad: number
  avatar?: string
  dni: number
}
