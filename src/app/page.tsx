import { Navbar, Hero, BackgroundNetwork } from "./components";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white font-sans overflow-x-hidden">
      <BackgroundNetwork />
      <Navbar />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <Hero />
      </main>
    </div>
  );
}
