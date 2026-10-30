// src/app/app/layout.tsx
import "./globals.css";
import {fn} from "@tanstack/react-query";
import {ReactNode} from "react";

export const metadata = {
  title: "SyncPass Web",
  description: "Web de SyncPass - Gestión de proyectos y eventos comunitarios",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}