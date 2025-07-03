export interface Usuario {
  id: number
  usuario: string
  clave: string
  email: string
  rol: string
  empleado: {
    id: number
    nombres: string
    primer_apellido: string
    segundo_apellido: string
  }
  fecha_creacion?: string
  fecha_modificacion?: string
  fecha_eliminacion?: string
}
