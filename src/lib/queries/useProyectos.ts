// src/lib/queries/useProyectos.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Proyecto } from "@/types/api.d";

export function useProyectos() {
  return useQuery({
    queryKey: ["proyectos"],
    queryFn: () => api<Proyecto[]>("api/proyectos"),
    staleTime: 30_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });
}