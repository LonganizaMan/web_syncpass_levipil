// src/app/proyectos/page.tsx - Gestión de proyectos (DOCENTE)
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Proyecto } from "@/types/api.d";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

export default function ProyectosPage() {
  const { data: proyectos, isLoading, isError, error } = useQuery({
    queryKey: ["proyectos"],
    queryFn: () => api<Proyecto[]>("api/proyectos"),
  });

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Proyecto | null>(null);

  const handleCreate = async (data: {
    titulo: string;
    descripcion: string;
    areaTematica: string;
    unidadVecinal: string;
    fechaInicio: string;
    fechaTermino: string;
    estado: "ACTIVO" | "INACTO";
  }) => {
    try {
      await api("api/proyectos", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error creando proyecto:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Proyectos</h1>

      {/* Lista de proyectos */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-gray-900">Proyectos</h2>
        </div>
        <div className="p-4">
          {isLoading ? (
            <p>Cargando proyectos...</p>
          ) : isError ? (
            <p className="text-red-600">Error: {error}</p>
          ) : proyectos.map((proyecto: Proyecto) => (
            <div key={proyecto.id} className="border-b border-gray-200 last:border-0 py-3">
              <div className="flex justify-between items-center">
                <span>{proyecto.titulo}</span>
                <span
                  className={proyecto.estado === "ACTIVO" ? "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2 rounded" : "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 rounded"}
                >
                  {proyecto.estado}
                </span>
              </div>
              <p className="text-sm text-gray-500">{proyecto.areaTematica} - {proyecto.unidadVecinal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Botón de crear */}
      <div className="mt-6">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isLoading ? "Cargando..." : "Crear Proyecto"}
        </Button>
      </div>

      {/* Formulario */}
      {showForm && (
        <div className="max-w-md mx-auto mt-6">
          <h3 className="text-xl font-bold mb-4">
            {editing ? "Editar Proyecto" : "Nuevo Proyecto"}
          </h3>
          <form
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault();
              const data: any = {};
              ;(e.currentTarget.querySelectorAll("input, select") as NodeListOf<HTMLInputElement>).forEach(
                (input: HTMLInputElement) => {
                  if (input.name) {
                    data[input.name] = input.value;
                  }
                }
              );
              await handleCreate(data);
            }}
            className="space-y-4"
          >
            <Input
              placeholder="Título del proyecto"
              defaultValue={editing?.titulo || ""}
              name="titulo"
            />
            <Input
              placeholder="Descripción"
              defaultValue={editing?.descripcion || ""}
              name="descripcion"
            />
            <Input
              placeholder="Área temática"
              defaultValue={editing?.areaTematica || ""}
              name="areaTematica"
            />
            <Input
              placeholder="Unidad vecinal"
              defaultValue={editing?.unidadVecinal || ""}
              name="unidadVecinal"
            />
            <Input
              placeholder="Fecha inicio (YYYY-MM-DD)"
              defaultValue={editing?.fechaInicio || ""}
              name="fechaInicio"
            />
            <Input
              placeholder="Fecha término (YYYY-MM-DD)"
              defaultValue={editing?.fechaTermino || ""}
              name="fechaTermino"
            />

            <Select>
              <SelectTrigger>
                <SelectItem value="ACTIVO">ACTIVO</SelectItem>
                <SelectItem value="INACTO">INACTO</SelectItem>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVO">ACTIVO</SelectItem>
                <SelectItem value="INACTO">INACTO</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                {editing ? "Actualizar" : "Crear"}
              </Button>
              <Button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 hover:bg-gray-400">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}