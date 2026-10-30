// src/app/auth/layout.tsx
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        try {
          // Verificar que el token aún es válido llamando al API
          await api<any>("api/me", { method: "GET" });
          setUser(user);
        } catch (error) {
          // Token expirado o sin permisos
          signOut(getAuth());
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    // Timeout de 5 segundos para evitar bloqueos
    const timeout = setTimeout(() => {
      unsub();
      setInitialized(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (!initialized) return;
  }, [initialized]);

  if (!initialized) {
    return <div>Cargando sesión...</div>;
  }

  if (!user) {
    return <div>No autenticado. <a href="/auth/login">Iniciar sesión</a></div>;
  }

  return <div>{children}</div>;
}