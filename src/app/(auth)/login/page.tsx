// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { loginUser } from "@/shared/lib/auth.service";
// import type { LoginPayload } from "@/shared/types/auth.types";
// import Image from "next/image";

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const payload: LoginPayload = {
//       username: username.trim(),
//       password,
//     };

//     try {
//       const response = await loginUser(payload);

//       if (response.success) {
//         console.log("✅ Login exitoso, redirigiendo...");
//         router.push("/dashboard");
//       } else {
//         setError(response.message || "Error al iniciar sesión");
//       }
//     } catch (err) {
//       console.error("❌ Error en login:", err);
//       setError(err instanceof Error ? err.message : "Error desconocido");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Lado izquierdo: Imagen */}
//       <div className="hidden lg:block lg:w-1/2 relative">
//         <Image
//           src="/login/fondo-imagen-uagrm.png"
//           alt="UAGRM"
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Lado derecho: Formulario */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <Image
//               src="/login/uagrm_logo.png"
//               alt="UAGRM Logo"
//               width={120}
//               height={120}
//               className="mx-auto mb-4"
//             />
//             <h1 className="text-3xl font-bold text-gray-800">
//               Sistema de Planificación
//             </h1>
//             <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
//           </div>

//           {/* Formulario */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Error */}
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//                 <span className="block sm:inline">{error}</span>
//               </div>
//             )}

//             {/* Usuario */}
//             <div>
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Usuario
//               </label>
//               <input
//                 id="username"
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Ingrese su usuario"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             {/* Contraseña */}
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Contraseña
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Ingrese su contraseña"
//                 required
//                 disabled={loading}
//               />
//             </div>

//             {/* Botón */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center">
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     />
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     />
//                   </svg>
//                   Ingresando...
//                 </span>
//               ) : (
//                 "Iniciar Sesión"
//               )}
//             </button>
//           </form>

//           {/* Links adicionales */}
//           <div className="mt-6 text-center">
//             <a href="#" className="text-sm text-blue-600 hover:underline">
//               ¿Olvidaste tu contraseña?
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { loginUser } from "@/shared/lib/auth.service";

const uagrm_logo = "/login/uagrm_logo.png";
const logo_facebook = "/login/logo_facebook.png";
const logo_whatApps = "/login/logo_whatApps.png";
const imgenFondo = "/login/fondo-imagen-uagrm.png";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("root", { message: "" });

    const payload = {
      username: data.username.trim(),
      password: data.password,
    };

    try {
      const result = await loginUser(payload);

      if (result?.success) {
        router.push("/");
      } else {
        setError("root", {
          message:
            result?.message || "Credenciales incorrectas o error de red.",
        });
      }
    } catch (err) {
      setError("root", {
        message:
          err instanceof Error
            ? err.message
            : "Credenciales incorrectas o error de red.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${imgenFondo})`,
      }}
    >
      <header className="flex justify-between p-5">
        <Image src={uagrm_logo} alt="Logo UAGRM" width={80} height={100} />
        <section className="flex gap-5">
          <Image
            src={logo_facebook}
            className="rounded-xl cursor-pointer hover:opacity-80"
            alt="Facebook UAGRM"
            width={50}
            height={50}
          />
          <Image
            src={logo_whatApps}
            className="rounded-xl cursor-pointer hover:opacity-80"
            alt="WhatsApp UAGRM"
            width={50}
            height={50}
          />
        </section>
      </header>

      <section className="flex items-center justify-center">
        <section className="flex flex-col-reverse md:flex-row md:w-[85%] lg:w-[60%] md:mt-72 lg:mt-20 md:gap-5">
          <div className="px-5 md:px-12 py-8 mx-auto w-[95%] md:w-[60%] bg-white/20 rounded-md shadow-lg mt-8 md:mt-0">
            <h2 className="font-mplus-bold text-3xl md:text-5xl text-white text-center">
              Inicia Sesión
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mx-auto">
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  disabled={loading}
                  {...register("username", {
                    required: "El nombre de usuario es obligatorio",
                  })}
                  className="font-mplus-bold text-gray-500 rounded-xl w-full p-2 mt-10 bg-white outline-none disabled:opacity-50"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="mb-2">
                <input
                  type="password"
                  placeholder="Contraseña"
                  disabled={loading}
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  className="font-mplus-bold text-gray-500 rounded-xl w-full p-2 mt-8 bg-white outline-none disabled:opacity-50"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {errors.root?.message && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.root.message}
                </p>
              )}

              <div className="flex justify-between mt-10 gap-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="font-mplus-bold bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? "Cargando..." : "Ingresar"}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  className="font-mplus-bold bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  onClick={() => router.push("/register")}
                >
                  Registrarse
                </button>
              </div>

              <div className="font-mplus-bold w-full text-center mt-5 text-white hover:text-red-600 cursor-pointer transition-colors">
                <h4>¿Te olvidaste tu contraseña?</h4>
              </div>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
}
