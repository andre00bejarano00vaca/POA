// export default function Home() {
//   return (
//     <div className="flex min-h-screen bg-black font-sans">
//       <main className="flex min-h-screen w-full  bg-white sm:items-start">
        
//       </main>
//     </div>
//   );
// }



'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/pei'); // redirige automáticamente
  }, [router]);

  return null; // no renderiza nada
}

