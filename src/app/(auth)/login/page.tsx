<<<<<<< HEAD
=======
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

// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// import { loginUser } from "@/shared/lib/auth.service";

// const uagrm_logo = "/login/uagrm_logo.png";
// const logo_facebook = "/login/logo_facebook.png";
// const logo_whatApps = "/login/logo_whatApps.png";
// const imgenFondo = "/login/fondo-imagen-uagrm.png";

// type LoginForm = {
//   username: string;
//   password: string;
// };

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors },
//   } = useForm<LoginForm>();

//   const onSubmit = async (data: LoginForm) => {
//     setLoading(true);
//     setError("root", { message: "" });

//     const payload = {
//       username: data.username.trim(),
//       password: data.password,
//     };

//     try {
//       const result = await loginUser(payload);

//       if (result?.success) {
//         router.push("/");
//       } else {
//         setError("root", {
//           message:
//             result?.message || "Credenciales incorrectas o error de red.",
//         });
//       }
//     } catch (err) {
//       setError("root", {
//         message:
//           err instanceof Error
//             ? err.message
//             : "Credenciales incorrectas o error de red.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-screen h-screen bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${imgenFondo})`,
//       }}
//     >
//       <header className="flex justify-between p-5">
//         <Image src={uagrm_logo} alt="Logo UAGRM" width={80} height={100} />
//         <section className="flex gap-5">
//           <Image
//             src={logo_facebook}
//             className="rounded-xl cursor-pointer hover:opacity-80"
//             alt="Facebook UAGRM"
//             width={50}
//             height={50}
//           />
//           <Image
//             src={logo_whatApps}
//             className="rounded-xl cursor-pointer hover:opacity-80"
//             alt="WhatsApp UAGRM"
//             width={50}
//             height={50}
//           />
//         </section>
//       </header>

//       <section className="flex items-center justify-center">
//         <section className="flex flex-col-reverse md:flex-row md:w-[85%] lg:w-[60%] md:mt-72 lg:mt-20 md:gap-5">
//           <div className="px-5 md:px-12 py-8 mx-auto w-[95%] md:w-[60%] bg-white/20 rounded-md shadow-lg mt-8 md:mt-0">
//             <h2 className="font-mplus-bold text-3xl md:text-5xl text-white text-center">
//               Inicia Sesión
//             </h2>

//             <form onSubmit={handleSubmit(onSubmit)} className="mt-3 mx-auto">
//               <div className="mb-2">
//                 <input
//                   type="text"
//                   placeholder="Ingrese su nombre de usuario"
//                   disabled={loading}
//                   {...register("username", {
//                     required: "El nombre de usuario es obligatorio",
//                   })}
//                   className="font-mplus-bold text-gray-500 rounded-xl w-full p-2 mt-10 bg-white outline-none disabled:opacity-50"
//                 />
//                 {errors.username && (
//                   <p className="text-red-500 text-sm">
//                     {errors.username.message}
//                   </p>
//                 )}
//               </div>

//               <div className="mb-2">
//                 <input
//                   type="password"
//                   placeholder="Contraseña"
//                   disabled={loading}
//                   {...register("password", {
//                     required: "La contraseña es obligatoria",
//                     minLength: {
//                       value: 6,
//                       message: "La contraseña debe tener al menos 6 caracteres",
//                     },
//                   })}
//                   className="font-mplus-bold text-gray-500 rounded-xl w-full p-2 mt-8 bg-white outline-none disabled:opacity-50"
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-sm">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {errors.root?.message && (
//                 <p className="text-red-500 text-sm mb-4">
//                   {errors.root.message}
//                 </p>
//               )}

//               <div className="flex justify-between mt-10 gap-8">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="font-mplus-bold bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                 >
//                   {loading ? "Cargando..." : "Ingresar"}
//                 </button>

//                 <button
//                   type="button"
//                   disabled={loading}
//                   className="font-mplus-bold bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                   onClick={() => router.push("/register")}
//                 >
//                   Registrarse
//                 </button>
//               </div>

//               <div className="font-mplus-bold w-full text-center mt-5 text-white hover:text-red-600 cursor-pointer transition-colors">
//                 <h4>¿Te olvidaste tu contraseña?</h4>
//               </div>
//             </form>
//           </div>
//         </section>
//       </section>
//     </div>
//   );
// }

>>>>>>> 8baf8c8 (login y sidebar actualizado)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/shared/lib/auth.service";
import type { LoginPayload } from "@/shared/types/auth.types";
import Image from "next/image";
import Link from "next/link";

// Usamos Heroicons como pediste
import { 
  EyeIcon, 
  EyeSlashIcon, 
  LockClosedIcon, 
  UserIcon 
} from "@heroicons/react/24/solid";

<<<<<<< HEAD
=======
import { loginUser } from "@/shared/lib/auth.service";

const uagrm_logo = "/login/uagrm-escudo.webp";
const imgenFondo = "/login/uagrmfondo.webp";

type LoginForm = {
  username: string;
  password: string;
};

