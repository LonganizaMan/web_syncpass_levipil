// Tipos de la API del backend (DTOs)
// Estos deben mantenerse sincronizados con los DTOs de Spring Boot

export interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  areaTematica: string;
  unidadVecinal: string;
  fechaInicio: string;
  fechaTermino: string;
  estado: "ACTIVO" | "INACTIVO";
  creadoEn: string;
  actualizadoEn: string;
}

export interface Evento {
  id: string;
  proyectoId: string;
  nombre: string;
  descripcion: string;
  fechaHora: string;
  cuposMaximos: number;
  recinto: string;
  coordenadas?: string;
  estado: "PROGRAMADO" | "EN_CURSO" | "FINALIZADO";
}

export interface Asistente {
  id: string;
  nombre: string;
  tipo: "ESTUDIANTE" | "DOCENTE" | "BENEFICIARIO";
  email?: string;
}

export interface Asistencia {
  id: string;
  eventoId: string;
  asistenteId: string;
  fechaHora: string;
  validada: boolean;
  sincronizada: boolean;
}

export interface Encuesta {
  id: string;
  eventoId: string;
  calificacion: number; // 1-5
  utilidad: number; // 1-5
  comentario?: string;
  fechaEnvio: string;
}

export interface Usuario {
  uid: string;
  email: string;
  rol: "DOCENTE" | "ESTUDIANTE" | "BENEFICIARIO";
  temaFondo?: "VERDE" | "NEGRO" | "MORADO" | "AZUL";
  preferencias?: {
    tema: "VERDE" | "NEGRO" | "MORADO" | "AZUL";
  };
}

// Filtros de query
export interface ProyectosFilter {
  estado?: string;
}

export interface EventosFilter {
  proyectoId?: string;
  estado?: string;
}