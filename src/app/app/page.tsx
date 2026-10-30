// src/app/app/page.tsx - Dashboard principal
import { useEffect } from "react";
import { api } from "../lib/api";
import { Proyecto } from "@/types/api.d";

export default function Dashboard() {
  useEffect(() => {
    // Verificar sesión y rol
    const user = getAuth().currentUser;
    if (!user) {
      window.location.href = "/auth/login";
    }
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-gray-600 mt-1">Bienvenido/a a SyncPass</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estadísticas tarjetas */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-semibold text-gray-500 mb-2">Proyectos Activos</h3>
            <p className="text-2xl font-bold text-gray-900">Cargando...</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-semibold text-gray-500 mb-2">Eventos</h3>
            <p className="text-2xl font-bold text-gray-900">Cargando...</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-semibold text-gray-500 mb-2">Asistencias</h3>
            <p className="text-2xl font-bold text-gray-900">Cargando...</p>
          </div>
        </div>
      </div>
    </div>
  );
}