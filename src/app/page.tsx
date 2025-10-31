import DetalleForm from "@/components/DetalleForm";
import SelectDAUE from "@/components/SelectDAUE";
import SelectObjetivos from "@/components/SelectObjetivos";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-sans">
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white sm:items-start">
        <SelectDAUE/>
      </main>
    </div>
  );
}
