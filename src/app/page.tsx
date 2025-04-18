import Hero from "@/components/Hero";
import { Navbar } from "@/components/mainNavbar";
import Features from "@/components/Features"
export default function Home() {
  return (
    <div className="container mx-auto w-full">
      <Navbar />
       <Hero />
       <Features />
    </div>
  );
}
