// src/app/auth/login/page.tsx - Login page
import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
      // Redireccionar al dashboard después del login
      window.location.href = "/app";
    } catch (error: any) {
      setError(error.message ?? "Error de login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(getAuth());
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={e => {
          e.preventDefault();
          handleLogin();
        }}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Correo electrónico</label>
            <input 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              type="email" 
              required 
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Contraseña</label>
            <input 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              type="password" 
              required 
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {loading ? 'Iniciando sesión...' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">¿No tienes cuenta? <a href="#" className="text-blue-600 hover underline">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
}