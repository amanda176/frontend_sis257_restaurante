export interface Empleado {
  id: number // 👈 asegúrate que NO sea `number | undefined`
  nombres: string
  primer_apellido: string
  segundo_apellido: string
  cedula_identidad: string
  direccion: string
  celular: string
}
