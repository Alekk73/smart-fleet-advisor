import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth.service";
import { useAuth } from "../../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const userData = await loginService(credentials);
      auth?.login(userData);

      navigate("/");
    } catch (error) {
      console.error("Error al inicir sesión:", error);
      alert("Credenciales incorrectas o error en el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-green-600"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Ingreso Choferes</h2>
          <p className="text-gray-500 text-sm">
            Gestiona tu flota de forma segura
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="tu@email.com"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-600"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-600"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
        >
          Entrar al Sistema
        </button>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-green-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