>>>>>>> 8baf8c8 (login y sidebar actualizado)
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const router = useRouter();
=======
  const [showPassword, setShowPassword] = useState(false);
>>>>>>> 8baf8c8 (login y sidebar actualizado)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
<<<<<<< HEAD

    const payload: LoginPayload = {
      username: username.trim(),
      password,
    };

    try {
      const response = await loginUser(payload);

      if (response.success) {
        console.log("✅ Login exitoso, redirigiendo...");
        router.push("/dashboard");
      } else {
        setError(response.message || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error("❌ Error en login:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
=======
    setError("root", { message: "" }); // Limpiar errores previos

    try {
      // 1. Creamos el payload exactamente como lo espera loginUser
      const payload = {
        username: data.username.trim(),
        password: data.password,
      };

      // 2. Llamamos al servicio
      const result = await loginUser(payload);
      
      // 3. Si el servicio retorna exitosamente (ya guarda el token internamente)
      if (result) {
        router.push("/");
        router.refresh(); // Asegura que el middleware detecte el nuevo token
      }
    } catch (err: any) {
      // 4. Capturamos el error de "reading login" o cualquier fallo de red aquí
      console.error("Error en login:", err);
      
      // Si el error es el de 'reading login', es que el servidor no respondió data.data
      const errorMessage = err.message?.includes('reading \'login\'') 
        ? "El servidor no responde. Verifica tu conexión o el estado de la API."
        : (err.message || "Credenciales incorrectas o error de servidor");

      setError("root", { message: errorMessage });
>>>>>>> 8baf8c8 (login y sidebar actualizado)
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex">
      {/* Lado izquierdo: Imagen */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/login/fondo-imagen-uagrm.png"
          alt="UAGRM"
          fill
          className="object-cover"
        />
      </div>

      {/* Lado derecho: Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src="/login/uagrm_logo.png"
              alt="UAGRM Logo"
              width={120}
              height={120}
              className="mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-800">
              Sistema de Planificación
            </h1>
            <p className="text-gray-600 mt-2">Inicia sesión en tu cuenta</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            {/* Usuario */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Usuario
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su usuario"
                required
                disabled={loading}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ingrese su contraseña"
                required
                disabled={loading}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Ingresando...
                </span>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* Links adicionales */}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
=======
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* SECCIÓN IZQUIERDA: LADO INFORMATIVO */}
      <section className="relative hidden lg:flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-blue-900/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-red-600/5 blur-3xl" />
        
        <div className="relative z-10 text-center px-10">
          <Image
            src={uagrm_logo}
            alt="Escudo UAGRM"
            width={180}
            height={180}
            className="mx-auto mb-6"
            priority
          />
          <h2 className="text-5xl font-extrabold tracking-tight">
            <span className="text-blue-900">U</span>
            <span className="text-red-600">A</span>
            <span className="text-blue-900">G</span>
            <span className="text-red-600">RM</span>
          </h2>
          <p className="mt-4 text-gray-600 uppercase tracking-widest text-sm font-medium">
            Universidad Autónoma “Gabriel René Moreno”
          </p>
        </div>
      </section>

      {/* SECCIÓN DERECHA: FORMULARIO */}
      <section className="relative flex items-center justify-center p-6 min-h-screen">
        <Image
          src={imgenFondo}
          alt="Fondo UAGRM"
          fill
          className="object-cover object-center blur-[1.2px] brightness-75 lg:brightness-100"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/20 lg:bg-blue-900/10" />

        <div className="relative z-10 w-full max-w-md">
          <div className="rounded-2xl bg-white/95 backdrop-blur-sm shadow-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Iniciar sesión</h2>
              <p className="text-sm text-gray-600 mt-2">Sistema de Planificación Institucional</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Usuario */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Usuario</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    {...register("username", { required: "El usuario es obligatorio" })}
                    type="text"
                    placeholder="Tu usuario"
                    className="w-full h-12 rounded-xl border border-gray-300 pl-10 pr-4 outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 transition-all"
                  />
                </div>
                {errors.username && <p className="text-red-600 text-xs">{errors.username.message}</p>}
              </div>

              {/* Contraseña */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Contraseña</label>
                <div className="relative">
                  <LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    {...register("password", { required: "La contraseña es obligatoria" })}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-12 rounded-xl border border-gray-300 pl-10 pr-12 outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400"
                  >
                    {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-600 text-xs">{errors.password.message}</p>}
              </div>

              {/* Mensaje de Error de la API */}
              {errors.root?.message && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg text-center">
                  {errors.root.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition-all disabled:opacity-50"
              >
                {loading ? "Verificando..." : "Ingresar"}
              </button>

              <div className="text-center pt-2">
                <Link href="#" className="text-xs text-blue-900 hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
            </form>

            <p className="text-center text-[10px] text-gray-400 mt-10 uppercase tracking-widest">
              © {new Date().getFullYear()} Universidad Autónoma Gabriel René Moreno
            </p>
          </div>
        </div>
      </section>
>>>>>>> 8baf8c8 (login y sidebar actualizado)
    </div>
  );
}

